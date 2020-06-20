<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Системные команды</div>
      <div>Некоторые полезные команды для управления приложением</div>
    </div>

    <v-card>
      <v-list dense>
        <template v-for="(item, k) in settings">
          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" @click="item.action">
            <v-list-item-content>
              <v-list-item-title v-text="item.title" :class="item.classes"/>
            </v-list-item-content>
            <v-list-item-action class="text-right">
              <v-list-item-subtitle v-text="item.value"/>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>


    <!-- Dialogs -->
    <template v-if="isMounted">
      <component
        v-for="(dialog,k) in dialogs"
        :is="dialog.component"
        :key="k"
        :ref="dialog.ref"
        :attach="$refs.settings">
      </component>
    </template>

  </div>
</template>

<script>

  import ExitDialog from './dialogs/exit'
  import CacheDialog from './dialogs/cache'

  export default {
    data() {
      return {
        isMounted: false,
      }
    },

    computed: {

      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Перезагрузить приложение',
            value: this.shortcuts['reload'],
            action: () => this.$electron.remote.getCurrentWindow().reload(),
          },
          {
            title: 'Свернуть приложение',
            value: this.shortcuts['minimize'],
            action: () => this.$electron.remote.getCurrentWindow().minimize(),
          },
          {
            title: 'Закрыть приложение',
            value: this.shortcuts['close'],
            action: () => this.$refs.exit[0].showDialog(),
          },
          {
            title: 'Сбросить кеш и настройки приложения',
            action: () => this.$refs.cache[0].showDialog(),
          }
        ]
      },


      /**
       * Get dialogs
       *
       * @return Array
       */
      dialogs() {
        return [
          {component: ExitDialog, ref: 'exit'},
          {component: CacheDialog, ref: 'cache'}
        ]
      },


      /**
       * Get actions shortcuts
       *
       * @return {object}
       */
      shortcuts() {
        return {
          'close': process.platform === 'darwin' ? '⌘Q' : 'Alt + Q',
          'reload': process.platform === 'darwin' ? '⌘⇧R' : 'Ctrl + Shift + R',
          'minimize': process.platform === 'darwin' ? '⌘M' : 'Ctrl + M',
          'fullscreen': process.platform === 'darwin' ? '⌃⌘F' : 'Ctrl + F',
        }
      }

    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>
