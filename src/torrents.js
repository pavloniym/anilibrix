/* webpackChunkName: "torrents-ch" */

// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.

// Electron
import {remote, ipcRenderer} from 'electron'

// System Utils
const path = require('path');
const rimraf = require('rimraf');

// WebTorrent Utils
const WebTorrent = require('webtorrent');
const ParseTorrent = require('parse-torrent');

// Utils
import {meta} from '@@/package'
import {parse, stringify} from 'flatted'

// Resolvers
import TorrentsResolver, {
  TORRENTS_CLEAR,
  TORRENTS_PARSE,
  TORRENTS_START
} from "@@/utils/resolvers/torrents/torrentsResolver";


class Torrents {
  constructor() {

    // Create WebTorrentClient
    // Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
    // client, as explained here: https://webtorrent.io/faq
    this.torrent_client = new WebTorrent({torrentPort: Math.floor(Math.random() * (60000 - 12000) + 12000)});

    // Collections
    this.torrents_parsed = {}; // Parsed torrents collection
    this.torrents_servers = {}; // Servers instances for torrents
    this.torrents_instances = {}; // Torrents instances
    this.torrents_progress_watchers = {}; // Update handlers

  }


  /**
   * Parse torrent from file
   *
   * @param torrents_id
   * @param torrents_file_content
   */
  async parseTorrentFromBuffer({torrents_id, torrents_file_content}) {
    try {
      let torrent_parsed = null;
      if (torrents_file_content !== null) {

        // If blob is provided -> try to create buffer with torrent file
        // Try to parse torrent
        torrent_parsed = await ParseTorrent(new Buffer(torrents_file_content));

        // Save torrent data to store
        // Show in console parsed torrent
        this._sendToConsole('Torrent is parsed!', {torrents_id, torrent_parsed});
        this._saveTorrentParsed({torrents_id, torrent_parsed});

        return torrent_parsed;
      }
    } catch (error) {
      this._sendError({torrents_id, message: 'Произошла ошибка при парсинге торрент-файла', error});
    }
  }


  /**
   * Start torrent file
   *
   * @param torrents_id
   * @param file_index
   * @return {Promise}
   */
  async startTorrentForFile({torrents_id, file_index}) {

    // Show in console
    this._sendToConsole('Start torrent for file!', {torrents_id, file_index});

    // Check if torrent is exists and parsed
    // Get parsed torrent from store
    if (this._getTorrentParsed(torrents_id)) {

      // Destroy torrent if it already added
      this._clearTorrentInstance(torrents_id);

      // Add torrent
      // Resolve promise when torrent is ready and saved to started torrents collection
      return await new Promise(async resolve => {
        this.torrent_client.add(this._getTorrentParsed(torrents_id), {path: this._getTorrentFilepath()}, torrent => {

          // Save torrent instance to store
          this._saveTorrentInstance({torrents_id, torrent});

          // Get file with provided file index
          const file = this._getTorrentFile({torrents_id, file_index});

          // Deselect all files initial download
          torrent.files.forEach(file => file.deselect());
          torrent.deselect(0, torrent.pieces.length - 1, false);

          // Select file with provided index
          if (file !== null) torrent.select(file._startPiece, file._endPiece, false);
          if (file === null) throw new Error('Файл с таким порядковым номером не обнаружен');

          // Resolve started torrent
          resolve();
        });
      });
    }
  }


  /**
   * Start torrent progress watcher
   *
   * @param torrents_id
   * @param file_index
   * @return {Promise}
   */
  async startTorrentProgressWatcher({torrents_id, file_index}) {

    // Clear previous interval
    // Create torrent download data watcher
    this._clearTorrentProgressWatcher(torrents_id);
    this._saveTorrentProgressWatcher({
      torrents_id,
      callback: () => {

        const file = this._getTorrentFile({torrents_id, file_index});
        const torrent = this._getTorrentInstance({torrents_id});

        if (file && torrent) {

          const payload = {
            torrents_id,
            file_index,
            name: file.name,
            path: file.path,
            speed: torrent.downloadSpeed,
            length: file.length,
            seeding: torrent.uploadSpeed,
            progress: file.progress,
            downloaded: file.downloaded,
          };

          // Emit torrent watcher
          TorrentsResolver.emitTorrentProgressWatcher({torrents_id, payload});

          // Sent to console
          this._sendToConsole('Torrent progress:', payload);

        }
      }
    });
  }


