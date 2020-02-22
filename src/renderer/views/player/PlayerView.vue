<template>
  <player-layout ref="container">

    <!-- Loading -->
    <template v-if="isReady === false">
      <v-overlay :value="true" absolute>
        <v-progress-circular color="white" indeterminate size="64"/>
      </v-overlay>
    </template>

    <!-- Controls -->
    <v-slide-y-reverse-transition v-if="isReady">
      <player-controls
        v-show="controls.show"
        :plyr="plyr.instance"
        :type="_type"
        :qualities="sourceQualities"
        :quality.sync="quality"
        @fullscreen="toggleFullscreen"
        @back="returnToHome">

        <template v-slot:info>
          <h2>{{_release.names.ru}}</h2>
          <h3>{{_release.episode.title}}</h3>
        </template>

      </player-controls>
    </v-slide-y-reverse-transition>


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
  import {PlayerControls} from '@components/player'

  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

  export default {
    components: {
      PlayerLayout,
      PlayerControls
    },
    data() {
      return {
        isReady: false,
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
        _episode: s => s.release.episode,
        _type: s => s.type,
      }),

      ...mapState('settings/player', {
        _streamQuality: s => s.stream.quality
      }),


      /**
       * Check if data is valid
       *
       * @return boolean
       */
      isValid() {
        return this._release !== null && this._episode !== null;
      },


      /**
       * Get available source qualities
       *
       * @return array
       */
      sourceQualities() {
        if (this._type === 'stream') {
          return [
            {type: 'fhd', label: '1080', path: __get(this._episode, 'stream.fhd'), icon: 'mdi-high-definition'},
            {type: 'hd', label: '720', path: __get(this._episode, 'stream.hd'), icon: 'mdi-high-definition'},
            {type: 'sd', label: '480', path: __get(this._episode, 'stream.sd'), icon: 'mdi-standard-definition'},
          ]
        }
      },


      /**
       * Get first source with max available quality
       *
       * @return {boolean}
       */
      source() {
        return this.quality && this.quality.path
          ? this.quality.path
          : null;
      },


      /**
       * Check if any source is defined
       *
       * @return {boolean}
       */
      sourceIsDefined() {
        return this.source && this.source.length > 0;
      }

    },

    methods: {
      ...mapActions('player', ['clearPlayerData']),


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      loadSource(source, hlsOptions = {}, shouldPlay = false) {

        if (this.hls) {
          this.hls.destroy();
          this.hls = null;
        }

        if (source) {
          this.hls = new Hls(hlsOptions);
          this.hls.attachMedia(this.player);
          this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            this.hls.loadSource(source);
            if (shouldPlay) {
              this.plyr.instance.play();
            }
          });
        }
      },


      /**
       * Get stream quality
       * Check default user settings
       * Check links existence
       *
       * @return string|null
       */
      getSourceQuality(type, sourceQualities) {
        let settingsPlayerQuality = null;
        if (type === 'stream') settingsPlayerQuality = this._streamQuality;

        if (settingsPlayerQuality) {
          const sourceQuality = sourceQualities.find(quality => quality.type === settingsPlayerQuality);
          if (sourceQuality && sourceQuality.path && sourceQuality.path.length > 0) {
            return sourceQuality;

          } else {
            const sourceQualities = sourceQualities.filter(quality => quality.path);
            const sourceQuality = sourceQualities[0];
            return sourceQuality && sourceQuality.path && sourceQuality.path.length > 0
              ? sourceQuality
              : null;
          }
        }
        return null;
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
        if (this.controls.mouseHandler) {
          clearTimeout(this.controls.mouseHandler);
        }

        // Create new interval
        this.controls.mouseHandler = setTimeout(() =>
            this.controls.show = false,
          this.controls.mouseTimeout
        )
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
       * Return to home screen
       */
      returnToHome() {
        this.$router.replace({name: 'home'})
      },

    },


    mounted() {
      this.$nextTick(() => {
        if (this.sourceIsDefined) {

          // Init stream player
          // Run plyr and add hls source
          this.player = this.$refs.player;
          this.plyr.instance = new Plyr(this.player, this.plyr.options);

          // If it is stream -> load m3u8 playlist
          // Attach it to player
          this.loadSource(this.source);

          // Set ready flag on player ready event
          this.plyr.instance.on('loadedmetadata', () => this.isReady = true);

          // Hide / Show controls
          this.showControls();

          // Add some event listeners
          window.addEventListener('mousemove', this.showControls, true)
          window.addEventListener('keydown', event => {
            if (event.key === 'f') this.toggleFullscreen();
          });


        }
      })
    },

    destroyed() {
      // Clear player data
      this.$nextTick(() => this.clearPlayerData())
    },


    watch: {
      isValid: {
        immediate: true,
        handler(isValid) {

          // If data is not valid -> return to home screen
          if (isValid === false) {
            this.returnToHome();
          }
        }
      },


      sourceQualities: {
        immediate: true,
        deep: true,
        handler(sourceQualities) {
          this.quality = this.getSourceQuality(this._type, sourceQualities);
        }
      },


      quality: {
        deep: true,
        handler(quality) {
          if (quality && quality.path) {
            this.loadSource(
              this.source,
              {startPosition: this.plyr.instance.currentTime},
              this.plyr.instance.playing
            );
          }
        }
      }
    }

  }
</script>
