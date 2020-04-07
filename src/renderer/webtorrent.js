// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.
const webTorrent = require('webtorrent');
const parseTorrent = require('parse-torrent');

const http = require('http');

// Create WebTorrentClient
// Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
// client, as explained here: https://webtorrent.io/faq
const torrentClient = new webTorrent();

// Send & receive messages from the main window
import {ipcRenderer as ipc} from 'electron'


// Create local store for torrents
const store = {
  torrents: {},
  torrent: {
    data: null,
    instance: null,
    server: null
  },
};


/**
 * Get torrent data from torrent stream
 *
 * @param blob
 * @param id
 */
const getTorrent = ({blob, torrentId}) => {

  let data = null;

  if (blob !== null) {

    // If blob is provided -> try to create buffer with torrent file
    // Try to parse torrent
    data = parseTorrent(new Buffer(blob));

    // Save torrent data to store
    store.torrents[torrentId] = data;

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
  if (torrentClient && torrentId !== null) {

    const torrent = store.torrents[torrentId];

    if (torrent) {


      torrentClient.add(torrent, async instance => {

        // Save torrent data and instance to store
        store.torrent.data = torrent;
        store.torrent.instance = instance;

        // Start http server for this torrent's instance
        const result = await _startServer(instance);

        // Send event with server
        ipc.send(`torrent:server`, {...result, torrentId});

      });
    }
  }
};

/**
 * Destroy torrent
 * Destroy server
 * Clear torrent data
 *
 * @return void
 */
const destroyTorrent = () => {

  // Destroy torrent
  if (store.torrent.instance) {
    store.torrent.instance.destroy();
    store.torrent.instance = null;
  }

  // Stop server
  if (store.torrent.server) {
    store.torrent.server.destroy();
    store.torrent.server = null;
  }

  // Clear torrent data
  store.torrent.data = null;

};


/**
 * Start server from torrent instance
 *
 * @param instance
 */
const _startServer = (instance) => {
  return new Promise(resolve => {

    // Create new server
    const server = instance.createServer();

    console.log(server);

    // Save server instance to store
    store.torrent.server = server;

    // Start server
    server.listen(0, () => {

      // Create server url
      const url = `http://localhost:${server.address().port}`;

      // Resolve url
      resolve({url, server});
    })

  });
};


(() => {
  ipc.on('torrent:get', (e, payload) => getTorrent(payload));
  ipc.on('torrent:start', (e, payload) => startTorrent(payload));
  ipc.on('torrent:destroy', () => destroyTorrent());
})();
