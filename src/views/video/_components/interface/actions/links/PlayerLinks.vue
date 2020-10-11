<template>
  <v-layout align-center justify-start ref="links">
    <template v-if="is_mounted">

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
          <v-btn v-on="on" icon large @click="toRelease(release.id)">
            <v-avatar size="24">
              <img v-bind="{src}">
            </v-avatar>
          </v-btn>
        </template>
        <span>{{title}}</span>
      </v-tooltip>


      <!-- Episodes -->
      <v-tooltip right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="getEpisodesDrawer().show()">
            <v-icon size="24">mdi-playlist-play</v-icon>
          </v-btn>
        </template>
        <span>Эпизоды</span>
      </v-tooltip>


      <!-- Torrent -->
      <v-tooltip v-if="isTorrent" right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="getTorrentDrawer().show()">
            <v-icon size="20">mdi-file-table-box-multiple</v-icon>
          </v-btn>
        </template>
        <span>Торрент</span>
      </v-tooltip>

      <!-- Opening skip button -->
      <!--<v-tooltip v-if="_opening_skip_is_enabled" right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="skipOpening">
            <span class="caption font-weight-bold">+{{_opening_skip_time}}</span>
          </v-btn>
        </template>
        <span>Перемотка опенинга</span>
      </v-tooltip>-->


    </template>
  </v-layout>
</template>

<script>

  // Storage
  import {mapState} from 'vuex'

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";
  import {toReleases} from "@router/releases/releasesRoutes";

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
    getTorrentDrawer: {
      type: Function,
      default: null
    },
    getEpisodesDrawer: {
      type: Function,
      default: null
    },
  };

  export default {
    props,
    data() {
      return {
        is_mounted: false
      }
    },
    computed: {
      ...mapState('app/settings', {
        _opening_skip_offset: s => s.player.skip_opening.offset,
        _opening_skip_is_enabled: s => s.player.skip_opening.enabled,
      }),


      /**
       * Get release poster src
       *
       * @return {string}
       */
      src() {
        return this.$__get(this.release, 'poster');
      },

      /**
       * Get title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.release, 'names.ru');
      },

      /**
       * Check if torrent
       *
       * @return {boolean}
       */
      isTorrent() {
        return this.$__get(this.source, 'type') === 'torrent';
      }

    },
    methods: {
      ...{toReleases, toRelease},


      /**
       * Skip opening
       *
       * @return {void}
       */
      skipOpening() {
        this.$emit('update:time', this.player.currentTime + (this._opening_skip_offset || 0));
      }

    },

    mounted() {
      this.is_mounted = true;
    }
  }
</script>
