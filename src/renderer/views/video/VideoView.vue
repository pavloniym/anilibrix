<template>
  <player-layout ref="container">
    <component
      v-bind="{sources, source}"
      :is="component"
      :time.sync="time"
      :duration.sync="duration"
      @error="toBlank">

      <template v-slot:default="{player}">
        <player-interface v-bind="{player, sources, source, container, release, episode, watchData}"/>
      </template>

    </component>
  </player-layout>
</template>

<script>

  import PlayerLayout from '@layouts/player'
  import PlayerInterface from '@components/video/interface'
  import {ServerPlayer, TorrentPlayer} from '@components/video/playback/types'

  import __get from 'lodash/get';
  import {mapState, mapActions} from 'vuex'

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
        duration: 0,
        watchData: null
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
          server: ServerPlayer,
          torrent: TorrentPlayer
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
      },


      /**
       * Get watch percentage
       *
       * @return Number
       */
      percentage() {
        return this.time > 0 && this.duration > 0
          ? (this.time / this.duration) * 100
          : null
      },


      /**
       * Watch part
       *
       * @return Number
       */
      part() {
        return Math.floor(this.percentage / 10);
      }


    },

    methods: {
      ...mapActions('firebase/watch', {_setWatchData: 'setWatchData'}),

      /**
       * Go to blank page
       *
       * @param payload
       */
      toBlank(payload) {
        this.$router.push({name: 'blank', params: payload})
      },


      /**
       * Set episode watch data
       *
       * @return
       */
      setWatchData() {
        if (this.release && this.episode) {
          this._setWatchData({
            time: this.time,
            quality: this.source.alias,
            releaseId: this.release.id,
            episodeId: this.episode.id,
            percentage: this.percentage
          })
        }
      }
    },


    created() {
      if (this.release && this.episode) {

        // Get watch data
        this.watchData = this.$store.getters['firebase/watch/getData']({
          releaseId: this.release.id,
          episodeId: this.episode.id,
        });

        // Set last watch time
        this.time = this.watchData ? this.watchData.time : 0;
      }
    },

    beforeDestroy() {

      // Set episode watch data before destroy
      this.setWatchData();

    },

    watch: {

      source: {
        deep: true,
        immediate: true,
        handler(source) {

          // Go to blank screen if no source is provided
          if (!source) {
            this.toBlank({message: 'Нет данных для воспроизведения', referer: 'source'})
          }
        }
      },


      part: {
        immediate: true,
        handler() {
          this.setWatchData();
        }
      }

    }

  }
</script>
