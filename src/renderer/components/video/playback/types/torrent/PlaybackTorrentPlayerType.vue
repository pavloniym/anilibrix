<template>
  <playback-player v-bind="options" @update:time="$emit('update:time', $event)">

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
        return new Promise((resolve, reject) => {

          const payload = __get(source, 'payload');
          const torrentId = __get(payload, 'torrent.id') || null;

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

            reject('Source payload is not defined');

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


          console.log(time);

          // Set current time
          player.currentTime = time;


          // If play should play -> play source automatically
          if (playing === true) player.play();
        }
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

    }

  }

</script>
