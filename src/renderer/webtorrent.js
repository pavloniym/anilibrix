// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.

const rimraf = require('rimraf');
const webTorrent = require('webtorrent');
const parseTorrentData = require('parse-torrent');

// Create WebTorrentClient
// Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
// client, as explained here: https://webtorrent.io/faq
const torrentClient = new webTorrent();


import app from '@/../package'
import AppStore from '@store'
import AppSentry from './../main/utils/sentry'
import {ipcRenderer as ipc, remote} from 'electron'

// Enable Sentry.io electron handler
AppSentry({store: AppStore, source: 'torrent'});


// Create local store for torrents
const store = {
  servers: {},
  torrents: {},
  collection: {},
};


/**
 * Get torrent path in temp folder
 *
 * @type {string}
 */
// const path = '/tmp/' + app.build.appId;
const path = remote.app.getPath('temp') + app.build.appId;


/**
 * Get torrent data from torrent stream
 *
 * @param blob
 * @param id
 */
const parseTorrent = ({blob, torrentId}) => {

  let data = null;

  if (blob !== null) {

    // If blob is provided -> try to create buffer with torrent file
    // Try to parse torrent
    data = parseTorrentData(new Buffer(blob));

    // Save torrent data to store
    store.collection[torrentId] = data;
  }

  // Send result to main process
  ipc.send(`torrent:data:${torrentId}`, {torrentId, data});

};

/**
 * Start torrent from provided source
 *
 * @param torrentSource
 */
const startTorrent = ({torrentId, fileIndex = 0} = {}) => {
  if (torrentClient && store.collection[torrentId]) {

    torrentClient.add(store.collection[torrentId], {path}, async torrent => {
      try {

        // Get file with provided file index
        const file = torrent.files[fileIndex];

        // Deselect all files initial download
        torrent.files.forEach(file => file.deselect());
        torrent.deselect(0, torrent.pieces.length - 1, false);

        // Select file with provided index
        if (file) torrent.select(file._startPiece, file._endPiece, false);
        if (!file) throw 'Файл с таким порядковым номером не обнаружен';

        // Save torrent instance to store
        store.torrents[torrentId] = torrent;

        // Start http server for this torrent's instance
        const result = await _startServer({torrentId, torrent});

        // Send event with server
        ipc.send(`torrent:server`, {...result, torrentId});

        //Send torrent download data
        torrent.on('download', () => {
          ipc.send('torrent:download', {
            torrentId,
            speed: torrent.downloadSpeed,
            files: (torrent.files || []).map(file => {
              return {
                name: file.name,
                progress: file.progress,
                downloaded: file.downloaded,
              }
            })
          });
        });


      } catch (error) {
        _sendError({torrentId, message: 'Произошла ошибка при инициализации торрент-файла', error});
      }
    });

  } else _sendError({torrentId, message: 'Торрент не найден'})
};


/**
 * Destroy torrent
 * Destroy server
 * Clear torrent data
 *
 * @return void
 */
const destroyTorrent = ({torrentId}) => {

  // Stop server
  if (store.servers[torrentId]) {
    store.servers[torrentId].close();
    store.servers[torrentId] = null;
  }

  // Destroy torrent
  if (store.torrents[torrentId]) {
    rimraf(store.torrents[torrentId].path, () => {

      // Destroy torrent
      // Clear storage
      store.torrents[torrentId].destroy();
      store.torrents[torrentId] = null;

      // Remove files from torrent
      // Send clear event
      ipc.send('torrent:clear', {torrentId});
    });
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

      // Create new server
      const server = torrent.createServer();

      // Save server instance to store
      store.servers[torrentId] = server;

      // Start server
      server.listen(0, () => {

        // Create server url
        const url = `http://localhost:${server.address().port}`;

        // Resolve url
        resolve({url, server, torrentId});
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
  ipc.send('torrent:error', {torrentId, error, message})
};


(() => {
  ipc.on('torrent:parse', (e, payload) => parseTorrent(payload));
  ipc.on('torrent:start', (e, payload) => startTorrent(payload));
  ipc.on('torrent:destroy', (e, payload) => destroyTorrent(payload));
})();
