<template>
  <v-layout column class="fill-height">

    <slot name="prepend"/>

    <!-- Video container -->
    <video autoplay playsinline muted ref="player" crossorigin="anonymous" preload="auto"/>

    <!-- Interface slot -->
    <slot v-if="player" v-bind="{player}"/>

  </v-layout>
</template>

<script>

  const props = {
    source: {
      type: Object,
      default: null
    },
    getHandler: {
      type: Function,
      default: null
    },
    clearHandler: {
      type: Function,
      default: null,
    },
    resolveHandler: {
      type: Function,
      default: null
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
          keyboard: {global: false, focused: false},
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
      async resolve({source}) {
        if (this.resolveHandler) {
          this.resolveHandler.call(null, {
            source: this.source,
            player: this.player,
            payload: await this.getHandler.call(this, source),
          });
        }
      }
    },

    mounted() {

      console.log('Player', this.player);

      // Create player
      this.player = new this.$plyr(this.$refs.player, this.options);

      // Get duration on initial start
      this.player.on('loadedmetadata', e => this.$emit('update:duration', this.$__get(e, 'detail.plyr.duration')));

      // Update current player position on time update
      this.player.on('timeupdate', () => {
          const time = this.player.currentTime;
          if (time > 0) this.$emit('update:time', time);
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
      if (this.clearHandler) {
        await this.clearHandler.call(null, {source: this.source});
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
              this.resolve({source});

            }
          });
        }
      }

    }

  }
</script>
