<template>
  <playback-player
    v-bind="options"
    class="video--upscale"
    @error="$emit('error', $event)"
    @update:time="$emit('update:time', $event)"
    @update:payload="$emit('update:payload', $event)"
    @update:duration="$emit('update:duration', $event)">

    <!-- Canvas -->
    <canvas ref="board" slot="prepend" width="1280" height="720"></canvas>

    <!-- Interface -->
    <template v-slot="context">
      <slot v-bind="context"/>
    </template>

  </playback-player>
</template>

<script>

  import PlaybackPlayer from '../../components/handler'

  import Hls from "hls.js";
  import __get from 'lodash/get'
  import {mapState} from 'vuex'
  import Anime4KUpscale from '@/renderer/src/utils/upscale'

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
    components: {
      PlaybackPlayer,
    },

    data() {
      return {
        visible: true,
        anime4k: null,
      }
    },

    computed: {
      ...mapState('app/settings/player', {
        _blur: s => s.upscale.blur,
        _bold: s => s.upscale.bold,
      }),


      /**
       * Playback player options
       *
       * @return Object
       */
      options() {
        return {
          source: this.source,
          getPayload: this.getPayload,
          processPayload: this.processPayload,
          destroyPayload: this.destroyPayload,
        }
      },


      /**
       * Get algorithm parameters
       *
       * @return {{}}
       */
      parameters() {
        return {
          blur: this._blur,
          bold: this._bold,
        }
      }

    },

    methods: {

      /**
       * Get payload from provided source
       *
       * @return Promise
       */
      getPayload(source) {
        return __get(source, 'payload.url');
      },


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      processPayload({player, payload, source, time = 0} = {}) {
        if (payload) {

          // Pause player
          player.pause();

          // Create hls and attach media element
          this.hls = new Hls({startPosition: time || 0});
          this.hls.attachMedia(player.media);

          // When hls instance attached -> load source payload
          this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {

            // Load source payload
            this.hls.loadSource(payload);

            // Set event to forward on current time
            // If play should play -> play source automatically
            //player.once('playing', () => player.forward(time));
            player.play();
            player.on('loadedmetadata', () => {

              const scale = __get(source, 'payload.scale') * 1.6;
              const video = player.media;
              const board = this.$refs.board;
              const width = player.media.videoWidth;
              const height = player.media.videoHeight;

              if (width > 0 && height > 0) {
                this.anime4k.init({
                  scale, video, board,
                  boldAmount: this._bold,
                  blurAmount: this._blur,
                });
              }
            })

          });
        }
      },


      /**
       * Set destroy payload handler
       *
       * @return void
       */
      destroyPayload() {

        // Destroy hls
        if (this.hls) this.hls.destroy();
      }

    },

    mounted() {

      // Create 4k network instance
      this.anime4k = Anime4KUpscale();
    },

    watch: {

      parameters: {
        deep: true,
        handler(parameters) {
          if (this.anime4k) {
            this.anime4k.updateParameters(
              parameters.bold,
              parameters.blur
            )
          }
        }
      }

    }

  }
</script>
<style lang="scss" scoped>

  .video--upscale {
    ::v-deep {
      .plyr {
        display: none;
      }
    }

    canvas {
      height: auto;
      width: 100%;
      margin: auto 0;
    }
  }


</style>
