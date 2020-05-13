<template>
  <player-layout>
    <component
      v-bind="{sources, source}"
      :is="component"
      :time.sync="time"
      :duration.sync="duration"
      @error="toBlank"
      @update:payload="payload = $event">

      <template v-slot:default="{player}">
        <player-interface
          v-bind="{player, sources, source, release, episode, payload}"
          :key="`interface:${key}`">
        </player-interface>
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
    },
    fromStart: {
      type: Boolean,
      default: false
    }
  };


  export default {
    props,
    data() {
      return {
        time: 0,
        payload: null,
        duration: 0,
      }
    },
    components: {
      PlayerLayout,
      PlayerInterface,
    },
    computed: {
      ...mapState('app/settings/player', {_quality: s => s.quality}),

      /**
       * Get instance data
       *
       * @return Object
       */
      instance() {
        return {
          release: this.release,
          episode: this.episode,
        }
      },

      /**
       * Get key string
       *
       * @return String
       */
      key() {
        return `${this.release.id}:${this.episode.id}`
      },

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
      ...mapActions('app/watch', {_setWatchData: 'setWatchData'}),
      ...mapActions('app/settings/player', {_setQuality: 'setQuality'}),


      /**
       * Go to blank page
       *
       * @param payload
       */
      toBlank(payload) {
        this.$router.push({name: 'blank', params: payload})
      },


      /**
       * Get watch data from store
       *
       * @param release
       * @param episode
       * @return Object|null
       */
      getWatchData({release, episode}) {
        return this.$store.getters['app/watch/getWatchData']({releaseId: release.id, episodeId: episode.id});
      },


      /**
       * Set episode watch data
       *
       * @return
       */
      setWatchData({release = null, episode = null, time = 0, percentage = 0} = {}) {
        if (release && episode) {

          // Set correct time (fix last episode seconds)
          // Set correct percentage
          time = time >= this.duration ? this.duration - 5 : time;
          percentage = percentage > 100 ? 100 : percentage;

          // Set watch data in local store
          this._setWatchData({time, percentage, releaseId: release.id, episodeId: episode.id})
        }
      }
    },


    beforeDestroy() {

      // Set episode watch data before destroy
      this.setWatchData({
        time: this.time,
        release: this.release,
        episode: this.episode,
        percentage: this.percentage
      });
    },


    watch: {

      instance: {
        deep: true,
        immediate: true,
        handler({release, episode}, prev) {

          // Set previous episode watch data after change
          if (prev) {
            this.setWatchData({
              time: this.time,
              release: prev.release,
              episode: prev.episode,
              percentage: this.percentage
            });
          }

          if (release && episode) {

            // Get watch data
            // Set last watch time
            const watch = this.getWatchData({release, episode});
            this.time = watch && this.fromStart === false ? watch.time : 0;

          }
        }
      },


      source: {
        deep: true,
        immediate: true,
        handler(source) {
          if (source) {

            // If settings quality not matched with current
            // Update settings quality and set it as current quality
            if (source.alias === this._quality) {
              this._setQuality(source.alias)
            }

          } else {

            // Go to blank screen if no source provided
            this.toBlank({message: 'Нет данных для воспроизведения', referer: 'source'})

          }
        }
      },


      part: {
        immediate: true,
        handler() {

          // Set watch data then playing part is updated
          this.setWatchData({
            time: this.time,
            release: this.release,
            episode: this.episode,
            percentage: this.percentage
          });
        }
      },

    }

  }
</script>
