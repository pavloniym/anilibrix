<template>
  <player-handler
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

  </player-handler>
</template>

<script>

  // Components
  import PlayerHandler from './../../components/handler'

  // Utils
  import Hls from "hls.js";

  // Anime4K
  import Anime4K from 'anime4k'

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
    components: {PlayerHandler},
    data() {
      return {
        bold: 0,
        blur: 0,
      }
    },
    computed: {

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
       * Scale
       *
       * @return {number}
       */
      scale() {
        return this.$__get(this.source, 'payload.scale') * 1.6;
      },

    },

    methods: {

      /**
       * Get payload from provided source
       *
       * @return Promise
       */
      getPayload(source) {
        return this.$__get(source, 'payload.playlist');
      },


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      processPayload({player, payload} = {}) {

        // If payload provided - create new hls instance
        if (payload) {

          // Pause player
          player.pause();
          if (Hls.isSupported()) {

            // Create hls and attach media element
            this.hls = new Hls({startPosition: this.time || 0});
            this.hls.attachMedia(player.media);

            // When hls instance attached -> load source payload
            this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {

              // Load source payload
              // If play should play -> play source automatically
              this.hls.loadSource(payload);

              // Player play
              player.play();
              player.on('loadedmetadata', () => {

                const upscale = Anime4K.Scaler(this.$refs.board.getContext('webgl'));

                upscale.inputVideo(player.media);

                const render = () => {
                  upscale.resize(this.scale, {blur: this.blur, bold: this.bold});
                  requestAnimationFrame(render);
                };

                requestAnimationFrame(render);

              })

            });
          }
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

    created() {

      /*setInterval(() => {
        this.bold = this.bold === 6 ? 0 : this.bold + 1;
        this.blur = this.blur === 2 ? 0 : this.blur + 1;

      }, 200)*/

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
