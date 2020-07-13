import store from '@store'
import {meta} from '@package'
import {Menu, shell} from 'electron'
import {APP_NOTIFICATION} from "@main/handlers/app/appHandlers";

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
  setWindows(main = null, torrent = null, chromecast = null) {
    this._mainWindow = main;
    this._torrentWindow = torrent;
    this._chromecastWindow = chromecast;

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
            role: 'toggledevtools',
            label: 'Консоль приложения',
            click: () => this._mainWindow.showDevTools()
          },
          {
            label: 'Консоль торрент-сервер',
            click: () => this._torrentWindow.showDevTools()
          },
          {
            type: 'separator'
          },
          {
            label: 'Показать тестовое уведомление',
            click: () => this._mainWindow.sendToWindow(APP_NOTIFICATION, store.state.releases.data[0])
          },
          {
            label: 'Добавить уведомление в хранилище',
            click: () => store.dispatch('notifications/setRelease', store.state.releases.data[0])
          },
          {
            type: 'separator'
          },
          {
            label: 'Показать данные хранилища в консоли',
            click: () => console.log(store.state),
          },
          {
            type: 'separator'
          },
          {
            role: 'forcereload',
            label: 'Перезагрузить приложение',
          }
        ],
      },
      {
        label: 'Окно',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'selectall'},
        ]
      }
    ];
  }

};
