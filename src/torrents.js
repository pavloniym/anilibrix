// To keep the UI snappy, we run WebTorrent in its own hidden window, a separate
// process from the main window.

// Electron
import {ipcRenderer} from 'electron'

// System Utils
const path = require('path');
const rimraf = require('rimraf');

// WebTorrent Utils
const WebTorrent = require('webtorrent');
const parse_torrent = require('parse-torrent');

// Utils
import {parse, stringify} from 'flatted'

// Resolvers
import {TORRENTS_PARSE} from "@@/utils/resolvers/torrents/torrentsResolver";

class Torrents {

  constructor() {

    // Create WebTorrentClient
    // Connect to the WebTorrent and BitTorrent networks. WebTorrent Desktop is a hybrid
    // client, as explained here: https://webtorrent.io/faq
    this.torrent_client = new WebTorrent();

    this.servers = {}; // Servers instances for torrents
    this.torrents = {}; // Torrents instances
    this.handlers = {}; // Update handlers
    this.parsed_torrents_collection = {}; // Parsed torrents collection
  }


  /**
   * Parse torrent from file
   *
   * @param torrents_id
   * @param torrents_file_content
   */
  async parseTorrentFromFile(torrents_id, torrents_file_content) {
    try {
      let torrent_parsed_data = null;
      if (torrents_file_content !== null) {

        // If blob is provided -> try to create buffer with torrent file
        // Try to parse torrent
        torrent_parsed_data = await parse_torrent(new Buffer(torrents_file_content));

        // Save torrent data to store
        // Show in console parsed torrent
        this._saveParsedTorrent(torrents_id, torrent_parsed_data);
        this._sendToConsole('Torrent is parsed!', {torrents_id, torrent_parsed_data});

        return torrent_parsed_data;
      }
    } catch (error) {
      this._sendError({torrents_id, message: 'Произошла ошибка при парсинге торрент-файла', error});
    }
  }


  /**
   * Save parsed torrent to collection
   *
   * @param torrents_id
   * @param torrent_parsed_data
   * @return {void}
   * @private
   */
  _saveParsedTorrent(torrents_id, torrent_parsed_data) {
    this.parsed_torrents_collection[torrents_id] = torrent_parsed_data;
  }


  /**
   * Send torrent error
   *
   * @param torrents_id
   * @param message
   * @param error
   */
  _sendError = ({torrents_id, message = null, error = null} = {}) => {

    // Show in console
    // Send error message
    console.log('Torrent Error', {torrents_id, error, message});

    //sendTorrentError({torrentId, error, message});
  };


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
    const torrent_parsed_data = await TorrentsInstance.parseTorrentFromFile(torrents_id, torrents_file_content);

    // Send event back with torrent parsed data
    // Provided event token
    ipcRenderer.send(TORRENTS_PARSE, {torrents_id, torrent_parsed_data, token});

  });
};


// Events
resolveTorrentParseEvent();
