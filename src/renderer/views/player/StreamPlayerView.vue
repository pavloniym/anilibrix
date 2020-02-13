<template>
  <player-layout ref="container">

    <!-- Loading -->
    <template v-if="isReady === false">
      <v-overlay :value="true" absolute>
        <v-progress-circular color="white" indeterminate size="64" />
      </v-overlay>
    </template>

    <!-- UI -->
    <template v-else>

      <player-controls
        :plyr="plyr"
        :container="$refs.container.$el"
        @back="returnToHome">
      </player-controls>

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
        _FHD: s => s.stream.FHD,
        _HD: s => s.stream.HD,
        _SD: s => s.stream.SD
      }),


      /**
       * Get first source with max available quality
       *
       * @return {boolean}
       */
      source() {
        const streams = [this._FHD, this._HD, this._SD].filter(stream => stream);
        return streams[0] || null;
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
       * Init stream player
       * Run plyr and add hls source
       *
       * @return void
       */
      initStreamPlayer() {
        this.$nextTick(() => {

          this.player = this.$refs.player;
          this.plyr = new Plyr(this.player, {
            autoplay: true,
            clickToPlay: true,
            controls: null
          });

          this.hls.loadSource(this.source);
          this.hls.attachMedia(this.player);

          // Set ready flag on player ready event
          this.plyr.on('ready', () => this.isReady = true);
        })
      },


      /**
       * Return to home screen
       */
      returnToHome() {
        this.$router.replace({name: 'home'})
      }

    },

    destroyed() {

      // Clear player data
      this.clearPlayerData();
    },


    watch: {
      sourceIsDefined: {
        immediate: true,
        handler(sourceIsDefined) {
          if (sourceIsDefined) {

            this.initStreamPlayer();

          }
        }
      }

    }

  }
</script>
