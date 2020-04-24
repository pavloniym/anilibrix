<template>
  <player-layout ref="container">
    <component v-bind="{sources, source}" :is="component">

      <template v-slot:default="{player}">
        <player-interface
          v-bind="{player, sources, source}"
          :release="_release"
          :episode="_episode"
          :container="$refs.container.$el">
        </player-interface>
      </template>

    </component>
  </player-layout>
</template>

<script>

  import PlayerLayout from '@layouts/player'
  import PlayerInterface from '@components/player/interface'
  import {PlayerLoading, PlayerBuffering} from '@components/player/loaders'
  import {PlayerSourcesServer, PlayerSourcesTorrent} from '@components/player/sources'

  import __get from 'lodash/get';
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      PlayerLayout,
      PlayerLoading,
      PlayerBuffering,
      PlayerInterface,
    },
    computed: {
      ...mapState('player', {
        _release: s => s.release,
        _episode: s => s.episode,
      }),
      ...mapState('app/settings/player', {_quality: s => s.quality}),

      /**
       * Get sources list
       *
       * @return Array
       */
      sources() {
        return __get(this._episode, 'sources') || [];
      },

      /**
       * Get first source with max available quality
       *
       * @return Object|null
       */
      source() {
        return this.sources.find(source => source.alias === this._quality) || this.sources[0];
      },

      /**
       * Get active type
       *
       * @return string|null
       */
      type() {
        return __get(this.source, 'type') || null;
      },


      /**
       * Get available components
       *
       * @return Object
       */
      components() {
        return {
          server: PlayerSourcesServer,
          torrent: PlayerSourcesTorrent
        }
      },

      /**
       * Get active component
       *
       * @return Object|null
       */
      component() {
        return __get(this.components, this.type) || null;
      }

    },

    methods: {
      ...mapActions('player', {_clearPlayer: 'clear'}),
    },

    destroyed() {
      setTimeout(() => this._clearPlayer(), 500);
    },

    watch: {

      source: {
        deep: true,
        immediate: true,
        handler(source) {
          if (!source) {
            this.$router.push({name: 'player.source.empty'})
          }
        }
      }

    }

  }
</script>
