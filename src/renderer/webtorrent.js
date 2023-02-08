// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.

import app from '@/../package'
import {getStore} from '@store'
import {initializeSentryInterceptor} from '@main/utils/sentry/appSentry'

// Torrent handlers
import {catchTorrentDestroy, catchTorrentParse, catchTorrentStart, sendTorrentClear} from '@main/handlers/torrents/torrentsHandler';
import {sendTorrentDownload, sendTorrentError, sendTorrentParsedData, sendTorrentServer} from '@main/handlers/torrents/torrentsHandler';

// Utils
import {parse, stringify} from 'flatted'

const http = require('http');
const path = require('path');
const rimraf = require('rimraf');
const WebTorrent = require('webtorrent');
const parseTorrentData = require('parse-torrent');
const {SubtitleParser} = require('matroska-subtitles')

// Create WebTorrentClient
// Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
// client, as explained here: https://webtorrent.io/faq
const torrentClient = new WebTorrent();

// Enable Sentry.io electron handler
initializeSentryInterceptor({store: getStore(), source: 'torrent'});

// Create local store for torrents
const store = {
    servers: {}, // servers instances for torrents
    vttServers: {},
    torrents: {}, // torrents instances
    handlers: {}, // update handlers
    collection: {} // parsed torrents collection
};

/**
 * Get torrent path in temp folder
 *
 * @type {string}
 */
const torrentPath = path.join(require('@electron/remote').app.getPath('temp'), app.build.appId);

/**
 * Get torrent data from torrent stream
 *
 * @param torrentId
 * @param blob
 */
const parseTorrent = ({ torrent_id: torrentId, blob} = {}) => {
    try {
        let data = null;
        if (blob !== null) {
            // If blob is provided -> try to create buffer with torrent file
            // Try to parse torrent
            data = parseTorrentData(new Buffer(blob));

            // Save torrent data to store
            // Show console
            store.collection[torrentId] = data;
            console.log('Parse Torrent', {torrent: parse(stringify(data))});
        }

        // Send result to main process
        sendTorrentParsedData(torrentId, data);
    } catch (error) {
        _sendError({torrentId: torrentId, message: 'Произошла ошибка при парсинге торрент-файла', error});
    }
};

/**
 * Start torrent from provided source
 *
 * @param torrentSource
 */
const startTorrent = ({torrentId, fileIndex = 0} = {}) => {
    // Show in console
    console.log('Start Torrent', {torrentId, fileIndex});

    if (torrentClient && store.collection[torrentId]) {
        // Destroy torrent if it already added
        if (store.torrents[torrentId]) store.torrents[torrentId].destroy();

        // Add torrent
        torrentClient.add(store.collection[torrentId], {path: torrentPath}, async torrent => {
            try {
                // Get file with provided file index
                const file = torrent.files[fileIndex];

                // Deselect all files initial download
                torrent.files.forEach(file => file.deselect());
                torrent.deselect(0, torrent.pieces.length - 1, false);

                // Select file with provided index
                if (file) torrent.select(file._startPiece, file._endPiece, false);
                if (!file) throw 'Файл с таким порядковым номером не обнаружен'

                // Save torrent instance to store
                store.torrents[torrentId] = torrent;

                // Start http server for this torrent's instance
                const result = await _startServer({torrentId, torrent});

                // Send event with server
                sendTorrentServer({...result, torrentId});

                // Send torrent download data
                if (store.handlers[torrentId]) clearInterval(store.handlers[torrentId]);
                store.handlers[torrentId] = setInterval(() => {
                    // Send message to another window
                    sendTorrentDownload({
                        torrentId,
                        speed: torrent.downloadSpeed,
                        seeding: torrent.uploadSpeed,
                        files: (torrent.files || []).map(file => {
                            return {
                                name: file.name,
                                progress: file.progress,
                                downloaded: file.downloaded
                            }
                        })
                    });

                    // Show in console
                    console.log('Torrent Download:', {
                        torrentId,
                        fileIndex,
                        name: file.name,
                        path: file.path,
                        speed: torrent.downloadSpeed,
                        length: file.length,
                        seeding: torrent.uploadSpeed,
                        progress: file.progress,
                        downloaded: file.downloaded
                    });
                }, 2000)
            } catch (error) {
                _sendError({torrentId, message: 'Произошла ошибка при инициализации торрент-файла', error});
            }
        });
    } else {
        _sendError({torrentId, message: 'Торрент не найден'})
    }
};

