<template>
  <player-layout ref="container">
    <component v-bind="{sources, source}" :is="component" :time.sync="time">
      <template v-slot:default="{player}">
        <player-interface v-bind="{player, sources, source, container, release, episode}" />
      </template>
    </component>
  </player-layout>
</template>

<script>

  import PlayerLayout from '@layouts/player'
  import PlayerInterface from '@components/player/interface'
  import {PlayerSourcesServer, PlayerSourcesTorrent} from '@components/player/sources'

  import __get from 'lodash/get';
  import {mapState} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };


  export default {
    props,
    data() {
      return {
        time: 0,
      }
    },
    components: {
      PlayerLayout,
      PlayerInterface,
    },
    computed: {
      ...mapState('app/settings/player', {_quality: s => s.quality}),


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
      },


      /**
       * Get container element
       *
       * @return HTMLDivElement
       */
      container() {
        return this.$refs.container.$el;
      }

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
