<template>
  <loader v-if="is_loading"/>
  <v-layout v-else align-center fill-height>

    <!-- Player handler component -->
    <!-- Player interface -->
    <component
      v-bind="{sources, source}"
      :is="handler"
      :key="`video:${anchor}`"
      :time.sync="time"
      :duration.sync="duration"
      @error="toBlank">
      <template v-slot="{player}">
        <interface
          v-bind="{player, source, release, episode}"
          :key="`interface:${anchor}`"
          @play:episode="toVideo"
          @update:quality="setQuality">
        </interface>
      </template>
    </component>

  </v-layout>
</template>

<script>

  // Components
  import Loader from './_components/loader'
  import Interface from './_components/interface'

  // Handlers
  import {ServerHandler, TorrentHandler, UpscaleHandler} from './_components/player/types'

  // Proxy + Transformer
  import ReleaseProxy from "@proxies/release";
  import ReleaseTransformer from "@transformers/release";

  // Store
  import {mapState, mapActions, mapGetters} from 'vuex'

  // Routes
  import {toBlank} from "@router/blank/blankRoutes";
  import {toVideo} from "@router/video/videoRoutes";
  import {GET_WATCHED_EPISODE_GETTER, SET_WATCHED_EPISODE_ACTION} from "@store/app/watch/appWatchStore";

  const props = {
    anchor: {
      type: String,
      default: null
    },
    from_start: {
      type: Boolean,
      default: false
    }
  };


  export default {
    props,
    name: 'Video.View',
    components: {
      Loader,
      Interface,
    },

    meta() {
      return {
        title: this.title,
      }
    },

    data() {
      return {
        time: 0,
        release: null,
        episode: null,
        duration: 0,
        is_loading: false,
        cursor_is_hidden: true,
      }
    },
    computed: {
      ...mapState('app/settings', {_quality: s => s.player.quality}),
      ...mapGetters('app/watch', [GET_WATCHED_EPISODE_GETTER]),


      /**
       * Get title
       *
       * @return {string|null}
       */
      title() {

        const release_id = this.$__get(this.release, 'id');
        const episode_id = this.$__get(this.episode, 'id');
        const release_name = this.$__get(this.release, 'names.original');

        return release_id
          ? `Видео: ${release_name} / Эпизод ${episode_id}`
          : 'Загрузка';

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
       * Get available handlers
       *
       * @return {*}
       */
      handlers() {
        return {
          server: ServerHandler,
          torrent: TorrentHandler,
          upscale: UpscaleHandler,
        }
      },


      /**
       * Get handler
       *
       * @return {*}
       */
      handler() {
        return this.$__get(this.handlers, this.type) || null;
      },


      /**
       * Get watch percentage
       *
       * @return {number}
       */
      percentage() {
        return this.time > 0 && this.duration > 0 ? (this.time / this.duration) * 100 : null
      },


      /**
       * Get watch part
       *
       * @return {number}
       */
      part() {
        return Math.floor(this.percentage / 10);
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
      }


    },

    methods: {
      ...{toBlank},
      ...mapActions('app/watch', [SET_WATCHED_EPISODE_ACTION]),
      ...mapActions('app/settings', {_setSettingsValue: 'setSettingsValue'}),

      /**
       * Go to video
       *
       * @param release_id
       * @param episode_id
       * @param params
       * @return {void}
       */
      toVideo({release_id, episode_id, params = {}}) {
        toVideo(release_id, episode_id, params);
      },

      /**
       * Set settings quality
       *
       * @param quality
       * @return {void}
       */
      async setQuality(quality = null) {
        if (quality) {
          this._setSettingsValue({k: 'player.quality', v: quality});
        }
      },


      /**
       * Set episode watch data
       * Calculate percentage and current playing time
       *
       * @param release_id
       * @param episode_id
       * @param percentage
       * @return {void}
       */
      setEpisodeWatchData({release_id, episode_id}) {
        if (release_id && episode_id) {

          // Set correct time (fix last episode seconds)
          // Set correct percentage
          const watched_time = this.time >= this.duration ? this.duration - 5 : (this.time || 0);
          const watched_percentage = this.percentage > 100 ? 100 : (this.percentage || 0);

          // Set watch data in local store
          this[SET_WATCHED_EPISODE_ACTION]({release_id, episode_id, time: watched_time, percentage: watched_percentage})

        }
      },


      /**
       * Get playback data from anchor
       *
       * @param anchor
       * @return {*}
       */
      async getPlaybackDataFromAnchor(anchor) {

        // Get release and episode from path anchor
        const [release_id, episode_id] = anchor.split(':');

        // Get release from server
        // Set release to local state
        // Transform episodes
        const response = await new ReleaseProxy().getRelease(parseFloat(release_id));
        const release = await new ReleaseTransformer().setStore(this.$store).fetchWithEpisodes().fetchItem(response);

        // Try to find current episode
        const episode = release.episodes.find(episode => episode.id === parseFloat(episode_id));

        // Try to get initial time
        const time = release && episode
          ? await this.getEpisodeInitialTime({release_id: release.id, episode_id: episode.id})
          : 0;

        return {time, release, episode};
      },


      /**
       * Get initial episode start time
       * Get watch data from store for provided release id and episode id
       * Check from_start flag
       *
       * @param release_id
       * @param episode_id
       * @return {number}
       */
      async getEpisodeInitialTime({release_id, episode_id}) {

        // Get watch item from store for release and episode
        const watch_item = await this[GET_WATCHED_EPISODE_GETTER]({release_id, episode_id});

        // Get watch time from this watched episode data
        const watch_time = this.$__get(watch_item, 'time', null) || 0;

        // If not from start -> set last watched time as initial
        // Or 0 otherwise
        return watch_time && this.from_start === false ? watch_time : 0;
      }

    },

    beforeDestroy() {

      // Update watch data for playing episode
      if (this.release && this.episode) {
        this.setEpisodeWatchData({release_id: this.release.id, episode_id: this.episode.id});
      }
    },


    watch: {

      anchor: {
        immediate: true,
        async handler(anchor) {
          try {
            this.is_loading = true;

            // Get playback data from anchor
            const {release, episode, time} = await this.getPlaybackDataFromAnchor(anchor);

            // Set fetched playback data
            this.release = release;
            this.episode = episode;

            // Set time
            this.time = time;

            // Hit visit
            this.$visit(this.$route.path, this.$metaInfo.title);

          } catch (error) {

            // Go to blank page
            // Throw error
            toBlank(error || 'Нет данных для воспроизведения');
            throw error;

          } finally {
            this.is_loading = false;
          }
        }
      },

      source: {
        deep: true,
        immediate: true,
        handler(source) {

          // Set quality
          this.setQuality(this.$__get(source, 'alias'));
        }
      },

      part: {
        handler() {

          // Update watched data for playing episode
          if (this.release && this.episode) {
            this.setEpisodeWatchData({release_id: this.release.id, episode_id: this.episode.id});
          }
        }
      },


      playback: {
        deep: true,
        async handler({release, episode}, prev) {

          // If previous playback exists
          // Update watched data for playing episode
          if (prev && prev.release && prev.episode) {
            this.setEpisodeWatchData({release_id: prev.release.id || null, episode_id: prev.episode.id || null});
          }


          // Process updated playback
          // Try to restore previous watched time or play from start
          if (release && episode) {

            // Set loading
            // Set last watch time
            // Reset loading
            this.is_loading = true;
            this.time = await this.getEpisodeInitialTime({release_id: release.id, episode_id: episode.id});
            this.is_loading = false;
          }

        }
      }

    }

  }
</script>
