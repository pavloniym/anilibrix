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
          const fileIndex = __get(payload, 'file.index', -1);

          if (torrentId) {

            // Send event to start server with provided torrent id
            this.$electron.ipcRenderer.send('torrent:start', {torrentId, fileIndex});

            // Listen event with torrent server data
            // Resolve when event is caught
            this.$electron.ipcRenderer.on(`torrent:server`, (e, server) => {
              if (server.torrentId === torrentId) {
                resolve(`${server.url}/${fileIndex}/${encodeURIComponent(payload.file.name)}`);
              }
            });

          } else {

            // Emit error
            this.$emit('error', {
              source,
              referer: 'getPayload',
              message: 'Не удалось определить источник воспроизведения',
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
      processPayload({player, payload, time} = {}) {
        if (payload) {

          // Pause player
          player.pause();

          // Set player source
          player.source = {
            type: 'video',
            sources: [{src: payload, type: 'video/mp4'}]
          };

          // Set event to forward on current time
          // Play source automatically
          player.once('playing', () => player.forward(time));
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

          this.$electron.ipcRenderer.send('torrent:destroy', {torrentId: this._getSourceTorrentId(source)});
          this.$electron.ipcRenderer.on('torrent:clear', (e, {torrentId} = {}) => {
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
      this.$electron.ipcRenderer.on('torrent:error', (e, {torrentId, message, error} = {}) => {
          if (torrentId === this._getSourceTorrentId(this.source)) {
            this.$emit('error', {torrentId, message, error})
          }
        }
      )
    }

  }

</script>
