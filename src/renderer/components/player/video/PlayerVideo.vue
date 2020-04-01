<template>
  <v-layout column class="fill-height">

    <!-- Video container -->
    <video ref="player" v-show="isReady" controls playsinline/>

    <!-- Interface slot -->
    <slot v-if="isReady" v-bind="{sources, source, plyr: plyr.instance}"/>

  </v-layout>
</template>

<script>

  import Plyr from "plyr";
  import Hls from 'hls.js';

  import 'plyr/dist/plyr.css';

  import __get from "lodash/get";
  import {mapState} from "vuex";
  import {ipcRenderer as ipc} from "electron";

  const props = {
    episode: {
      type: Object,
      default: null
    },
  };

  export default {
    props,
    data() {
      return {
        isReady: false,
        isBuffering: false,
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
      }
    },


    computed: {
      ...mapState('settings/player', {
        _source: s => s.source
      }),


      /**
       * Get sources list
       *
       * @return Array
       */
      sources() {
        return __get(this.episode, 'sources') || [];
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


      /**
       * Get payload from provided source
       *
       * @return String|null
       */
      getPayload(source) {
        return new Promise((resolve, reject) => {

          // Get payload type
          const type = __get(source, 'type') || null;

          if (type === 'server') { // Get source for "server" source type

            // Simple playlist url from payload property
            const payload = __get(source, 'payload');

            if (payload !== null) {
              resolve(payload);
            } else {
              reject('Server payload is not defined')
            }

          } else if (type === 'torrent') {   // Get source from "torrent" source type

            const payload = __get(source, 'payload');
            const torrentId = __get(payload, 'torrent.id') || null;

            // Send event to start server with provided torrent id
            ipc.send('torrent:start', {torrentId});

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
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      loadPayload(payload, hlsOptions = {}, shouldPlay = false) {

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
            if (shouldPlay) {
              this.plyr.instance.play();
            }
          });
        }
      },


      /**
       * Destroy payload
       *
       * @param source
       * @return void
       */
      destroyPayload(source) {
        if (source) {
          const type = __get(source, 'type');

          // Destroy torrent source
          if (type === 'torrent') {
            ipc.send('torrent:destroy');
          }

        }
      },


    },

    mounted() {
      this.$nextTick(async () => {

        // Init stream player
        // Run plyr and add hls source
        this.player = this.$refs.player;
        this.plyr.instance = new Plyr(this.player, this.plyr.options);

        // Set ready flag on player ready event
        this.plyr.instance.on('loadedmetadata', () => this.isReady = true);
        this.plyr.instance.on('waiting', () => this.isBuffering = true);
        this.plyr.instance.on('canplay', () => this.isBuffering = false);
        this.plyr.instance.on('ended', () => this.$emit('ended'));

        // If it is stream -> load m3u8 playlist
        // Attach it to player
        // If no source is found -> go to no-source view
        try {

          // Get payload
          // Load payload to player
          this.loadPayload(await this.getPayload(this.source));

        } catch {

          // Emit no-source event
          this.$emit('no-source');
        }
      })
    },


    beforeDestroy() {
      setTimeout(() => {

        // Destroy plyr instance
        this.plyr.instance.destroy();

        // Destroy active payload
        this.destroyPayload(this.source);

      }, 500);
    },


    watch: {

      isReady: {
        immediate: true,
        handler(isReady) {
          this.$emit('is-ready', isReady);
        }
      },

      isBuffering: {
        immediate: true,
        handler(isBuffering) {
          this.$emit('is-buffering', isBuffering);
        }
      },

      source: {
        deep: true,
        handler(source, previous) {
          if (source !== null) {

            // Set buffering
            this.isBuffering = true;

            // Get payload for provided source
            this.getPayload(source)
              .then(payload => {

                // Get player playing state
                // Continue playing if it was playing
                const playing = this.plyr.instance.playing;

                // Get hls options
                // Get current play time to continue after source changed
                const options = {startPosition: this.plyr.instance.currentTime};

                // Load new source
                this.loadPayload(payload, options, playing);

                // Disable buffering
                this.isBuffering = false;

              })
              .catch(() => {

                // Disable buffering
                this.isBuffering = false;

              });
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
