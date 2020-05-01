<template>
  <v-layout column class="fill-height">

    <!-- Video container -->
    <video playsinline ref="player"/>

    <!-- Interface slot -->
    <slot v-if="player" v-bind="{player}"/>

  </v-layout>
</template>

<script>

  import Player from 'plyr';
  import 'plyr/dist/plyr.css';

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
          this.processPayload({
            time: this.time,
            player: this.player,
            payload: await this.getPayload(source),
            playing: this.player.playing,
          });
        }
      }


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
    },


    async destroyed() {

      // Destroy payload
      if(this.destroyPayload) {
        await this.destroyPayload({source: this.source});
      }

      // Destroy player instance
      if (this.player) {
        this.player.destroy();
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
