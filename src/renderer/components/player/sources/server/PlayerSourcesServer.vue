<template>
  <v-layout column class="fill-height">

    <!-- Video container -->
    <video playsinline ref="player"/>

    <!-- Interface slot -->
    <slot v-if="player" v-bind="{player}"/>

  </v-layout>
</template>

<script>

  import Hls from 'hls.js';
  import Player from 'plyr';

  import __get from 'lodash/get';
  import 'plyr/dist/plyr.css';

  const props = {
    source: {
      type: Object,
      default: null
    },
    time: {
      type: Number,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        hls: null,
        player: null,
        options: {
          autoplay: true,
          controls: false,
          keyboard: {
            focused: true,
            global: true
          },
          fullscreen: {enabled: false},
          clickToPlay: true,
        },
      }
    },

    methods: {

      /**
       * Get payload from provided source
       *
       * @return Promise
       */
      getPayload(source) {
        return __get(source, 'payload');
      },


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      processPayload(payload, hlsOptions = {}, shouldPlay = false) {

        // If payload provided - create new hls instance
        if (payload) {

          // Create hls and attach media element
          this.hls = new Hls(hlsOptions);
          this.hls.attachMedia(this.player.media);

          // When hls instance attached -> load source payload
          this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {

            // Load source payload
            this.hls.loadSource(payload);

            // If play should play -> play source automatically
            if (shouldPlay) this.player.play();

          });
        }
      },

    },

    mounted() {

      // Create player
      this.player = new Player(this.$refs.player, this.options);

      // Update current player position on time update
      this.player.on('timeupdate', () => {
          const time = this.player.currentTime;
          if (time > 0) {
            this.$emit('update:time', time);
          }
        }
      );

      // Get payload
      // Load payload to player
      this.processPayload(this.getPayload(this.source), {startPosition: this.time || 0}, true);
    },

    destroyed() {
      setTimeout(() => {

        // Destroy player instance
        // Destroy active payload
        if (this.player) this.player.destroy();
        if (this.hls) this.hls.destroy();

      }, 500);
    },


    watch: {

      source: {
        deep: true,
        handler(source) {
          this.$nextTick(() => {
            if (source !== null) {


              // Get payload from source
              const payload = this.getPayload(this.source);

              // Get hls options
              // Get current play time to continue after source changed
              const options = {startPosition: this.time || 0};

              // Get player playing state
              // Continue playing if it was playing
              const playing = this.player.playing;

              // Process payload
              this.processPayload(payload, options, playing);

            }
          });
        }
      }

    }

  }
</script>
