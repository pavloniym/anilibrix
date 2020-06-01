import {meta} from '@package'
import {Menu, shell} from 'electron'


export const aboutTemplate = [
  {
    role: 'about',
    label: 'О приложении',
  },
  {
    label: 'Telegram-канал',
    click: () => shell.openExternal(meta.links.telegram)
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
    click: () => shell.openExternal(meta.links.anilibria)
  },
  {
    label: 'Поддержать проект',
    click: () => shell.openExternal(meta.links.donate)
  },
  {
    type: 'separator'
  },
  {
    role: 'togglefullscreen',
    label: 'На полный экран',
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
];

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
        label: meta.name,
        submenu: aboutTemplate,
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
        ],
      }
    ];
  }

};
