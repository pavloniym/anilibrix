<template>
  <player-layout ref="container">

    <!-- Loading -->
    <player-loading v-if="isReady === false"/>

    <!-- Player is ready! -->
    <template v-else>

      <!-- Is buffering loader -->
      <player-buffering v-if="isBuffering"/>

      <!-- Controls -->
      <v-slide-y-reverse-transition>
        <player-controls
          v-show="controls.show"
          v-bind="{sources, source, plyr: plyr.instance}"
          @source="switchSource"
          @fullscreen="toggleFullscreen"
          @back="goBack">

          <template v-slot:info>
            <h2>{{_release.names.ru}}</h2>
            <h3>{{_episode.title}}</h3>
          </template>

        </player-controls>
      </v-slide-y-reverse-transition>
    </template>


    <!-- Video -->
    <video ref="player" v-show="isReady" controls playsinline></video>

  </player-layout>
</template>

<script>

  import Plyr from 'plyr';
  import Hls from 'hls.js';
  import screenfull from 'screenfull';

  import 'plyr/dist/plyr.css';

  import PlayerLayout from '@layouts/player'
  import {PlayerControls, PlayerBuffering, PlayerLoading} from '@components/player'

  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

  export default {
    components: {
      PlayerLayout, PlayerBuffering, PlayerLoading,
      PlayerControls
    },
    data() {
      return {
        isReady: false,
        isBuffering: true,
        hls: null,
        player: null,
        plyr: {
          instance: null,
          options: {
            autoplay: true,
            clickToPlay: false,
            controls: false,
            fullscreen: {enabled: false},
            keyboard: {focused: true, global: true},
          }
        },
        controls: {
          show: true,
          mouseHandler: null,
          mouseTimeout: 2500,
        },
        quality: null,
      }
    },
    computed: {
      ...mapState('player', {
        _release: s => s.release,
        _episode: s => s.episode,
      }),

      ...mapState('settings/player', {
        _source: s => s.source
      }),


      /**
       * Check if data is valid
       *
       * @return boolean
       */
      isValid() {
        return (
          this._release !== null &&
          this._episode !== null &&
          this.sources &&
          this.sources.length > 0
        );
      },


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
        return this.sources.find(source => source.alias === this._source) || this.sources[0];
      }

    },

    methods: {
      ...mapActions('player', ['clear']),
      ...mapActions('settings/player', ['setSource']),


      /**
       * Get payload from provided source
       *
       * @return String|null
       */
      async getPayload(source) {
        if (source) {

          const type = __get(source, 'type');

          // Get source for "server" source type
          // Simple playlist url from payload property
          if (type === 'server') {
            return __get(source, 'payload');
          }

        }

        return null;
      },


      /**
       * Switch source
       * Save in settings
       *
       * @return void
       */
      switchSource(source) {
        this.setSource(source.alias || null);
      },


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      loadSource(payload, hlsOptions = {}, shouldPlay = false) {

        // Destroy previous hls instance if exists
        // No other way to update source without glitches and crashes
        if (this.hls) {
          this.hls.destroy();
          this.hls = null;
        }

        // If payload provided - create new hls instance
        if (payload) {

          // Create hls and attach media element
          this.hls = new Hls(hlsOptions);
          this.hls.attachMedia(this.player);

          // When hls instance attached -> load source payload
          this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {

            // Load source payload
            this.hls.loadSource(payload);

            // If play should play -> play source automatically
            if (shouldPlay) this.plyr.instance.play();
          });
        }
      },


      /**
       * Show player controls
       *
       * @return void
       */
      showControls() {

        // Show controls
        this.controls.show = true;

        // Clear previous interval
        if (this.controls.mouseHandler) clearTimeout(this.controls.mouseHandler);

        // Create new interval
        this.controls.mouseHandler = setTimeout(() => this.controls.show = false, this.controls.mouseTimeout)
      },


      /**
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return void
       */
      toggleFullscreen() {
        screenfull.toggle(this.$refs.container.$el);
      },


      /**
       * Return to back
       *
       * @return void
       */
      goBack() {
        this.$router.back();
      },

    },


    mounted() {
      this.$nextTick(async () => {

        // Init stream player
        // Run plyr and add hls source
        this.player = this.$refs.player;
        this.plyr.instance = new Plyr(this.player, this.plyr.options);

        // If it is stream -> load m3u8 playlist
        // Attach it to player
        this.loadSource(await this.getPayload(this.source));

        // Set ready flag on player ready event
        this.plyr.instance.on('loadedmetadata', () => this.isReady = true);
        this.plyr.instance.on('waiting', () => this.isBuffering = true);
        this.plyr.instance.on('canplay', () => this.isBuffering = false);
        this.plyr.instance.on('ended', () => this.goBack());

        // Hide / Show controls
        this.showControls();

        // Add some event listeners
        window.addEventListener('mousemove', this.showControls, true);
        window.addEventListener('keydown', event => {
          if (event.key === 'f') {
            this.toggleFullscreen();
          }
        });

      })
    },


    destroyed() {
      setTimeout(() => {

        // Cleat player data
        // Destroy plyr instance
        this.clear();
        this.plyr.instance.destroy();

      }, 500);
    },


    watch: {

      isValid: {
        immediate: true,
        handler(isValid) {

          // If data is not valid -> return to home screen
          if (isValid === false) {
            this.goBack();
          }
        }
      },


      source: {
        deep: true,
        async handler(source) {
          if (source) {

            // Get payload for provided source
            const payload = await this.getPayload(source);

            // Get hls options
            // Get current play time to continue after source changed
            const options = {startPosition: this.plyr.instance.currentTime};

            // Get player playing state
            // Continue playing if it was playing
            const playing = this.plyr.instance.playing;


            // Load new source
            this.loadSource(payload, options, playing);
          }
        }
      }
    }

  }
</script>
