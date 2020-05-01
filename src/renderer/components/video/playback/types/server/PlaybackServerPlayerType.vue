<template>
  <playback-player v-bind="options" @update:time="$emit('update:time', $event)">

    <template v-slot="context">
      <slot v-bind="context"/>
    </template>

  </playback-player>
</template>

<script>

  import PlaybackPlayer from './../../components/player'

  import Hls from 'hls.js';
  import __get from 'lodash/get'

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
        hls: null,
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
      }

    },

    methods: {

      /**
       * Get payload from provided source
       *
       * @return Promise
       */
      getPayload(source) {
        return __get(source, 'payload');
      },


      /**
       * Load hls source
       * Destroy previous Hls instance (if exists)
       * Create new instance, attach to player
       * Play source if provided
       *
       * @return void
       */
      processPayload({player, payload, playing = false} = {}) {

        // If payload provided - create new hls instance
        if (payload) {

          // Create hls and attach media element
          this.hls = new Hls({startPosition: this.time || 0});
          this.hls.attachMedia(player.media);

          // When hls instance attached -> load source payload
          this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {

            // Load source payload
            this.hls.loadSource(payload);

            // If play should play -> play source automatically
            if (playing === true) player.play();

          });
        }
      },


      /**
       * Set destroy payload handler
       *
       * @return void
       */
      destroyPayload() {
        if (this.hls) {
          this.hls.destroy();
        }
      }
    }

  }
</script>
