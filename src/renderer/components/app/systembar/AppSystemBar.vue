<template>
  <v-layout
    align-center
    class="black system-bar white--text px-2"
    :class="{'is-mac--fullscreen': _is_mac && _is_fullscreen}"
    @dblclick="maximizeApp">

    <template v-if="_is_mac === false">
      <v-spacer v-if="_is_windows"/>
      <template v-for="(control, k) in controls">
        <v-btn icon small class="system-bar__button" :key="k" @click="control.action">
          <v-icon small color="grey">{{control.icon}}</v-icon>
        </v-btn>
      </template>
    </template>

  </v-layout>
</template>

<script>

  import {remote} from 'electron'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState('app', {
        _is_mac: s => s.is_mac,
        _is_windows: s => s.is_windows,
        _is_fullscreen: s => s.is_fullscreen,
      }),


      /**
       * Get controls
       *
       * @return Array
       */
      controls() {
        return [
          {
            icon: 'mdi-minus',
            sort: this._is_windows ? 0 : 1,
            action: () => this.minimizeApp(),
          },
          {
            icon: 'mdi-window-maximize',
            action: () => this.maximizeApp(),
            sort: this._is_windows ? 1 : 2
          },
          {
            icon: 'mdi-close',
            action: () => this.closeApp(),
            sort: this._is_windows ? 2 : 0
          },
        ].sort((a, b) => a.sort - b.sort)
      }

    },

    methods: {

      /**
       * Close app
       *
       * @return void
       */
      closeApp() {
        remote.app.quit();
      },

      /**
       * Minimize app
       *
       * @return void
       */
      minimizeApp() {
        remote.getCurrentWindow().minimize();
      },


      /**
       * Maximize app
       *
       * @return void
       */
      maximizeApp() {
        const window = remote.getCurrentWindow();
        window.isMaximized() ? window.unmaximize() : window.maximize();
      }
    }

  }
</script>

<style lang="scss" scoped>

  .system-bar {
    z-index: 5;
    height: 40px;
    -webkit-app-region: drag;

    &__button {
      -webkit-app-region: no-drag;
    }

    &.is-mac--fullscreen {
      display: none;
    }
  }

</style>