  /**
   * Start torrent server
   *
   * @param torrents_id
   * @return {Promise}
   */
  async startTorrentServer({torrents_id}) {
    return new Promise(async resolve => {

      // Create new server
      const torrent = this._getTorrentInstance({torrents_id});
      const server = torrent.createServer();

      // Save server instance to store
      this._saveTorrentServer({torrents_id, server});

      // Start server
      server.listen(0, () => {

        // Create server url
        const url = `http://localhost:${server.address().port}`;

        // Show in console
        this._sendToConsole('Started Torrent Server: ', {url, server, torrents_id});

        // Resolve url
        resolve({url});
      })
    });
  }


  /**
   * Destroy torrent
   * Destroy server
   * Clear torrent data
   *
   * @return Promise
   */
  async clearTorrent({torrents_id}) {
    return await new Promise(resolve => {
      try {

        // Destroy server
        // Close server
        // Clear server for provided torrent in storage
        if (this._getTorrentServer({torrents_id})) {

          // Show in console
          this._sendToConsole('Destroy Torrent Server', {
            torrents_id,
            server: this._getTorrentServer({torrents_id})
          });

          // Stop and destroy server
          this._getTorrentServer({torrents_id}).close();
          this._saveTorrentServer({torrents_id, server: null});
        }

        // Destroy started torrent watcher
        this._clearTorrentProgressWatcher({torrents_id});

        // Destroy torrent
        if (this._getTorrentInstance({torrents_id})) {

          // Torrent files path
          const path = this._getTorrentInstance({torrents_id}).path;

          // Remove files from fs
          rimraf(path, () => {

            // Show in console
            this._sendToConsole('Destroy Torrent', {torrents_id, path});

            // Destroy torrent
            // Clear storage
            this._getTorrentInstance({torrents_id}).destroy();
            this._saveTorrentInstance({torrents_id, torrent: null});

            // Resolve destroy event
            resolve();
          });

        } else {
          resolve();
        }

      } catch (error) {
        this._sendError({torrents_id, message: 'Произошла ошибка при остановке и уничтожении торрент-файла', error});
      }
    });
  }


  /**
   * Save parsed torrent to collection
   *
   * @param torrents_id
   * @param torrent_parsed_data
   * @return {void}
   * @private
   */
  _saveTorrentParsed({torrents_id, torrent_parsed}) {
    this.torrents_parsed[torrents_id] = torrent_parsed;
  }

  /**
   * Save started torrent
   *
   * @param torrents_id
   * @param torrent
   * @private
   */
  _saveTorrentInstance({torrents_id, torrent}) {
    this.torrents_instances[torrents_id] = torrent;
  }


  /**
   * Save started torrent server
   *
   * @param torrents_id
   * @param server
   * @private
   */
  _saveTorrentServer({torrents_id, server}) {
    this.torrents_servers[torrents_id] = server;
  }


  /**
   * Create started torrent watcher
   *
   * @param torrents_id
   * @param callback
   * @private
   */
  _saveTorrentProgressWatcher({torrents_id, callback}) {
    this.torrents_progress_watchers[torrents_id] = setInterval(callback, 2000);
  }


  /**
   * Get parsed torrent from collection
   *
   * @param torrents_id
   * @return {*}
   * @private
   */
  _getTorrentParsed(torrents_id) {
    return this.torrents_parsed[torrents_id]
      ? this.torrents_parsed[torrents_id]
      : null;
  }

  /**
   * Get started torrent from collection
   *
   * @param torrents_id
   * @return {*}
   * @private
   */
  _getTorrentInstance({torrents_id}) {
    return this.torrents_instances[torrents_id]
      ? this.torrents_instances[torrents_id]
      : null;
  }


