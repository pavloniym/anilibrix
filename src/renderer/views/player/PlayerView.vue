<template>
  <player-layout ref="container">

    <!-- Loading -->
    <template v-if="isReady === false">
      <v-overlay :value="true" absolute>
        <v-progress-circular color="white" indeterminate size="64"/>
      </v-overlay>
    </template>

    <!-- UI -->
    <template v-else>


      <player-controls v-bind="{plyr}" @back="returnToHome"/>

    </template>


    <!-- Video -->
    <video ref="player" v-show="isReady" controls playsinline></video>
  </player-layout>
</template>

<script>

  import Plyr from 'plyr';
  import Hls from 'hls.js';

  import 'plyr/dist/plyr.css';

  import PlayerLayout from '@layouts/player'
  import {PlayerToolbar, PlayerControls} from '@components/player'

  import {mapState, mapActions} from 'vuex'
  import __get from 'lodash/get'

  export default {
    components: {
      PlayerLayout,
      PlayerToolbar, PlayerControls
    },
    data() {
      return {
        isReady: false,

        hls: new Hls(),
        player: null,
        plyr: null,
      }
    },
    computed: {
      ...mapState('player', {
        _release: s => s.release,
        _episode: s => s.release.episode,
        _type: s => s.type,
      }),


      /**
       * Check if data is valid
       *
       * @return boolean
       */
      isValid() {
        return this._release !== null && this._episode !== null;
      },


      /**
       * Player is in stream mode
       *
       * @return boolean
       */
      isStream() {
        return this._type === 'stream';
      },


      /**
       * Get first source with max available quality
       *
       * @return {boolean}
       */
      source() {

        if (this.isStream) {

          const fhd = __get(this._episode, 'stream.fhd');
          const hd = __get(this._episode, 'stream.hd');
          const sd = __get(this._episode, 'stream.sd');

          const streams = [fhd, hd, sd].filter(stream => stream);

          return streams[0] || null;
        }

        return null;
      },


      /**
       * Check if any source is defined
       *
       * @return {boolean}
       */
      sourceIsDefined() {
        return this.source && this.source.length > 0;
      }

    },

    methods: {
      ...mapActions('player', ['clearPlayerData']),


      /**
       * Return to home screen
       */
      returnToHome() {
        this.$router.replace({name: 'home'})
      }

    },


    mounted() {
      this.$nextTick(() => {
        if (this.sourceIsDefined) {

          // Init stream player
          // Run plyr and add hls source
          this.player = this.$refs.player;
          this.plyr = new Plyr(this.player, {
            autoplay: true,
            clickToPlay: true,
            controls: null,
          });


          // If it is stream -> load m3u8 playlist
          // Attach it to player
          if(this.isStream) {
            this.hls.loadSource(this.source);
            this.hls.attachMedia(this.player);
          }


          // Set ready flag on player ready event
          this.plyr.on('loadedmetadata', () => this.isReady = true);
        }
      })
    },

    destroyed() {

      // Clear player data
      this.clearPlayerData();
    },


    watch: {
      isValid: {
        immediate: true,
        handler(isValid) {

          // If data is not valid -> return to home screen
          if (isValid === false) {
            this.returnToHome();
          }
        }
      }
    }

  }
</script>
