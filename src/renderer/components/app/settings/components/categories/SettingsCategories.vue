<template>
  <v-layout column fill-height>

    <v-divider/>
    <v-list dense nav>
      <template v-for="(category, k) in categories">
        <v-subheader v-text="category.title" :key="k"/>
        <template v-for="(item, k) in category.items">
          <v-list-item link @click="item.action" :disabled="item.disabled">
            <v-layout align-center>

              <v-list-item-action>
                <v-icon :color="item.disabled ? 'grey' : null" v-text="item.icon"/>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"/>
                <v-list-item-subtitle v-text="item.subtitle"/>
              </v-list-item-content>

            </v-layout>
          </v-list-item>
        </template>
      </template>
    </v-list>

    <!-- Credentials -->
    <v-spacer/>
    <v-card class="py-3" color="transparent" flat>
      <v-card-text class="caption">
        <div>Версия {{app.version}}</div>
        <div>Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра.</div>
        <div class="footer__links">
          <span class="footer__link" @click.prevent="openLink('https://anilibria.tv')">Анилибрия</span>
          <span class="footer__link" @click.prevent="openLink('https://github.com/anilibria')">Исходный код</span>
        </div>
      </v-card-text>
    </v-card>

  </v-layout>
</template>

<script>

  import app from '@/../package'
  import {shell} from 'electron'
  import {mapActions} from 'vuex'

  export default {
    computed: {

      /**
       * Get application data
       *
       * @return object
       */
      app() {
        return {
          version: app.version
        }
      },


      /**
       * Get list of settings categories
       *
       * @return array
       */
      categories() {
        return [
          {
            title: 'Основные',
            items: [
              {
                icon: 'mdi-account',
                title: 'Профиль',
                action: () => this._setComponent('Profile'),
                subtitle: 'Авторизация и управление акканутом',
                disabled: true,
              },
              {
                icon: 'mdi-play',
                title: 'Воспроизведение',
                action: () => this._setComponent('Player'),
                subtitle: 'Настройки воспроизведения и качества',
                disabled: true,
              },
              {
                icon: 'mdi-upload',
                title: 'Торрент',
                action: () => this._setComponent('Torrents'),
                subtitle: 'Список раздач, настройки торрент-воспроизведения',
              },
              {
                icon: 'mdi-playlist-play',
                title: 'Плейлист',
                action: () => "",
                subtitle: 'Управление плейлистом',
                disabled: true,
              },
              {
                icon: 'mdi-bell',
                title: 'Уведомления',
                action: () => "",
                subtitle: 'Настройка уведомлений',
                disabled: true,
              },
            ]
          },
          {
            title: 'Приложение',
            items: [
              {
                icon: 'mdi-wan',
                title: 'Подключение',
                action: () => this._setComponent('Connection'),
                subtitle: 'Настройки сети и прокcи-сервер',
              },
              {
                icon: 'mdi-cogs',
                title: 'Система',
                action: () => this._setComponent('System'),
                subtitle: 'Системное меню и команды',
                disabled: true,
              }
            ]
          }
        ]
      }
    },

    methods: {
      ...mapActions('app/settings', {_setComponent: 'setComponent'}),


      /**
       * Open link in OS default browser
       *
       * @param link
       */
      openLink(link) {
        shell.openExternal(link);
      }
    }
  }

</script>

<style lang="scss" scoped>

  .footer {
    &__link {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__links {
      display: flex;

      > span {
        &::after {
          content: "-";
          display: inline-block;
          padding: 0 3px;
          text-decoration: none;
        }

        &:last-child {
          &::after {
            content: none;
          }
        }
      }

    }


  }

</style>
