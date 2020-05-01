<template>
  <playback-player
    v-bind="options"
    @error="$emit('error', $event)"
    @update:time="$emit('update:time', $event)">

    <template v-slot="context">
      <slot v-bind="context"/>
    </template>

  </playback-player>
</template>

<script>

  import PlaybackPlayer from './../../components/player'

  import __get from 'lodash/get';
  import {ipcRenderer as ipc} from 'electron';

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
      PlaybackPlayer,
    },

    computed: {

      /**
       * Playback player options
       *
       * @return Object
       */
      options() {
        return {
          time: this.time,
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

          const payload = __get(source, 'payload');
          const torrentId = this._getSourceTorrentId(source);

          if (torrentId) {

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

            // Emit error
            this.$emit('error', {
              source,
              error: 'Не удалось определить источник воспроизведения',
              referer: 'getPayload',
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
      processPayload({player, payload, playing = false, time} = {}) {
        if (payload) {

          // Set player source
          player.source = {
            type: 'video',
            sources: [
              {
                src: payload,
                type: 'video/mp4',
              },
            ]
          };

          // Set current time
          // player.currentTime = time;


          // If play should play -> play source automatically
          if (playing === true) player.play();

        } else {

          // Emit error
          this.$emit('error', {
            payload,
            error: 'Не удалось подключиться к источнику воспроизведения',
            referer: 'processPayload',
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

          ipc.send('torrent:destroy', {torrentId: this._getSourceTorrentId(source)});
          ipc.on('torrent:clear', (e, {torrentId} = {}) => {
            if (torrentId === this._getSourceTorrentId(source)) {
              resolve();
            }
          })
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
        return __get(source, 'payload.torrent.id') || null;
      }

    },


    created() {

      // Set torrent error handler
      ipc.on('torrent:error', (e, {torrentId} = {}) => {
          if (torrentId === this._getSourceTorrentId(this.source)) {
            this.$emit('error', {torrentId, error: 'Произошла ошибка при инициализации торрента'})
          }
        }
      )
    }

  }

</script>
