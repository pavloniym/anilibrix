<template>
  <player-handler
    v-bind="options"
    @error="$emit('error', $event)"
    @update:time="$emit('update:time', $event)"
    @update:duration="$emit('update:duration', $event)">

    <template v-slot="context">
      <slot v-bind="context"/>
    </template>

  </player-handler>
</template>

<script>

  import PlayerHandler from './../../components/handler'

  /*import {
    emitTorrentStart,
    emitTorrentDestroy,
    handleTorrentClear,
    handleTorrentError,
    handleTorrentServer,
  } from "@main/handlers/torrents/torrentsHandler";*/

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
    components: {
      PlayerHandler,
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
        return new Promise(resolve => {

          const payload = this.$__get(source, 'payload');
          const torrent_id = this._getSourceTorrentId(source);
          const file_index = this.$__get(payload, 'file.index', -1);

          if (torrent_id) {

            // Send event to start server with provided torrent id
            emitTorrentStart(torrent_id, file_index);

            // Listen event with torrent server data
            // Resolve when event is caught
            handleTorrentServer(server => {
              if (server.torrent_id === torrent_id) {
                resolve(`${server.url}/${file_index}/${encodeURIComponent(payload.file.name)}`);
              }
            });

          } else {

            // Emit error
            this.$emit('error', {
              source, referer: 'getPayload', message: 'Не удалось определить источник воспроизведения',
            });
          }
        });
      },


      /**
       * Set source from torrent video payload
       * Play source if provided
       *
       * @return void
       */
      processPayload({player, payload} = {}) {
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

          // Emit error
          this.$emit('error', {
            payload,
            referer: 'processPayload',
            message: 'Не удалось подключиться к источнику воспроизведения',
          });

        }
      },


      /**
       * Destroy payload
       *
       * @param source
       * @return Promise
       */
      destroyPayload({source}) {
        return new Promise(resolve => {

          // Emit torrent destroy event
          // Emit event for current torrent
          emitTorrentDestroy({torrent_id: this._getSourceTorrentId(source)});


          // Handle torrent clear event
          // Resolve promise if clear event is for current torrent
          handleTorrentClear(({torrent_id}) => {
            if (torrent_id === this._getSourceTorrentId(source)) resolve();
          });

        });
      },


      /**
       * Get source's torrent id
       *
       * @param source
       * @return {*|null}
       * @private
       */
      _getSourceTorrentId(source) {
        return this.$__get(source, 'payload.torrent.id') || null;
      }

    },


    created() {
      handleTorrentError(({torrentId: torrent_id, message, error}) => {

        // Check if torrent error is for current torrent
        // Emit error event to parent component
        if (torrent_id === this._getSourceTorrentId(this.source)) {
          this.$emit('error', {torrent_id, message, error})
        }

      });
    }

  }

</script>
