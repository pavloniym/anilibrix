import store from '@store'
import { meta, repository } from '@package'
import { Menu, shell } from 'electron'

export const aboutTemplate = [
  {
    role: 'about',
    label: 'О приложении'
  },
  {
    label: 'Telegram-канал',
    click: () => shell.openExternal(meta.links.telegram)
  },
  {
    label: 'Исходный код на GitHub',
    click: () => shell.openExternal(repository.url)
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
    label: 'Свернуть приложение'
  },
  {
    role: 'quit',
    label: 'Закрыть приложение'
  }
];

export default class AppMenu {
  constructor() {
    this._menu = null;
    this._mainWindow = null;
    this._torrentWindow = null;
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
    this._mainWindow.setMenu(this._menu)
    this._torrentWindow.setMenu(this._menu)

    return this;
  }

  /**
   * Set window
   *
   * @param main
   * @param torrent
   * @return {AppMenu}
   */
  setWindows(main = null, torrent = null) {
    this._mainWindow = main;
    this._torrentWindow = torrent;

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
        submenu: aboutTemplate
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
            label: 'Добавить уведомление в хранилище',
            click: () => store.dispatch('notifications/setRelease', store.state.releases.data[0])
          },
          {
            label: 'Показать данные хранилища в консоли',
            click: () => console.log(store.state)
          },
          {
            type: 'separator'
          },
          {
            role: 'forcereload',
            label: 'Перезагрузить приложение'
          }
        ]
      },
      {
        label: 'Окно',
        submenu: [
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectall' }
        ]
      }
    ];
  }
};
