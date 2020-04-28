import path from "path";
import {Menu, nativeImage, Tray} from "electron";

export default class {

  constructor() {
    this.tray = null
  }

  /**
   * Create tray icon
   *
   * @return void
   */
  createTrayIcon({MainWindow}) {

    // Get icon path
    const iconPath = path.join(__dirname, '../../build/icons/tray/icon.png');

    // Create tray with icon
    this.tray = new Tray(nativeImage.createFromPath(iconPath));

    // Create context menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Свернуть',
        type: 'normal',
        role: 'minimize',
      },
      {
        label: 'Отключить уведомления',
        type: 'normal',
        enabled: false
      },
      {
        label: 'Закрыть',
        type: 'normal',
        role: 'quit'
      },
    ]);

    this.tray.setToolTip('AniLibrix');
    this.tray.setIgnoreDoubleClickEvents(true);
    this.tray.setContextMenu(contextMenu);
    this.tray.on('click', () => {

      // Restore window if it is minimized
      if (MainWindow.get().isMinimized()) MainWindow.get().restore();

      // Focus on window
      MainWindow.get().focus();
    });

  };


}