/**
 * Destroy torrent
 * Destroy server
 * Clear torrent data
 *
 * @return Promise
 */
const destroyTorrent = ({torrentId}) => {
    try {
        // Stop server
        if (store.servers[torrentId]) {
            // Show in console
            console.log('Destroy Server', {torrentId, server: parse(stringify(store.servers[torrentId]))});
            console.log('Destroy VTT Server', {torrentId, server: parse(stringify(store.vttServers[torrentId]))});

            // Stop and destroy server
            store.servers[torrentId].close();
            store.servers[torrentId] = null;

            // Stop and destroy VTT server
            if (store.vttServers[torrentId]) {
                store.vttServers[torrentId].close();
                store.vttServers[torrentId] = null;
            }
        }

        // Destroy handler
        if (store.handlers[torrentId]) {
            clearInterval(store.handlers[torrentId]);
        }

        // Destroy torrent
        if (store.torrents[torrentId]) {
            // Torrent files path
            const path = store.torrents[torrentId].path;

            // Remove files from fs
            rimraf(path, () => {
                // Show in console
                console.log('Destroy Torrent', {torrentId, path});

                // Destroy torrent
                // Clear storage
                store.torrents[torrentId].destroy();
                store.torrents[torrentId] = null;

                // Remove files from torrent
                // Send clear event
                sendTorrentClear({torrentId});
            });
        }
    } catch (error) {
        _sendError({torrentId, message: 'Произошла ошибка при остановке и уничтожении торрент-файла', error});
    }
};

/**
 * Start server from torrent instance
 *
 * @param instance
 */
const _startServer = ({torrentId, torrent}) => {
    return new Promise((resolve, reject) => {
        try {
            const parser = new SubtitleParser()

            // Create new server
            const server = torrent.createServer();
            const vttServer = http.createServer(async (req, res) => {
                const url = req.url.slice(1, -4);
                const {host, fileName, fileIndex} = JSON.parse(decodeURIComponent(url));
                const fileUrl = `${host}/${fileIndex}/${fileName}`;

                // first an array of subtitle track information is emitted
                // afterwards each subtitle is emitted
                // parser.once('tracks', (tracks) => console.log(tracks))
                parser.on('subtitle', (subtitle, trackNumber) => console.log('Track ' + trackNumber + ':', subtitle))
                http.get(fileUrl, stream => stream.pipe(parser).pipe(res));
            });

            // Save server instance to store
            store.servers[torrentId] = server;
            store.vttServers[torrentId] = vttServer;

            // Start server
            server.listen(0, () => {
                vttServer.listen(0, () => {
                    // Create server url
                    const url = `http://localhost:${server.address().port}`;
                    const vttUrl = `http://localhost:${vttServer.address().port}`;

                    // Show in console
                    console.log('Start Server', {torrentId, server: parse(stringify(server)), url});
                    console.log('Start VTT Server', {server: parse(stringify(vttServer)), vttUrl});

                    // Resolve url
                    resolve({url, server, vttUrl, vttServer, torrentId});
                });
            })
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Send torrent error
 *
 * @param torrentId
 * @param message
 * @param error
 * @private
 */
const _sendError = ({torrentId, message = null, error = null} = {}) => {
    // Show in console
    // Send error message
    console.log('Torrent Error', {torrentId, error, message});
    sendTorrentError({torrentId, error, message});
};

(() => {
    catchTorrentParse(payload => parseTorrent(payload));
    catchTorrentStart(payload => startTorrent(payload));
    catchTorrentDestroy(payload => destroyTorrent(payload));
})();
