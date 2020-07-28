<template>
  <video-layout :hide-cursor="cursor_is_hidden">
    <v-fade-transition mode="out-in" appear>
      <component
        v-if="is_mounted"
        v-bind="{sources, source}"
        :is="component"
        :key="`video:${key}`"
        :time.sync="time"
        :duration.sync="duration"
        @error="toBlank">

        <template v-slot="{player}">
          <player-interface
            v-bind="{player, source, release, episode}"
            :key="`interface:${key}`"
            @set:source="setSource"
            @show:cursor="cursor_is_hidden = false"
            @hide:cursor="cursor_is_hidden = true">
          </player-interface>
        </template>

      </component>
    </v-fade-transition>
  </video-layout>
</template>

<script>

  import VideoLayout from "@layouts/video";
  import PlayerInterface from '@components/video/interface'
  import {ServerHandler, TorrentHandler} from '@components/video/player/types'

  import {toBlank} from "@utils/router/views";
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
      return {title: this.title}
    },

    data() {
      return {
        time: 0,
        duration: 0,
        is_mounted: false,
        cursor_is_hidden: true,
      }
    },
    computed: {
      ...mapState('app/settings/player', {_quality: s => s.quality}),


      /**
       * Get title
       *
       * @return {string|null}
       */
      title() {

        const release_id = this.$__get(this.release, 'id');
        const episode_id = this.$__get(this.episode, 'id');
        const release_name = this.$__get(this.release, 'names.original');

        return release_id ? `Эпизод [${release_id} / ${episode_id}]: ${release_name}` : null;

      },

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
          server: ServerHandler,
          torrent: TorrentHandler,
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
       * Get active playback data
       *
       * @return {*}
       */
      playback() {
        return {
          release: this.release,
          episode: this.episode,
        }
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
      ...mapActions('app/watch', {_setWatchedEpisode: 'setWatchedEpisode'}),
      ...mapActions('app/settings/player', {_setQuality: 'setQuality'}),

      /**
       * Go to blank page
       *
       * @return Promise
       */
      toBlank({message, referer}) {
        return toBlank(message, referer)
      },


      /**
       * Get watch data from store
       *
       * @param release
       * @param episode
       * @return {*}
       */
      async getWatchedEpisode({release, episode}) {

        const release_id = release.id;
        const episode_id = episode.id;
        const payload = {release_id, episode_id};

        return await this.$store.getters['app/watch/getWatchedEpisode'](payload);
      },


      /**
       * Set episode watch data
       * Calculate percentage and current playing time
       *
       */
      setWatchedEpisode({time, release, episode, duration, percentage} = {}) {
        if (release && episode) {

          // Set correct time (fix last episode seconds)
          // Set correct percentage
          const watched_time = time >= duration ? duration - 5 : (time || 0);
          const watched_percentage = percentage > 100 ? 100 : (percentage || 0);

          const release_id = release.id;
          const episode_id = episode.id;
          const payload = {release_id, episode_id, time: watched_time, percentage: watched_percentage};

          // Set watch data in local store
          this._setWatchedEpisode(payload)

        }
      },


      /**
       * Set source
       *
       * @param source
       * @return {*}
       */
      setSource(source) {
        return this._setQuality(source.alias);
      }
    },

    watch: {

      source: {
        deep: true,
        immediate: true,
        handler(source) {
          if (source) {

            // Update settings quality and set it as current quality
            this._setQuality(source.alias);

          } else {

            // Go to blank screen if no source provided
            this.toBlank({message: 'Нет данных для воспроизведения', referer: 'source'})

          }
        }
      },

      part: {
        handler() {

          // Update watched data for playing episode on each part
          // Prepare watched data
          const payload = {
            time: this.time,
            release: this.release,
            episode: this.episode,
            duration: this.duration,
            percentage: this.percentage,
          };

          // Set watched data
          this.setWatchedEpisode(payload);
        }
      },


      playback: {
        immediate: true,
        async handler({release, episode}, previous) {


          // If previous playback exists
          // Should set watch data for previous episode
          // Prepare payload data for previous episode
          // Get time, duration, percentage because they are not updated yet
          if (previous) {

            const payload = {
              time: this.time,
              release: previous.release || null,
              episode: previous.episode || null,
              duration: this.duration,
              percentage: this.percentage,
            };

            // Set watched data for episode
            this.setWatchedEpisode(payload);
          }


          // Process updated playback
          // Try to restore previous watched time or play from start
          if (release && episode) {

            // Reset mounted state on playback change
            this.is_mounted = false;

            // Get watch data
            const payload = {release, episode};
            const watched_episode = await this.getWatchedEpisode(payload);
            const watched_time = this.$__get(watched_episode, 'time');

            // Set last watch time
            // Check if not from start
            this.time = watched_time && this.fromStart === false ? watched_time : 0;
            this.is_mounted = true;
          }


        }
      }

    }

  }
</script>
