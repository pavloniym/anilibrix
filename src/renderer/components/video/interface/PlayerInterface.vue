<template>
  <div>
    <v-slide-y-reverse-transition>
      <v-layout v-show="visible" column class="interface pa-8">


        <interface-headline v-bind="{player, release, episode}" class="pb-2"/>
        <interface-timeline v-bind="{player}"/>


        <v-row no-gutters justify="center">

          <!-- Links -->
          <v-col align-self="center">
            <interface-links
              v-bind="{release, source}"
              :torrent="() => $refs.torrent"
              :playlist="() => $refs.playlist">
            </interface-links>
          </v-col>

          <!-- Play -->
          <v-col align-self="center">
            <interface-play v-bind="{player, release, episode}"/>
          </v-col>

          <!-- Controls -->
          <v-col align-self="center">
            <interface-controls
              v-bind="{player, source, sources}"
              :chromecast="() => $refs.chromecast">
            </interface-controls>
          </v-col>
        </v-row>

      </v-layout>
    </v-slide-y-reverse-transition>

    <interface-next v-bind="{player, release, episode}"/>
    <interface-torrent v-bind="{source}" ref="torrent" :key="`torrent:${source.label}`"/>
    <interface-playlist v-bind="{release, episode}" ref="playlist" :key="`playlist:${source.label}`"/>
    <interface-playback v-bind="{player}"/>
    <interface-buffering v-bind="{player}" :key="`buffering:${source.label}`"/>
    <interface-chromecast v-bind="{player, payload}" ref="chromecast"/>

  </div>
</template>

<script>

  import InterfacePlay from './components/play'
  import InterfaceNext from './components/next'
  import InterfaceLinks from './components/links'
  import InterfaceTorrent from './components/torrent'
  import InterfaceHeadline from './components/headline'
  import InterfaceTimeline from './components/timeline'
  import InterfaceControls from './components/controls'
  import InterfacePlaylist from './components/playlist'
  import InterfacePlayback from './components/playback'
  import InterfaceBuffering from './components/buffering'
  import InterfaceChromecast from './components/chromecast'


  const props = {
    player: {
      type: Object,
      default: null
    },
    sources: {
      type: Array,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    },
    payload: {
      type: [String, Object],
      default: null,
    }
  };


  export default {
    props,
    components: {
      InterfacePlay,
      InterfaceNext,
      InterfaceLinks,
      InterfaceTorrent,
      InterfaceHeadline,
      InterfaceTimeline,
      InterfaceControls,
      InterfacePlaylist,
      InterfacePlayback,
      InterfaceBuffering,
      InterfaceChromecast,
    },
    data() {
      return {
        visible: true,
        visibilityHandler: null
      }
    },

    methods: {


      /**
       * Show player controls
       *
       * @return void
       */
      showInterface() {

        // Show controls
        this.visible = true;

        // Clear previous interval
        if (this.visibilityHandler) clearTimeout(this.visibilityHandler);

        // Create new interval
        this.visibilityHandler = setTimeout(() => this.visible = false, 2500)
      },


      /**
       * Handle keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvent(e) {
        if (e.which === 39 || e.which === 37) this.showInterface();
      },


    },

    mounted() {
      this.$nextTick(async () => {

        // Hide / Show controls
        this.showInterface();

        // Add some event listeners
        document.addEventListener('mousemove', this.showInterface);
        document.addEventListener('keydown', this.handleKeyboardEvent);
      })
    },


    destroyed() {
      document.removeEventListener('mousemove', this.showInterface);
      document.removeEventListener('keydown', this.handleKeyboardEvent);
    }

  }
</script>

<style scoped lang="scss">

  .interface {
    width: 100%;
    bottom: 0;
    z-index: 10;
    position: absolute;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 50%, rgba(255, 255, 255, 0) 100%);
    user-select: none;
  }

</style>
