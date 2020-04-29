import {Menu, nativeImage, Tray} from "electron";

export default class {

  constructor() {
    this.tray = null;
  }


  /**
   * Get tray template
   *
   * @return Array
   */
  getTemplate() {
    return [
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
    ]
  }


  /**
   * Create tray icon
   *
   * @param MainWindow
   * @param iconPath
   * @return this
   */
  createTrayIcon({iconPath}) {

    // Create tray with icon
    // Create context menu
    this.tray = new Tray(nativeImage.createFromPath(iconPath));
    this.tray.setContextMenu(Menu.buildFromTemplate(this.getTemplate()));
    this.tray.setIgnoreDoubleClickEvents(true);

    return this;
  };


  /**
   * Set tooltip
   *
   * @param tooltip
   * @return this
   */
  setTooltip(tooltip) {
    this.tray.setToolTip(tooltip);

    return this;
  }


  setClickEvent(callback) {
    this.tray.on('click', callback);

    return this;
  }

}
