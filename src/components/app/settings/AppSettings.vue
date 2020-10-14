<template>
  <div>
    <template v-for="(item, k) in settings">

      <!-- Settings Group Header  -->
      <div class="pa-4 caption" :key="`group:${k}`" :class="item.class">
        <div class="body-1 white--text">{{item.title}}</div>
        <template v-for="(description, d) in item.description">
          <div class="grey--text" :key="d">{{description}}</div>
        </template>
      </div>

      <!-- Settings Fields -->
      <template v-for="(field, f) in item.fields">
        <v-divider v-if="field.divider" :key="`d:${k}:${f}`"/>
        <component v-bind="field.props" :is="field.is" :key="`${k}:${f}`"/>
      </template>

    </template>
  </div>
</template>

<script>

  // Components
  import {Input, Switch, Action} from "./components/fields";

  // Mixins
  import {PlatformMixin, DeviceMixin} from '@mixins/app'

  // Utils
  import {meta} from "@package";
  import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";

  // Resolvers
  import AppResolver from "@@/utils/resolvers/app";
  import ErrorResolver from "@@/utils/resolvers/error";
  import NotificationsResolver from "@@/utils/resolvers/notifications";

  export default {
    mixins: [PlatformMixin, DeviceMixin],
    computed: {

      /**
       * Get all settings
       *
       * @return {array}
       */
      settings() {
        return [

          ...this.playerSettings,
          ...this.appSettings,
          ...this.adsSettings,
          ...this.commandsSettings,
          ...this.linksSettings,
          ...this.devtoolsSettings,

        ].filter(settings => settings.visible)
      },


      /**
       * Get player settings
       *
       * @return {array}
       */
      playerSettings() {
        return [
          {
            title: 'Воспроизведение релизов',
            visible: true,
            description: [
              'В данном разделе вы можете настроить возможность смотреть релизы, используя торренты, ' +
              'а также другие настройки воспроизведения',
            ],
            fields: [
              {
                is: Switch,
                props: {
                  path: 'player.torrents.is_enabled',
                  hint: [
                    'Использование торрентов требует бОльшего времени подключения и парсинга, что может негативно ' +
                    'сказаться на скорости загрузки данных по релизам, особенно — при использовании прокси-сервера'
                  ],
                  title: 'Торренты',
                  subtitle: [
                    'Вы можете подключить торренты, которые автоматически буду связаны с эпизодами релизов и доступны для просмотра.',
                    'Торренты не требуют стороннего плеера или клиента и доступны онлайн, в меню выбора качества воспроизведения релиза.'
                  ],
                  label: 'Воспроизводить торренты'
                }
              },
              {
                is: Switch,
                props: {
                  path: 'player.autoplay.is_enabled',
                  hint: ['После окончания эпизода плеер автоматически начнет воспроизведение следующего эпизода в релизе при его наличии'],
                  label: 'Автовоспроизведение следующего эпизода',
                  class: ['mt-2']
                }
              },
              {
                is: Switch,
                props: {
                  path: 'player.anime4k.is_enabled',
                  hint: [
                    'Использовать современные технологии, модные нейросети и немного черной магии, чтобы утилизировать мощности вашего компьютера и улучшить изображение до 2K и 4К',
                    'Веский повод достать с балкона ваши дорогущие 4К мониторы и телевизоры. На остальных поверхностях результат работы нейросетей менее заметен...'
                  ],
                  label: 'Подключить Anime4K',
                  class: ['mt-2']
                }
              },
              {
                is: Switch,
                props: {
                  path: 'player.skip_opening.is_enabled',
                  hint: [
                    'В интерфейсе плеера появится дополнительная кнопка, которая перемотает плеер на указанное количество секунд',
                    'Данная кнопка не гарантирует корректный пропуск опенинга'
                  ],
                  label: 'Кнопка пропуска опенинга',
                  class: ['mt-2']
                }
              },
              {
                is: Input,
                divider: true,
                props: {
                  min: 0,
                  path: 'player.skip_opening.offset',
                  type: 'number',
                  title: 'Вы можете указать на сколько секунд пропускать опенинг',
                  label: 'Количество секунд для пропуска опенинга',
                  suffix: 'сек',
                  handler: (value) => value && value > 0 ? parseInt(value) : 0
                }
              }
            ]
          }
        ];
      },


      /**
       * Get app settings
       *
       * @return {array}
       */
      appSettings() {
        return [
          {
            class: ['mt-6'],
            title: 'Приложение',
            visible: true,
            description: [
              'В данном разделе вы можете настроить автоматическое обновление релизов, системные уведомления и ' +
              'другие параметры приложения',
            ],
            fields: [
              {
                is: Switch,
                props: {
                  path: 'app.notifications.system',
                  hint: [
                    'Если при загрузке последних релизов приложение обнаружит обновленный релиз, то оно покажет ' +
                    'системное уведомление о новом эпизоде'
                  ],
                  label: 'Показывать системные уведомления',
                }
              },
              {
                is: Switch,
                props: {
                  path: 'app.releases_updates.is_enabled',
                  hint: ['Приложение будет в фоне обновлять последние релизы, даже если оно свернуто'],
                  label: 'Автоматическое обновление релизов',
                  class: ['mt-2']
                }
              },
              {
                is: Input,
                divider: true,
                props: {
                  min: 1,
                  path: 'app.releases_updates.timeout',
                  type: 'number',
                  title: 'Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме',
                  label: 'Периодичность обновления релизов',
                  suffix: 'мин',
                  handler: (value) => value && value >= 1 ? parseInt(value) : 1
                }
              }
            ]
          }
        ]
      },


      /**
       * Get ads settings
       *
       * @return {array}
       */
      adsSettings() {
        return [
          {
            class: ['mt-6'],
            title: 'Реклама',
            visible: true,
            description: ['Настройка отображения рекламных вставок перед воспроизведением релизов'],
            fields: [
              {
                is: Switch,
                props: {
                  path: 'ads.is_enabled',
                  hint: [
                    'Спасибо, что выбрали Анилибрию!',
                    'Мы понимаем, что реклама никому не нравится, но это бесплатный способ поддержать проект.\n' +
                    'Отключение рекламы - абсолютно бесплатно, но, если вы хотите поддержать нас, то оставьте рекламу включенной.\n' +
                    'Обещаем, что не будем сильно навязчивыми (✿◠‿◠)'
                  ],
                  label: 'Показывать рекламу',
                }
              },
              {
                is: Switch,
                props: {
                  path: 'ads.is_maximum',
                  hint: [
                    'Максимальная поддержка проекта!',
                    'Реклама будет показываться перед каждым просмотром любого эпизода'
                  ],
                  label: 'Показывать рекламу перед каждым эпизодом',
                  class: ['mt-2']
                }
              },
            ]
          }
        ]
      },


      /**
       * Commands settings
       *
       * @return {array}
       */
      commandsSettings() {
        return [
          {
            class: ['mt-6'],
            title: 'Команды',
            visible: true,
            description: ['Некоторые полезные команды для управления приложением'],
            fields: [
              {
                is: Action,
                props: {
                  label: 'Свернуть приложение',
                  action: () => runOnPlatform(() => window.location.reload(), () => this.$electron.remote.getCurrentWindow().minimize()),
                  description: this.isDesktop ? this.shortcuts['minimize'] : null,
                },
                visible: this.isDesktop,
              },
              {
                is: Action,
                props: {
                  label: 'Закрыть приложение',
                  action: () => runOnPlatform(() => window.close(), () => this.$electron.remote.getCurrentWindow().close()),
                  description: this.isDesktop ? this.shortcuts['close'] : null,
                },
                visible: true,
                divider: true
              },
              {
                is: Action,
                props: {
                  label: 'Перезагрузить приложение',
                  action: () => runOnPlatform(() => window.location.reload(), () => this.$electron.remote.getCurrentWindow().reload()),
                  description: this.isDesktop ? this.shortcuts['reload'] : null,
                },
                visible: true,
                divider: true
              }
            ].filter(field => field.visible)
          }
        ]
      },


      /**
       * Links settings
       *
       * @return {array}
       */
      linksSettings() {
        return [
          {
            class: ['mt-6'],
            title: 'Ссылки',
            visible: true,
            description: ['Некоторые полезные ссылки'],
            fields: [
              {
                is: Action,
                props: {
                  label: 'Анилибрия',
                  action: () => runOnPlatform(() => window.open(meta.links.anilibria, '_blank'), () => this.$electron.shell.openExternal(meta.links.anilibria)),
                  description: meta.links.anilibria,
                },
              },
              {
                is: Action,
                props: {
                  label: 'Исходный код',
                  action: () => runOnPlatform(() => window.open(meta.links.github, '_blank'), () => this.$electron.shell.openExternal(meta.links.github)),
                  description: 'anilibrix.git',
                },
                divider: true
              },
              {
                is: Action,
                props: {
                  label: 'Telegram-канал',
                  action: () => runOnPlatform(() => window.open(meta.links.telegram, '_blank'), () => this.$electron.shell.openExternal(meta.links.telegram)),
                  description: '@anilibrix',
                },
                divider: true
              },
              {
                is: Action,
                props: {
                  label: 'Поддержать проект',
                  action: () => runOnPlatform(() => window.open(meta.links.donate, '_blank'), () => this.$electron.shell.openExternal(meta.links.donate)),
                  description: 'Яндекс.Деньги, QIWI, PayPal',
                },
                divider: true
              },
            ]
          }
        ]
      },


      /**
       * Devtools settings
       *
       * @return {array}
       */
      devtoolsSettings() {
        return [
          {
            class: ['mt-6'],
            title: 'Отладка',
            description: ['Инструменты отладки и разработки'],
            visible: this.$store.state.app.settings.app.devtools,
            fields: [
              {
                is: Action,
                props: {
                  label: 'Консоль приложения',
                  action: () => runOnPlatform(null, () => AppResolver.showAppDevtools()),
                  description: 'devtools:app',
                },
              },
              {
                is: Action,
                props: {
                  label: 'Консоль торрент-сервера',
                  action: () => runOnPlatform(null, () => AppResolver.showTorrentDevtools()),
                  description: 'devtools:torrent',
                },
                divider: true,
              },
              {
                is: Action,
                props: {
                  label: 'Показать тестовую ошибку',
                  action: () => ErrorResolver.emitError('Тестовая ошибка')
                },
                divider: true,
              },
              {
                is: Action,
                props: {
                  label: 'Добавить тестовое уведомление о новом релизе',
                  action: () => {

                    // Get first release and episode from releases data
                    // Calculate random release index
                    const releases = this.$__get(this.$store.state, 'releases.data') || [];
                    const random_release_index = Math.round(Math.random() * releases.length);

                    // Get release and episode
                    const release = releases && releases[random_release_index] ? releases[random_release_index] : null;
                    const episode = release && release.episodes[0] ? release.episodes[0] : null;

                    // Dispatch store event
                    this.$store.dispatch('notifications/addNotification', {release, episode});

                    // Show app notification
                    NotificationsResolver.emitNotification({release, episode});
                  }
                },
                divider: true,
              },
              {
                is: Action,
                props: {
                  label: 'Показать данные хранилища в консоли',
                  action: () => console.log(this.$store.state),
                },
                divider: true,
              },
              {
                is: Action,
                props: {
                  label: 'Полностью сбросить store',
                  action: async () => await this.$store.dispatch('RESET_STORE')
                },
                divider: true,
              },
            ]

          }
        ]
      },

      /**
       * Get keyboard shortcuts
       *
       * @return {*}
       */
      shortcuts() {
        return {
          'close': this.isMac ? '⌘ + Q' : 'Alt + Q',
          'reload': this.isMac ? '⌘ + ⇧ + R' : 'Ctrl + Shift + R',
          'minimize': this.isMac ? '⌘ + M' : 'Ctrl + M',
        }
      }

    }

  }
</script>
