<template>
  <v-layout column class="fill-height">

    <!-- Video container -->
    <video v-show="isReady" playsinline ref="player" :src="payload"/>

    <!-- Interface slot -->
    <slot v-if="isReady" v-bind="{player}"/>

  </v-layout>
</template>

<script>

  import __get from 'lodash/get';
  import { ipcRenderer as ipc } from 'electron';

  const props = {
    isReady: {
      type: Boolean,
      default: false
    },
    isBuffering: {
      type: Boolean,
      default: false
    },
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
        player: null,
        payload: null,
        options: {
          autoplay: true,
          clickToPlay: false,
          controls: false,
          fullscreen: { enabled: false },
          keyboard: {
            focused: true,
            global: true
          },
        }
      }
    },

    methods: {

      /**
       * Initialize player
       * Load payload
       *
       * @param source
       * @return Promise
       */
      initializePlayer(source) {
        const time = this.time;

        return new Promise(async (resolve, reject) => {

          if (this.player) {
            this.player.destroy();
            this.player = null;
          }

          // Get payload
          // Load payload to player
          this.payload = await this.getPayload(source);

          // Create player
          // Set time
          this.player = new this.$plyr(this.$refs.player, this.options);
          this.player.currentTime = time;

          // Set ready flag on player ready event
          this.player.on('loadedmetadata', () => this.$emit('update:isReady', true));
          this.player.on('waiting', () => this.$emit('update:isBuffering', true));
          this.player.on('canplay', () => this.$emit('update:isBuffering', false));
          this.player.on('ended', () => this.$emit('ended'));

          resolve();
        });
      },

      /**
       * Get payload from provided source
       *
       * @return Promise
       */
      getPayload(source) {
        return new Promise((resolve, reject) => {

          const payload = __get(source, 'payload');
          const torrentId = __get(payload, 'torrent.id') || null;

          if (torrentId) {

            // Send event to start server with provided torrent id
            ipc.send('torrent:start', { torrentId });

            // Listen event with torrent server data
            // Resolve when event is caught
            ipc.on(`torrent:server`, (e, server) => {
              if (server.torrentId === torrentId) {
                resolve(`${server.url}/${payload.index}/${encodeURIComponent(payload.file.name)}`);
              }
            });

          } else {

            reject('Source payload is not defined');

          }
        });
      },

      /**
       * Destroy payload
       *
       * @param source
       * @return void
       */
      destroyPayload(source) {
        ipc.send('torrent:destroy');
      }

    },

    mounted() {
      this.$nextTick(async () => this.initializePlayer(this.source));
    },


    destroyed() {
      setTimeout(() => {

        // Destroy active payload
        this.destroyPayload(this.source);

        // Destroy player instance
        if (this.player) {
          this.player.destroy();
          this.player = null;
        }

      }, 500);
    },

    watch: {
      source: {
        deep: true,
        async handler(source, previous) {
          if (source !== null) {

            this.$emit('update:isBuffering', true);
            await this.initializePlayer(source);
            this.$emit('update:isBuffering', false);
          }

          // Destroy previous payload
          if (previous) {
            this.destroyPayload(previous);
          }

        }
      }
    }

  }

</script>