  /**
   * Get torrent file
   *
   * @param torrents_id
   * @param file_index
   * @return {*}
   * @private
   */
  _getTorrentFile({torrents_id, file_index}) {
    const torrent = this._getTorrentInstance({torrents_id});
    if (torrent && file_index >= 0) {
      return torrent.files[file_index];
    }
    return null;
  }


  /**
   * Get started server
   *
   * @param torrents_id
   * @return {*}
   * @private
   */
  _getTorrentServer({torrents_id}) {
    return this.torrents_servers[torrents_id]
      ? this.torrents_servers[torrents_id]
      : null;
  }


  /**
   * Get torrent path in temp folder
   *
   * @type {string}
   */
  _getTorrentFilepath() {
    path.join(remote.app.getPath('temp'), meta.build.appId);
  }


  /**
   * Remove torrent if it was already started before
   *
   * @param torrents_id
   * @private
   */
  _clearTorrentInstance(torrents_id) {
    if (this.torrents_instances && this.torrents_instances[torrents_id]) {

      // Destroy and clear
      this.torrents_instances[torrents_id].destroy();
      this.torrents_instances[torrents_id] = undefined;

      // Show in console
      this._sendToConsole('Destroy already started torrent', {torrents_id});
    }
  }

  /**
   * Clear started torrent watcher
   *
   * @param torrents_id
   * @private
   */
  _clearTorrentProgressWatcher(torrents_id) {
    if (this.torrents_progress_watchers[torrents_id]) {
      clearInterval(this.torrents_progress_watchers[torrents_id]);
    }
  }


  /**
   * Send torrent error
   *
   * @param torrents_id
   * @param message
   * @param error
   */
  _sendError({torrents_id, message = null, error = null} = {}) {
    console.error('Torrent Error', {torrents_id, error, message});
  }


  /**
   * Send to console
   *
   * @param text
   * @param payload
   */
  _sendToConsole(text, payload) {
    console.log(text, parse(stringify(payload)));
  }

}

// Initialize torrents class
const TorrentsInstance = new Torrents();


/**
 * Resolve torrent parse
 * Listen to TORRENTS_PARSE event from main process
 * Try to parse data for provided torrent
 * Send event back to main with parsed data
 *
 * @return {void}
 */
const resolveTorrentParseEvent = () => {
  ipcRenderer.on(TORRENTS_PARSE, async (e, {token, torrents_id, torrents_file_content}) => {

    // Try to parse torrent from provided file
    // Stringify and parse torrent data (to clear prototypes)
    const torrent_parsed = await TorrentsInstance.parseTorrentFromBuffer({torrents_id, torrents_file_content});

    // Send event back with torrent parsed data
    // Provide event token
    ipcRenderer.send(TORRENTS_PARSE, {torrents_id, torrent_parsed, token});

  });
};


/**
 * Resolve torrent start event
 * Listen TORRENTS_START event from main process
 * Try to start torrent for provided file
 * Try to start torrent server
 * Also start torrent file watcher
 *
 * @return {void}
 */
const resolveTorrentStartEvent = () => {
  ipcRenderer.on(TORRENTS_START, async (e, {token, torrents_id, file_index}) => {

    // Start torrent for provided file index
    // Start torrent progress watcher
    await TorrentsInstance.startTorrentForFile({torrents_id, file_index});
    await TorrentsInstance.startTorrentProgressWatcher({torrents_id, file_index});

    // Start torrent server
    const {url} = await TorrentsInstance.startTorrentServer({torrents_id});

    // Send event back with torrent server data
    // Provide event token
    ipcRenderer.send(TORRENTS_START, {torrents_id, url, token, file_index});
  })
};


/**
 * Resolve torrent destroy event
 *
 * @return {void}
 */
const resolveTorrentClearEvent = () => {
  ipcRenderer.on(TORRENTS_CLEAR, async (e, {token, torrents_id}) => {

    // Try to destroy torrent
    await TorrentsInstance.clearTorrent({torrents_id});

    // Send event back with torrent server data
    // Provide event token
    ipcRenderer.send(TORRENTS_CLEAR, {torrents_id, token});
  })
};


// Events
resolveTorrentParseEvent();
resolveTorrentStartEvent();
resolveTorrentClearEvent();
