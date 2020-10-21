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

  // Resolvers
  import TorrentsResolver from "@@/utils/resolvers/torrents";

  const props = {
    time: {
      type: Number,
      default: null
    },
    source: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {PlayerHandler},
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
      async _getHandler(source) {

        const payload = this.$__get(source, 'payload');
        const file_index = this.$__get(payload, 'file.index', -1);
        const torrents_id = this.$__get(payload, 'torrent.id') || null;

        if (torrents_id) {

          // Start torrent
          // Get torrent server url
          const {url} = await TorrentsResolver.startTorrent({torrents_id, file_index});

          // Create url for video file
          // Resolve full url
          return `${url}/${file_index}/${encodeURIComponent(payload.file.name)}`;

        } else {
          this.$emit('error', 'Не удалось определить источник воспроизведения');
        }
      },


      /**
       * Destroy payload
       *
       * @param source
       * @return Promise
       */
      async _clearHandler({source}) {
        return await TorrentsResolver.clearTorrent({torrents_id: this.$__get(source, 'payload.torrent.id') || null});
      },


      /**
       * Set source from torrent video payload
       * Play source if provided
       *
       * @return void
       */
      async _resolveHandler({player, payload} = {}) {
        if (payload) {

          // Pause player
          player.pause();

          // Set player source
          player.source = {type: 'video', sources: [{src: payload, type: 'video/mp4'}]};

          // Set event to forward on current time
          // Play source automatically
          player.once('playing', () => player.currentTime = this.time);
          player.play();

        } else {
          this.$emit('error', 'Не удалось подключиться к источнику воспроизведения');
        }
      },

    },


    created() {
      // handle torrent error here
    }

  }

</script>
