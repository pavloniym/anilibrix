import {Menu, app, shell} from 'electron'

export default class AppMenu {

  constructor() {
    this._menu = null;
    this._mainWindow = null;
    this._torrentWindow = null;
    this._chromecastWindow = null;
  }


  /**
   * Init menu
   *
   * @return AppMenu
   */
  init() {

    // Build from template
    this._menu = Menu.buildFromTemplate(this._getMenuTemplate());

    // Set menu
    Menu.setApplicationMenu(this._menu);

    return this;
  }

  /**
   * Set window
   *
   * @param main
   * @param torrent
   * @param chromecast
   * @return {AppMenu}
   */
  setWindows({main, torrent, chromecast}) {
    this._mainWindow = main;
    this._torrentWindow = torrent;
    this._chromecastWindow = chromecast;

    return this;

  }


  /**
   * Set windows events
   *
   * @return {AppMenu}
   */
  setWindowsEvents() {
    return this;
  }


  /**
   * Get menu template
   *
   * @return Array
   * @private
   */
  _getMenuTemplate() {
    return [
      {
        label: 'AniLibrix',
        submenu: [
          {
            role: 'about',
            label: 'О приложении',
          },
          {
            label: 'Telegram-канал',
            click: () => shell.openExternal('tg://resolve?domain=anilibrix')
          },
          {
            label: 'Исходный код на GitHub',
            click: () => null,
            enabled: false
          },
          {
            type: 'separator'
          },
          {
            label: 'Анилибрия',
            click: () => shell.openExternal('https://anilibria.tv')
          },
          {
            label: 'Поддержать проект',
            click: () => shell.openExternal('https://www.anilibria.tv/pages/donate.php')
          },
          {
            type: 'separator'
          },
          {
            type: 'checkbox',
            role: 'togglefullscreen',
            label: 'На полный экран',
            checked: true,
          },
          {
            type: 'separator'
          },
          {
            role: 'minimize',
            label: 'Свернуть приложение',
          },
          {
            role: 'quit',
            label: 'Закрыть приложение',
          }
        ]
      },
      {
        label: 'Отладка',
        submenu: [
          {
            role: 'forcereload',
            label: 'Перезагрузить приложение',
          },
          {
            type: 'separator'
          },
          {
            label: 'Инструменты разработчика',
            submenu: [
              {
                label: 'Основное приложение',
                click: () => this._mainWindow.showDevTools()
              },
              {
                label: 'Торрент-сервер',
                click: () => this._torrentWindow.showDevTools()
              },
              {
                label: 'Chromecast клиент',
                click: () => this._chromecastWindow.showDevTools()
              },
            ]
          }
        ]
      }
    ];
  }


  /*_getMenuItem(label) {
    for (var i = 0; i < this._menu.items.length; i++) {
      const menuItem = this._menu.items[i].submenu.items.find(function (item) {
        return item.label === label
      });
      if (menuItem) return menuItem
    }
  }*/


};
