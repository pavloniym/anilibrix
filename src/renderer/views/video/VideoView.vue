<template>
  <video-layout>
    <v-layout fill-height>
      <component
        v-bind="{sources, source}"
        :is="component"
        :key="`video:${key}`"
        :time.sync="time"
        :duration.sync="duration"
        @error="toBlank"
        @update:payload="payload = $event">

        <template v-slot:default="{player}">
          <player-interface
            v-bind="{player, sources, source, release, episode, payload, time}"
            :key="`interface:${key}`">
          </player-interface>
        </template>

      </component>
    </v-layout>
  </video-layout>
</template>

<script>

  import VideoLayout from "@layouts/video";
  import PlayerInterface from '@components/video/interface'
  import {ServerPlayer, UpscalePlayer, TorrentPlayer} from '@components/video/playback/types'

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
    name: 'Video.View',
    components: {
      VideoLayout,
      PlayerInterface,
    },
    meta() {
      return {
        title: this.release
          ? `Эпизод [${this.release.id} / ${this.episode.id}]: ${this.release.names.original}`
          : null
      }
    },
    data() {
      return {
        time: 0,
        payload: null,
        duration: 0,
      }
    },
    computed: {
      ...mapState('app/settings/player', {_quality: s => s.quality}),


      /**
       * Get key string
       *
       * @return {string}
       */
      key() {
        return `${this.release ? this.release.id : 0}:${this.episode ? this.episode.id : 0}`
      },

      /**
       * Get sources list
       *
       * @return {array}
       */
      sources() {
        return this.$__get(this.episode, 'sources') || [];
      },


      /**
       * Get first source with max available quality
       *
       * @return {*|null}
       */
      source() {
        return this.sources.find(source => source.alias === this._quality) || this.sources[0];
      },


      /**
       * Get active type
       *
       * @return {string|null}
       */
      type() {
        return this.$__get(this.source, 'type') || null;
      },


      /**
       * Get available components
       *
       * @return {*}
       */
      components() {
        return {
          server: ServerPlayer,
          torrent: TorrentPlayer,
          upscale: UpscalePlayer,
        }
      },

      /**
       * Get active component
       *
       * @return {*}
       */
      component() {
        return this.$__get(this.components, this.type) || null;
      },


      /**
       * Get watch percentage
       *
       * @return {number}
       */
      percentage() {
        return this.time > 0 && this.duration > 0
          ? (this.time / this.duration) * 100
          : null
      },


      /**
       * Get watch part
       *
       * @return {number}
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
      async getWatchData({release, episode}) {

        const release_id = release.id;
        const episode_id = episode.id;

        return await this.$store.getters['app/watch/getWatchData']({release_id, episode_id});
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


    async mounted() {
      if (this.release && this.episode) {

        // Get watch data
        // Set last watch time
        const watch = await this.getWatchData({release: this.release, episode: this.episode});
        this.time = watch && this.fromStart === false ? watch.time : 0;

      }
    },

    beforeDestroy() {

      // Set episode watch data before destroy
      this.setWatchData({time: this.time, release: this.release, episode: this.episode, percentage: this.percentage});
    },


    watch: {

      source: {
        deep: true,
        immediate: true,
        handler(source) {
          if (source) {

            // Update settings quality and set it as current quality
            this._setQuality(source.alias)

          } else {

            // Go to blank screen if no source provided
            this.toBlank({message: 'Нет данных для воспроизведения', referer: 'source'})

          }
        }
      },


      part: {
        immediate: true,
        handler() {

          // Prepare payload for watch data
          // Set watch data then playing part is updated
          const payload = {time: this.time, release: this.release, episode: this.episode, percentage: this.percentage};
          this.setWatchData(payload);
        }
      },

    }

  }
</script>
