// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.

const webTorrent = require('webtorrent');
const parseTorrentData = require('parse-torrent');

// Create WebTorrentClient
// Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
// client, as explained here: https://webtorrent.io/faq
const torrentClient = new webTorrent();

// Send & receive messages from the main window
import AppStore from '@store'
import AppSentry from './../main/utils/sentry'
import {ipcRenderer as ipc} from 'electron'

// Enable Sentry.io electron handler
AppSentry({store: AppStore, source: 'torrent'});


// Create local store for torrents
const store = {
  servers: {},
  torrents: {},
  collection: {},
};


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
const startTorrent = ({torrentId}) => {
  if (torrentClient && store.collection[torrentId]) {

    try {

      torrentClient.add(store.collection[torrentId], async torrent => {

        // Save torrent instance to store
        store.torrents[torrentId] = torrent;

        // Start http server for this torrent's instance
        const result = await _startServer({torrentId, torrent});

        // Send event with server
        ipc.send(`torrent:server`, {...result, torrentId});

      });

    } catch (error) {

      // Reject torrent on error
      _rejectTorrent({torrentId, error});
    }


  } else _rejectTorrent({torrentId})
};


/**
 * Destroy torrent
 * Destroy server
 * Clear torrent data
 *
 * @return void
 */
const destroyTorrent = ({torrentId}) => {

  // Destroy torrent
  if (store.torrents[torrentId]) {
    store.torrents[torrentId].destroy(() => ipc.send('torrent:clear', {torrentId}));
    store.torrents[torrentId] = null;
  }

  // Stop server
  if (store.servers[torrentId]) {
    store.servers[torrentId].close();
    store.servers[torrentId] = null;
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


const _rejectTorrent = ({torrentId, error = null} = {}) => {
  console.log('rejectTorrent', {torrentId, error});
};


(() => {
  ipc.on('torrent:parse', (e, payload) => parseTorrent(payload));
  ipc.on('torrent:start', (e, payload) => startTorrent(payload));
  ipc.on('torrent:destroy', (e, payload) => destroyTorrent(payload));
})();
