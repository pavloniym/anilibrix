<template>
  <div class="player__container" v-if="sourceIsDefined">

    <!-- Back -->
    <v-icon @click="returnToHome">mdi-arrow-left</v-icon>

    <!-- Video -->
    <video ref="player" controls playsinline></video>


  </div>
</template>

<script>

  import Plyr from 'plyr';
  import Hls from 'hls.js';

  import 'plyr/dist/plyr.css';

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        hls: new Hls(),
        player: null,
        plyr: null,
      }
    },
    computed: {
      ...mapState('player', {
        _FHD: s => s.stream.FHD,
        _HD: s => s.stream.HD,
        _SD: s => s.stream.SD,
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
          });

          this.hls.loadSource(this.source);
          this.hls.attachMedia(this.player);

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

<style scoped lang="scss">

  .player__container {
    height: 100%;
    width: 100%;
    position: absolute;
  }

</style>
