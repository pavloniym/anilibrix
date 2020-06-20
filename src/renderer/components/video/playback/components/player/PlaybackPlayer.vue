<template>
  <v-layout column class="fill-height">

    <slot name="prepend"/>

    <!-- Video container -->
    <video ref="player" crossorigin="anonymous" autoplay preload="auto"/>

    <!-- Interface slot -->
    <slot v-if="player" v-bind="{player}"/>

  </v-layout>
</template>

<script>

  import __get from "lodash/get";

  const props = {
    time: {
      type: Number,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    getPayload: {
      type: Function,
      default: null
    },
    processPayload: {
      type: Function,
      default: null
    },
    destroyPayload: {
      type: Function,
      default: null,
    }
  };

  export default {
    props,
    data() {
      return {
        player: null,
        options: {
          autoplay: false,
          controls: false,
          keyboard: {
            global: false,
            focused: false,
          },
          resetOnEnd: false,
          fullscreen: {enabled: false},
          clickToPlay: false,
        },
      }
    },


    methods: {

      /**
       * Handle payload
       * Get payload from source
       * Get current play time to continue after source changed
       * Get player playing state - continue playing if it was playing
       *
       * @param source
       * @return {Promise<void>}
       */
      async handlePayload({source}) {
        if (this.processPayload) {

          // Get payload
          const payload = await this.getPayload(source);

          // Emit payload to parent
          this.$emit('update:payload', payload);

          // Process payload
          this.processPayload({
            payload,
            time: this.time,
            source: this.source,
            player: this.player,
            playing: this.player.playing,
          });
        }
      }


    },

    mounted() {

      // Create player
      this.player = new this.$plyr(this.$refs.player, this.options);

      // Get duration on initial start
      this.player.on('loadedmetadata', e => this.$emit('update:duration', __get(e, 'detail.plyr.duration')));

      // Update current player position on time update
      this.player.on('timeupdate', () => {
          const time = this.player.currentTime;
          if (time > 0) {
            this.$emit('update:time', time);
          }
        }
      );
    },


    async destroyed() {

      // Destroy player instance
      if (this.player) {
        this.player.pause();
        this.player.media.src = '';
        this.player.destroy();
      }

      // Destroy payload
      if (this.destroyPayload) {
        await this.destroyPayload({source: this.source});
      }
    },


    watch: {

      source: {
        deep: true,
        immediate: true,
        handler(source) {
          this.$nextTick(() => {
            if (source !== null) {

              // Handle payload
              this.handlePayload({source});

            }
          });
        }
      }

    }

  }
</script>
