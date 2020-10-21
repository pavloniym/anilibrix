<template>
  <player-handler
    v-bind="configuration"
    @error="$emit('error', $event)"
    @update:time="$emit('update:time', $event)"
    @update:duration="$emit('update:duration', $event)">

    <template v-slot="context">
      <slot v-bind="context"/>
    </template>

  </player-handler>
</template>

<script>

  // Components
  import PlayerHandler from './../../components/handler'

  // Utils
  import Hls from 'hls.js';

  // Resolvers
  import ErrorResolver from "@@/utils/resolvers/error";

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
        hls: null,
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
      }

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

          // If Hls is supported
          if (Hls.isSupported()) {

            // Create hls and attach media element
            this.hls = new Hls({...this.options, startPosition: this.time || 0});
            this.hls.attachMedia(player.media);

            // Event handlers
            this.hls.on(Hls.Events.MEDIA_ATTACHED, () => this._startSource({payload, player}));
            this.hls.on(Hls.Events.ERROR, (event, data) => this._handleError(data));

          }
        }
      },


      /**
       * Start source
       *
       * @param payload
       * @param player
       * @private
       */
      _startSource({payload, player}) {

        // Load source payload
        this.hls.loadSource(payload);

        // Player play
        player.play();
      },


      /**
       * Handle error
       *
       * @param type
       * @param details
       * @private
       */
      _handleError({type, details}) {
        if (type === Hls.ErrorTypes.NETWORK_ERROR) {
          this.$emit('error', `Произошла ошибка при загруке видео: ${details}`)
        }
      }

    }

  }
</script>
