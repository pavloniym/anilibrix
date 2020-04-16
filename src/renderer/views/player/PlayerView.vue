<template>
  <player-layout ref="container">

    <!-- Player is loading -->
    <player-loading v-bind="{isReady, release, episode}">

      <!-- Player is buffering -->
      <player-buffering v-bind="{isBuffering, isReady}">

        <component
          v-bind="{sources, source, time}"
          :is="component"
          :is-ready.sync="isReady"
          :is-buffering.sync="isBuffering"
          @ended="goBack">

          <template v-slot:default="{player}">
            <player-interface
              v-if="player"
              v-bind="{player, sources, source, release, episode}"
              :container="$refs.container.$el"
              @time="time = $event"
              @back="goBack"
              @source="setSource($event.alias)">
            </player-interface>
          </template>

        </component>


      </player-buffering>
    </player-loading>
  </player-layout>
</template>

<script>

  import PlayerLayout from '@layouts/player'
  import PlayerInterface from '@components/player/interface'
  import { PlayerLoading, PlayerBuffering } from '@components/player/loaders'
  import { PlayerSourcesServer, PlayerSourcesTorrent } from '@components/player/sources'

  import __get from 'lodash/get';
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      PlayerLayout,
      PlayerLoading,
      PlayerBuffering,
      PlayerInterface,
    },
    data() {
      return {
        isReady: false,
        isBuffering: false,
        time: 0
      }
    },
    computed: {
      ...mapState('player', {
        release: s => s.release,
        episode: s => s.episode,
      }),
      ...mapState('app/settings/player', { _source: s => s.source }),

      /**
       * Get sources list
       *
       * @return Array
       */
      sources() {
        return __get(this.episode, 'sources') || [];
      },

      /**
       * Get first source with max available quality
       *
       * @return Object|null
       */
      source() {
        return this.sources.find(source => source.alias === this._source) || this.sources[0];
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
      ...mapActions('app/settings/player', ['setSource']),
      ...mapActions('player', { _clearPlayer: 'clear' }),

      /**
       * Return to back
       *
       * @return void
       */
      goBack() {
        this.$router.back();
      },

    },

    beforeDestroy() {
      setTimeout(() => this._clearPlayer(), 500);
    },

    watch: {

      type: {
        immediate: true,
        handler() {
          this.isBuffering = true;
        }
      },

      source: {
        deep: true,
        immediate: true,
        handler(source) {
          if (!source) {
            this.$router.push({
              name: 'player.source.empty'
            })
          }
        }
      }

    }

  }
</script>
