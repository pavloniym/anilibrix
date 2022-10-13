<template>
  <player-handler
    v-bind="options"
    @error="$emit('error', $event)"
    @update:time="$emit('update:time', $event)"
    @update:payload="$emit('update:payload', $event)"
    @update:duration="$emit('update:duration', $event)">

    <template v-slot="context">
      <slot v-bind="context"/>
    </template>

  </player-handler>
</template>

<script>

  // Components
  import PlayerHandler from '../../components/handler'

  // Utils
  import Hls from 'hls.js';

  // Store
  import {mapState} from 'vuex'

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
      PlayerHandler,
    },

    data() {
      return {
        hls: null,
      }
    },

    computed: {
      ...mapState('app/settings/player', {_video_buffer: s => s.video.buffer || 60}),

      /**
       * Playback player options
       *
       * @return {*}
       */
      options() {
        return {
          source: this.source,
          getPayload: this.getPayload,
          processPayload: this.processPayload,
          destroyPayload: this.destroyPayload,
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

          // Create hls and attach media element
          this.hls = new Hls({startPosition: this.time || 0, maxBufferLength: this._video_buffer});
          this.hls.attachMedia(player.media);

          // When hls instance attached -> load source payload
          this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {

            // Load source payload
            // If play should play -> play source automatically
            this.hls.loadSource(payload);
            player.play();

          });


          this.hls.on(Hls.Events.ERROR, function (event, data) {
            console.log('error', {event, data});
          });
        }
      },


      /**
       * Set destroy payload handler
       *
       * @return void
       */
      destroyPayload() {
        if (this.hls) this.hls.destroy();
      }
    }

  }
</script>
