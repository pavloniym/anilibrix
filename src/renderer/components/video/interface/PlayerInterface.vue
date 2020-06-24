<template>
  <div>
    <v-slide-y-reverse-transition>
      <v-layout v-show="visible" column class="interface pa-8 pt-0">

        <player-headline v-bind="{player, release, episode}" class="pb-2"/>
        <player-timeline v-bind="{player}"/>

        <v-row no-gutters justify="center">

          <!-- Links -->
          <v-col align-self="center">
            <player-links
              v-bind="{release, source}"
              :upscale="() => $refs.upscale"
              :torrent="() => $refs.torrent"
              :playlist="() => $refs.playlist">
            </player-links>
          </v-col>

          <!-- Play -->
          <v-col align-self="center">
            <player-play v-bind="{player, release, episode}"/>
          </v-col>

          <!-- Controls -->
          <v-col align-self="center">
            <player-controls
              v-bind="{player, source, sources}"
              :chromecast="() => $refs.chromecast"
              @toggle:fullscreen="toggleFullscreen">
            </player-controls>
          </v-col>
        </v-row>

      </v-layout>
    </v-slide-y-reverse-transition>

    <player-next v-bind="{player, release, episode}"/>

    <!-- Player Labels -->
    <player-label
      v-bind="{player, payload, time}">
    </player-label>

    <player-torrent v-bind="{source}" ref="torrent" :key="`torrent:${source.label}`"/>

    <!-- Hotkeys -->
    <player-hotkeys
      v-bind="{player}"
      @interface:update="showInterface"
      @toggle:fullscreen="toggleFullscreen">
    </player-hotkeys>

    <player-playlist v-bind="{release, episode}" ref="playlist" :key="`playlist:${source.label}`"/>
    <player-buffering v-bind="{player}" :key="`buffering:${source.label}`"/>

    <!--<player-upscale v-bind="{source}" ref="upscale" :key="`upscale:${source.label}`"/>-->
    <!--<player-chromecast v-bind="{player, payload}" ref="chromecast"/>-->

  </div>
</template>

<script>

  import PlayerPlay from './components/play'
  import PlayerNext from './components/next'
  import PlayerLabel from './components/label'
  import PlayerLinks from './components/links'
  import PlayerUpscale from './components/upscale'
  import PlayerTorrent from './components/torrent'
  import PlayerHotkeys from './components/hotkeys'
  import PlayerHeadline from './components/headline'
  import PlayerTimeline from './components/timeline'
  import PlayerControls from './components/controls'
  import PlayerPlaylist from './components/playlist'
  import PlayerBuffering from './components/buffering'
  import PlayerChromecast from './components/chromecast'

  import screenfull from "screenfull";

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
    },
    time: {
      type: Number,
      default: null
    }
  };


  export default {
    props,
    components: {
      PlayerPlay,
      PlayerNext,
      PlayerLinks,
      PlayerLabel,
      PlayerUpscale,
      PlayerTorrent,
      PlayerHotkeys,
      PlayerHeadline,
      PlayerTimeline,
      PlayerControls,
      PlayerPlaylist,
      PlayerBuffering,
      PlayerChromecast,
    },

    data() {
      return {
        video: null,
        visible: true,
        visibilityHandler: null,
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
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return void
       */
      toggleFullscreen() {
        screenfull.toggle(document.getElementById('player-container'));
      },

    },

    mounted() {

      // Hide / Show controls
      this.showInterface();

      // Get video element
      this.video = document.getElementsByClassName('plyr')[0];


      // Add some event listeners
      // Set player click event
      // Toggle player state
      this.video.addEventListener('click', this.togglePlay);
      this.video.addEventListener('dblclick', this.toggleFullscreen);

      // Add event listener
      window.addEventListener('mousemove', this.showInterface);

    },


    beforeDestroy() {

      // Remove player listeners
      this.video.removeEventListener('click', this.togglePlay);
      this.video.removeEventListener('dblclick', this.toggleFullscreen);

      // Remove listener
      window.removeEventListener('mousemove', this.showInterface);
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
