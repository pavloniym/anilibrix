<template>
  <v-layout align-center justify-start ref="links">
    <template v-if="is_mounted">
      <component
        v-on="control.events"
        v-for="(control, k) in controls"
        v-bind="control.props"
        :is="control.is"
        :key="k"
        :class="control.classes">
      </component>


      <!-- Torrent -->
      <!--<v-tooltip v-if="isTorrent" right :attach="$refs.links">
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon large @click="getTorrentDrawer().show()">
            <v-icon size="20">mdi-file-table-box-multiple</v-icon>
          </v-btn>
        </template>
        <span>Торрент</span>
      </v-tooltip>-->

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

  // Components
  import Home from './_components/home'
  import Volume from './_components/volume'
  import Release from './_components/release'

  // Storage
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
    getTorrentDrawer: {
      type: Function,
      default: null
    }
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
        _opening_skip_is_enabled: s => s.player.skip_opening.is_enabled,
      }),


      /**
       * Get controls
       *
       * @return {array}
       */
      controls() {
        return [
          {
            is: Home,
          },
          {
            is: Release,
            props: {release: this.release},
          },
          {
            is: Volume,
            props: {player: this.player},
            events: {
              'update:muted': $event => this.$emit('update:muted', $event),
              'update:volume': $event => this.$emit('update:volume', $event),
            }
          },
        ]
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
