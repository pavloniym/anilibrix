<template>
  <div class="player__container">

    <!-- Video -->
    <video ref="player" controls playsinline v-if="source"></video>

    <!-- Controls -->
    <div class="plyr__controls" ref="controls">

      <!-- Back button -->
      <v-icon @click="returnToHome">mdi-arrow-left</v-icon>


      <v-btn icon class="plyr__control" data-plyr="rewind">
        <v-icon>mdi-play</v-icon>
      </v-btn>

    </div>

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
        _FHD: s => s.stream.FHD, _HD: s => s.stream.HD, _SD: s => s.stream.SD,
      }),


      /**
       * Check if any source is defined
       *
       * @return {boolean}
       */
      source() {
        const streams = [this._FHD, this._HD, this._SD].filter(stream => stream);
        return streams[0];
      },

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

      if (this.source) {

        this.player = this.$refs.player;
        this.plyr = new Plyr(this.player, {
          autoplay: false,
          clickToPlay: false,
          controls: this.$refs.controls,
        });

        this.hls.loadSource(this.source);
        this.hls.attachMedia(this.player);
      }
    },

    destroyed() {

      // Clear player data
      this.clearPlayerData();
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
