// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.

const path = require('path');
const rimraf = require('rimraf');
const webTorrent = require('webtorrent');
const parseTorrentData = require('parse-torrent');

// Create WebTorrentClient
// Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
// client, as explained here: https://webtorrent.io/faq
const torrentClient = new webTorrent();

import app from '@/../package'
import sentry from './../main/utils/sentry'
import {remote} from 'electron'
import {getStore} from '@store'


// Torrent handlers
import {handleTorrentStart, handleTorrentDestroy, handleTorrentParsing} from "@main/handlers/torrents/torrentsHandler";
import {
  emitTorrentClear,
  emitTorrentError,
  emitTorrentParsed,
  emitTorrentServer,
  emitTorrentDownload
} from "@main/handlers/torrents/torrentsHandler";


// Utils
import {parse, stringify} from 'flatted'

// Enable Sentry.io electron handler
sentry({store: getStore(), source: 'torrent'});


// Create local store for torrents
const store = {
  servers: {}, // servers instances for torrents
  torrents: {}, // torrents instances
  handlers: {}, // update handlers
  collection: {}, // parsed torrents collection
};


/**
 * Get torrent path in temp folder
 *
 * @type {string}
 */
const torrentPath = path.join(remote.app.getPath('temp'), app.build.appId);


/**
 * Get torrent data from torrent stream
 *
 * @param torrent_id
 * @param blob
 */
const parseTorrent = ({torrent_id, blob = null} = {}) => {
  try {

    let data = null;

    // If blob is provided -> try to create buffer with torrent file
    if (blob !== null) {

      // Try to parse torrent
      data = parseTorrentData(new Buffer(blob));

      // Save torrent data to store
      store.collection[torrent_id] = data;

      // Show console
      console.log('Parse Torrent', {torrent: parse(stringify(data))});

    }

    // Send result to main process
    emitTorrentParsed(torrent_id, data);

  } catch (error) {
    _sendError({torrentId: torrent_id, message: 'Произошла ошибка при парсинге торрент-файла', error});
  }

};

/**
 * Start torrent from provided source
 *
 * @param torrentSource
 */
const startTorrent = ({torrent_id, file_index = 0} = {}) => {

  // Show in console
  console.log('Start Torrent', {torrent_id, file_index});

  if (torrentClient && store.collection[torrent_id]) {

    // Destroy torrent if it already added
    if (store.torrents[torrent_id]) store.torrents[torrent_id].destroy();

    // Add torrent
    torrentClient.add(store.collection[torrent_id], {path: torrentPath}, async torrent => {
      try {

        // Get file with provided file index
        const file = torrent.files[file_index];

        // Deselect all files initial download
        torrent.files.forEach(file => file.deselect());
        torrent.deselect(0, torrent.pieces.length - 1, false);

        // Select file with provided index
        if (file) torrent.select(file._startPiece, file._endPiece, false);
        if (!file) throw 'Файл с таким порядковым номером не обнаружен';

        // Save torrent instance to store
        store.torrents[torrent_id] = torrent;

        // Start http server for this torrent's instance
        const server = await _startServer({torrent_id, torrent});

        // Send event with server
        emitTorrentServer({...server, torrent_id});

        //Send torrent download data
        if (store.handlers[torrent_id]) clearInterval(store.handlers[torrent_id]);
        store.handlers[torrent_id] = setInterval(() => {


          // Create loading payload
          const payload = {
            torrent_id,
            file_index,
            name: file.name,
            path: file.path,
            speed: torrent.downloadSpeed,
            length: file.length,
            seeding: torrent.uploadSpeed,
            progress: file.progress,
            downloaded: file.downloaded,
          };

          // Send message to another window
          // Show in console
          emitTorrentDownload(payload);
          console.log('Torrent Download:', payload);

        }, 2000);

      } catch (error) {
        _sendError({torrent_id, message: 'Произошла ошибка при инициализации торрент-файла', error});
      }

    });

  } else {
    _sendError({torrent_id, message: 'Торрент не найден'})
  }
};


/**
 * Destroy torrent
 * Destroy server
 * Clear torrent data
 *
 * @return Promise
 */
const destroyTorrent = ({torrent_id}) => {
  try {


    // Stop server
    if (store.servers[torrent_id]) {

      // Show in console
      console.log('Destroy Server', {torrent_id, server: parse(stringify(store.servers[torrent_id]))});

      // Stop and destroy server
      store.servers[torrent_id].close();
      store.servers[torrent_id] = null;

    }

    // Destroy handler
    if (store.handlers[torrent_id]) {
      clearInterval(store.handlers[torrent_id]);
    }

    // Destroy torrent
    if (store.torrents[torrent_id]) {

      // Torrent files path
      const path = store.torrents[torrent_id].path;

      // Remove files from fs
      rimraf(path, () => {

        // Show in console
        console.log('Destroy Torrent', {torrent_id, path});

        // Destroy torrent
        // Clear storage
        store.torrents[torrent_id].destroy();
        store.torrents[torrent_id] = null;

        // Remove files from torrent
        // Send clear event
        emitTorrentClear({torrent_id});

      });
    }

  } catch (error) {
    _sendError({torrent_id, message: 'Произошла ошибка при остановке и уничтожении торрент-файла', error});
  }
};


/**
 * Start server from torrent instance
 *
 * @param instance
 */
const _startServer = ({torrent_id, torrent}) => {
  return new Promise((resolve, reject) => {

    try {

      // Create new server
      const server = torrent.createServer();

      // Save server instance to store
      store.servers[torrent_id] = server;

      // Start server
      server.listen(0, () => {

        // Create server url
        const url = `http://localhost:${server.address().port}`;

        // Show in console
        console.log('Start Server', {torrent_id, server: parse(stringify(server)), url});

        // Resolve url
        resolve({url, server});
      })

    } catch (error) {
      reject(error);
    }
  });
};


/**
 * Send torrent error
 *
 * @param torrent_id
 * @param message
 * @param error
 * @private
 */
const _sendError = ({torrent_id, message = null, error = null} = {}) => {

  // Show in console
  console.log('Torrent Error', {torrent_id, error, message});

  // Send error message
  emitTorrentError({torrent_id, error, message});

};


// Initialize torrent handlers
// Catch and handle torrent events
(() => {
  handleTorrentStart(payload => startTorrent(payload));
  handleTorrentParsing(payload => parseTorrent(payload));
  handleTorrentDestroy(payload => destroyTorrent(payload));
})();
