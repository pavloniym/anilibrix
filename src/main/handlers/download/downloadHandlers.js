import { download } from 'electron-dl';
import { v4 as uuid } from 'uuid';
import { ipcRenderer, ipcMain, shell } from 'electron'

const DOWNLOAD_INIT = 'app:download:init';
const DOWNLOAD_OPEN = 'app:download:open';
const DOWNLOAD_CANCEL = 'app:download:cancel';
const DOWNLOAD_STARTED = 'app:download:started';
const DOWNLOAD_PROGRESS = 'app:download:progress';

/**
 * Download init function
 * From rendered process
 *
 * @param url
 * @param source
 * @param release
 * @param episode
 */
const initDownload = (url, source, release, episode) => {
  ipcRenderer.send(DOWNLOAD_INIT, { url, source, release, episode });
};

/**
 * Start download file
 * From main process
 *
 * @param storage
 * @param MainWindow
 */
const startingDownload = (storage, MainWindow) => {
  ipcMain.on(DOWNLOAD_INIT, async (e, { url, source, release, episode }) => {
    // Create id
    const id = uuid();

    // Run download
    // Save file item emitter after promise resolve
    storage[id] = await download(MainWindow.getWindow(), url, {
      saveAs: true,
      onStarted: item => _onDownloadStarted(id, item, source, release, episode, MainWindow, storage),
      onProgress: progress => _onProgress(id, progress, MainWindow)
    });
  });
};

/**
 * Cancel download
 *
 * @param storage
 */
const cancelingDownload = (storage) => {
  ipcMain.on(DOWNLOAD_CANCEL, (e, id) => {
    if (storage[id]) {
      // Cancel download
      // Remove from storage
      storage[id].cancel();
      delete storage[id];
    }
  });
};

/**
 * Started download event
 *
 * @param callback
 */
const startedDownload = (callback) => {
  ipcRenderer.on(DOWNLOAD_STARTED, (e, { id, release, episode, source }) =>
    // eslint-disable-next-line standard/no-callback-literal
    callback({ id, release, episode, source, progress: null })
  );
};

/**
 * On download progress event
 *
 * @param callback
 */
// eslint-disable-next-line standard/no-callback-literal
const progressDownload = (callback) => ipcRenderer.on(DOWNLOAD_PROGRESS, (e, { id, progress }) => callback({
  id,
  progress
}));

/**
 * Send cancel download event to main process
 *
 * @param id
 */
const cancelDownload = (id) => ipcRenderer.send(DOWNLOAD_CANCEL, id);

/**
 * Send open download file event to main process
 *
 * @param id
 */
const openDownload = (id) => ipcRenderer.send(DOWNLOAD_OPEN, id);

/**
 * Opening download
 *
 * @param storage
 */
const openingDownload = (storage) => {
  ipcMain.on(DOWNLOAD_OPEN, (e, id) => {
    if (storage[id]) {
      shell.openItem(storage[id].savePath);
    }
  })
};

/**
 * On downloaded started callback
 *
 * @param id
 * @param item
 * @param source
 * @param release
 * @param episode
 * @param MainWindow
 * @param storage
 * @private
 */
const _onDownloadStarted = (id, item, source, release, episode, MainWindow, storage) => {
  // Send to window
  // Save to storage
  MainWindow.sendToWindow(DOWNLOAD_STARTED, { id, source, release, episode });
  storage[id] = item;
};

/**
 * On progress callback
 *
 * @param id
 * @param progress
 * @param MainWindow
 * @return {*}
 * @private
 */
const _onProgress = (id, progress, MainWindow) => MainWindow.sendToWindow(DOWNLOAD_PROGRESS, { id, progress });

export {
  initDownload,
  openDownload,
  cancelDownload,
  startedDownload,
  openingDownload,
  startingDownload,
  progressDownload,
  cancelingDownload
}
