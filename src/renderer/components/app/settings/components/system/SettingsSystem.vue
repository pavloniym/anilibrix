<template>
  <v-layout column fill-height>
    <v-toolbar class="shrink">
      <v-app-bar-nav-icon @click="backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Система</v-toolbar-title>
    </v-toolbar>
    <v-card color="transparent" flat>
      <v-card-text>

        <!-- Updates -->
        <h4>Версия и обновление</h4>
        <v-list nav class="px-0">
          <v-list-item @click="setUpdatesAutoState(!_updatesAuto)">
            <v-list-item-action>
              <v-switch hide-details :input-value="_updatesAuto"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="body-2" v-text="'Обновлять автоматически'" :style="{lineHeight: 1}" />
              <v-list-item-subtitle v-if="updates.checking" v-text="'Проверка обновлений...'" />
              <v-list-item-subtitle v-else v-text="`Версия ${app.version}`" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="checkForUpdate">
            <v-list-item-content>
              <v-list-item-title class="body-2" v-text="'Проверить наличие обновлений'"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>

  import app from '@/../package'
  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        updates: {
          checking: false,
        }
      }
    },
    computed: {
      ...mapState('settings/system', {
        _updatesAuto: s => s.updates.auto
      }),


      /**
       * Get app data
       *
       * @return {{version: string}}
       */
      app() {
        return {
          version: app.version
        }
      }

    },
    methods: {
      ...mapActions('settings', ['backToSettingsCategories']),
      ...mapActions('settings/system', [
        'setUpdatesAutoState'
      ]),


      /**
       * Check for update
       *
       * @return void
       */
      checkForUpdate() {
        this.updates.checking = true;


      }
    }
  }
</script>
