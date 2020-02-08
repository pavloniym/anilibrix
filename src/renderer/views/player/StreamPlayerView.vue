<template>
  <div class="player__container">

    <!-- Toolbar -->
    <v-slide-y-transition appear>
      <v-toolbar v-if="toolbar" absolute color="transparent" width="100%" flat :style="{zIndex: 1}">
        <v-btn icon @click="returnToHome">
          <v-icon v-text="'mdi-arrow-left'"/>
        </v-btn>
      </v-toolbar>
    </v-slide-y-transition>

    <!-- Video -->
    <video ref="player" controls playsinline v-if="source"></video>

  </div>
</template>

<script>
  import Plyr from 'plyr';
  import PlayerLayout from '@layouts/player';
  import Hls from 'hls.js';

  import 'plyr/dist/plyr.css';

  const props = {
    sd: {
      type: String,
      default: null
    },
    hd: {
      type: String,
      default: null
    },
    fhd: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    components: {PlayerLayout},
    data() {
      return {
        hls: new Hls(),
        player: null,
        plyr: null,

        toolbar: true,
        toolbarTimeout: null
      }
    },
    computed: {

      /**
       * Check if any source is defined
       *
       * @return {boolean}
       */
      source() {
        const streams = [this.fhd, this.hd, this.sd].filter(stream => stream);
        return streams[0];
      },
    },

    methods: {

      /**
       * Return to home screen
       */
      returnToHome () {
        this.$router.replace({name: 'home'})
      }

    },

    mounted() {

      if (this.source) {

        this.player = this.$refs.player;
        this.plyr = new Plyr(this.player, {
          autoplay: false,
          clickToPlay: true,
          controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'pip', 'fullscreen']
        });

        this.hls.loadSource(this.source);
        this.hls.attachMedia(this.player);

        this.plyr.pip = true;
      }


      // Show toolbar
      /*window.addEventListener('mousemove', () => {
        this.toolbar = true;

        if (this.toolbarTimeout)  {
          clearTimeout(this.toolbarTimeout);
        }

        this.toolbarTimeout = setTimeout(() => this.toolbar = false, 2000)
      }, true)*/

    },

    created() {
      // Return to home screen if source is not defined
      if (!this.source) {
        this.returnToHome()
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
