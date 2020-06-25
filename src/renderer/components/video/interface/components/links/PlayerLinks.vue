<template>
  <v-layout align-center justify-start ref="links">
    <template v-if="isMounted">

      <!-- Releases -->
      <v-tooltip right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="toReleases">
            <v-icon size="24">mdi-view-column</v-icon>
          </v-btn>
        </template>
        <span>К списку релизов</span>
      </v-tooltip>


      <!-- Release -->
      <v-tooltip right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="toRelease">
            <v-avatar size="24">
              <img :src="release.poster.image">
            </v-avatar>
          </v-btn>
        </template>
        <span>{{release.names.ru}}</span>
      </v-tooltip>


      <!-- Playlist -->
      <v-tooltip right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="playlist().show()">
            <v-icon size="24">mdi-playlist-play</v-icon>
          </v-btn>
        </template>
        <span>Плейлист</span>
      </v-tooltip>


      <!-- Torrent -->
      <v-tooltip v-if="source.type === 'torrent'" right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="torrent().show()">
            <v-icon size="20">mdi-file-table-box-multiple</v-icon>
          </v-btn>
        </template>
        <span>Данные по торренту</span>
      </v-tooltip>


      <!--&lt;!&ndash; Upscale &ndash;&gt;
      <v-tooltip v-if="source.type === 'upscale'" right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="upscale().show()">
            <v-icon size="24">mdi-resize</v-icon>
          </v-btn>
        </template>
        <span>Настройки интерполяций</span>
      </v-tooltip>-->


      <!-- Opening skip button -->
      <v-tooltip v-if="_opening_skip_button" right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="skipOpening">
            <span class="caption font-weight-bold">+{{_opening_skip_time}}</span>
          </v-btn>
        </template>
        <span>Перемотка опенинга</span>
      </v-tooltip>


    </template>
  </v-layout>
</template>

<script>

  import {mapState} from 'vuex'

  const props = {
    player: {
      type: Object,
      default: null
    },
    release: {
      type: Object,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    playlist: {
      type: Function,
      default: null
    },
    torrent: {
      type: Function,
      default: null
    },
    upscale: {
      type: Function,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        isMounted: false
      }
    },
    computed: {
      ...mapState('app/settings/player', {
        _opening_skip_time: s => s.opening.skip_time,
        _opening_skip_button: s => s.opening.skip_button,
      }),

    },
    methods: {


      /**
       * Go to releases
       *
       * @return void
       */
      toReleases() {
        this.$router.push({
          name: 'releases'
        })
      },


      /**
       * Go to release
       *
       * @return void
       */
      toRelease() {
        this.$router.push({
          name: 'release',
          params: {
            releaseId: this.release.id,
            releaseName: this.release.names.original
          }
        })
      },


      /**
       * Skip opening
       *
       * @return {void}
       */
      skipOpening() {
        this.player.currentTime = parseInt(this._opening_skip_time || 0) || 0;
      }
    },

    mounted() {

      // Set mounted state
      this.isMounted = true;

    }
  }
</script>
