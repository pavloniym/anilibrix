// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.
const WebTorrent = require('webtorrent');

// Create WebTorrentClient
// Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
// client, as explained here: https://webtorrent.io/faq
const WebTorrentClient = new WebTorrent();

// Send & receive messages from the main window
import {ipcRenderer as ipc} from 'electron'

let torrentStore = null;
let serverStore = null;

/**
 * Start torrent from provided source
 *
 * @param torrentSource
 */
const startTorrent = ({torrentSource}) => {
  if (WebTorrentClient && torrentSource) {

    // Create torrent instance
    WebTorrentClient.add(torrentSource);
    WebTorrentClient.on('torrent', (torrentInstance) => {

      // Save torrent instance
      torrentStore = torrentInstance;

      // Send event with torrent
      const torrentFiles = (torrentInstance.files || []).map(torrentFile => ({name: torrentFile.name}));

      // Send ready event
      ipc.send('send:main', {channel: 'torrent:ready', payload: {torrentFiles, torrentSource}});

      // Start http server for this torrent's instance
      startServer({torrentInstance, torrentSource})

    })

  }
};

/**
 * Start server from torrent instance
 *
 * @param torrentInstance
 * @param torrentSource
 */
const startServer = ({torrentInstance, torrentSource}) => {

  if (serverStore) return;

  // Create new server
  const serverInstance = torrentInstance.createServer();

  // Save server store
  serverStore = serverInstance;

  // Start server
  serverInstance.listen(0, () => {

    // Create server url
    const serverUrl = `http://localhost:${serverInstance.address().port}`;

    // Send event with server data
    ipc.send('send:main', {channel: 'server:ready', payload: {torrentSource, serverUrl}})

  })
};

/**
 * Destroy torrent
 *
 */
const destroyTorrent = () => torrentStore ? torrentStore.destroy() : null;

/**
 * Destroy server
 *
 */
const destroyServer = () => serverStore ? serverStore.destroy() : null;

(() => {
  ipc.on('torrent:start', (e, {torrentSource}) => startTorrent({torrentSource}));
  ipc.on('torrent:destroy', () => destroyTorrent());
  ipc.on('server:destroy', () => destroyServer())
})();