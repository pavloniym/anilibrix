<template>
  <player-handler
    v-bind="configuration"
    class="video--upscale"
    @error="$emit('error', $event)"
    @update:time="$emit('update:time', $event)"
    @update:duration="$emit('update:duration', $event)">

    <!-- Canvas -->
    <div slot="prepend" ref="board" class="board"></div>

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
  import Anime4K, {render, upscale} from "@utils/player/upscale/upscaleVideo";

  //import * as PIXI from 'pixi.js'

  // Anime4K
  //import Anime4K from 'anime4k'

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
        is_enabled: true
      }
    },
    computed: {

      /**
       * Playback player configuration
       *
       * @return {*}
       */
      configuration() {
        return {
          source: this.source,
          getHandler: this._getHandler,
          clearHandler: this._clearHandler,
          resolveHandler: this._resolveHandler,
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
      _getHandler(source) {
        return this.$__get(source, 'payload.playlist');
      },


      /**
       * Set destroy payload handler
       *
       * @return void
       */
      _clearHandler() {
        if (this.hls) {
          this.hls.destroy();
        }
      },


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      _resolveHandler({player, payload} = {}) {

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
                /*new Anime4K()
                  .setVideo(player.media)
                  .setIsEnabled(() => this.is_enabled)
                  .setContainer(this.$refs.board)
                  .setResolution({width: 1280, height: 720})
                  .upscale()
                  .render();*/
              })
            });
          }
        }
      }

    },

  }
</script>
<style lang="scss" scoped>

  .video--upscale {
    ::v-deep {
      .plyr {
        display: none;
      }
    }

    .board {
      display: flex;
      align-items: center;
      justify-content: center;

      ::v-deep {
        canvas {
          width: 100%;
        }
      }
    }
  }


</style>
