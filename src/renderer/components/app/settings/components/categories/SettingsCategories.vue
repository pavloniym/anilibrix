<template>
  <v-layout column>

    <!--<v-toolbar class="shrink">
      <v-toolbar-title>Настройки</v-toolbar-title>
    </v-toolbar>-->


    <v-divider />
    <v-list dense nav>
      <template v-for="(category, k) in categories">
        <v-subheader v-text="category.title" :key="k"/>
        <template v-for="(item, k) in category.items">
          <v-list-item link @click="item.action" :disabled="item.disabled">
            <v-layout align-center>

              <v-list-item-action>
                <v-icon :color="item.disabled ? 'grey' : null" v-text="item.icon" />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
                <v-list-item-subtitle v-text="item.subtitle" />
              </v-list-item-content>

            </v-layout>
          </v-list-item>
        </template>
      </template>
    </v-list>

  </v-layout>
</template>

<script>

  import {mapActions} from 'vuex'

  export default {
    computed: {

      categories() {
        return [
          {
            title: 'Основные',
            items: [
              {
                title: 'Профиль',
                subtitle: 'Авторизация и управление акканутом',
                icon: 'mdi-account',
                disabled: true,
                action: () => this.setComponent('Profile'),
              },
              {
                title: 'Воспроизведение',
                subtitle: 'Настройки воспроизведения и качества',
                icon: 'mdi-play',
                action: () => this.setComponent('Player'),
              },
              {
                title: 'Торрент',
                subtitle: 'Список раздач, настройки торрент-воспроизведения',
                icon: 'mdi-upload',
                disabled: true,
                action: () => "",
              },
              {
                title: 'Плейлист',
                subtitle: 'Управление плейлистом',
                icon: 'mdi-playlist-play',
                disabled: true,
                action: () => "",
              },
              {
                title: 'Уведомления',
                subtitle: 'Настройка уведомлений',
                icon: 'mdi-bell',
                disabled: true,
                action: () => "",
              },
            ]
          },
          {
            title: 'Приложение',
            items: [
              {
                title: 'Подключение',
                subtitle: 'Настройки сети и прокcи-сервер',
                icon: 'mdi-wan',
                action: () => this.setComponent('Connection'),
              },
              {
                title: 'Система',
                subtitle: 'Системное меню и команды',
                icon: 'mdi-cogs',
                disabled: true,
                action: () => "",
              }
            ]
          }
        ]
      }


    },
    methods: {
      ...mapActions('settings', ['setComponent']),
    }
  }
</script>
