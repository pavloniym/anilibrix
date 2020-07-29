<template>
  <div>

    <!-- Main Interface Components -->
    <v-slide-y-reverse-transition>
      <v-layout v-show="visible" column class="interface pa-8 pt-0">

        <player-headline v-bind="{player, release, episode}" class="pb-2"/>
        <player-timeline v-bind="{player}"/>
        <v-row no-gutters justify="center">

          <!-- Links -->
          <v-col align-self="center">
            <player-links
              v-bind="{release, source, player}"
              :upscale="() => $refs.upscale"
              :torrent="() => $refs.torrent"
              :episodes="() => $refs.episodes"
              @set:time="setTime">
            </player-links>
          </v-col>

          <!-- Play -->
          <v-col align-self="center">
            <player-play v-bind="{player, release, episode}"/>
          </v-col>

          <!-- Controls -->
          <v-col align-self="center">
            <player-controls
              v-bind="{episode, source, player}"
              @set:speed="setSpeed"
              @set:source="setSource"
              @set:volume="setVolume"
              @toggle:pip="togglePIP"
              @toggle:fullscreen="toggleFullscreen">
            </player-controls>
          </v-col>
        </v-row>

      </v-layout>
    </v-slide-y-reverse-transition>

    <!-- Keyboard -->
    <player-keyboard
      v-bind="{player}"
      @set:time="setTime"
      @set:speed="setSpeed"
      @toggle:play="togglePlay"
      @toggle:fullscreen="toggleFullscreen">
    </player-keyboard>

    <player-next v-bind="{player, release, episode}"/>
    <player-mouse v-bind="{player}" @set:volume="setVolume"/>
    <player-label v-bind="{player}" :key="`label:${episode.id}:${source.label}`"/>
    <player-torrent v-bind="{source}" ref="torrent" :key="`torrent:${source.label}`"/>
    <player-episodes v-bind="{release, episode}" ref="episodes" :key="`episodes:${source.label}`"/>
    <player-buffering v-bind="{player}" :key="`buffering:${source.label}`"/>

  </div>
</template>

<script>

  import PlayerPlay from './components/play'
  import PlayerNext from './components/next'
  import PlayerLabel from './components/label'
  import PlayerLinks from './components/links'
  import PlayerMouse from './components/mouse'
  import PlayerTorrent from './components/torrent'
  import PlayerKeyboard from './components/keyboard'
  import PlayerHeadline from './components/headline'
  import PlayerTimeline from './components/timeline'
  import PlayerControls from './components/controls'
  import PlayerEpisodes from './components/episodes'
  import PlayerBuffering from './components/buffering'

  import screenfull from "screenfull";
  import {KeyboardHandlerMixin, MouseHandlerMixin} from "@mixins/handlers";

  const props = {
    player: {
      type: Object,
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
    }
  };


  export default {
    props,
    mixins: [
      MouseHandlerMixin,
      KeyboardHandlerMixin,
    ],
    components: {
      PlayerPlay,
      PlayerNext,
      PlayerLinks,
      PlayerMouse,
      PlayerLabel,
      PlayerTorrent,
      PlayerKeyboard,
      PlayerHeadline,
      PlayerTimeline,
      PlayerControls,
      PlayerEpisodes,
      PlayerBuffering,
    },

    data() {
      return {
        video: null,
        visible: true,
        visible_handler: null,
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
        // Send event to show cursor
        this.visible = true;
        this.$emit('show:cursor');

        // Clear previous interval
        // Create new interval
        if (this.visible_handler) clearTimeout(this.visible_handler);
        this.visible_handler = setTimeout(() => {

          // Hide interface
          // Send event to hide cursor
          this.visible = false;
          this.$emit('hide:cursor');

        }, 2500)
      },

      /**
       * Handle mouse move
       * Show interface on mouse move
       *
       * @return {void}
       */
      handleMouseEvents() {
        this.showInterface();
      },


      /**
       * Handler mouse scroll
       * Show interface on mouse move
       */
      handleMouseScroll() {
        this.showInterface();
      },

      /**
       * Handle keyboard move
       * Show interface on mouse move
       *
       * @return {void}
       */
      handleKeyboardEvents() {
        this.showInterface();
      },


      /**
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return {void}
       */
      toggleFullscreen() {
        screenfull.toggle(document.getElementById('player-container'));
      },


      /**
       * Toggle pip
       *
       * @return {void}
       */
      togglePIP() {
        this.player.pip = !this.player.pip;
      },


      /**
       * Toggle player play state
       *
       * @return {void}
       */
      togglePlay() {
        this.player.togglePlay();
      },


      /**
       * Set player speed
       *
       * @param speed
       */
      setSpeed(speed) {
        this.player.speed = speed;
      },


      /**
       * Set player time
       *
       * @return void
       */
      setTime(time) {
        this.player.currentTime = time;
      },


      /**
       * Set source
       *
       * @param source
       */
      setSource(source) {
        this.$emit('set:source', source);
      },


      /**
       * Set volume
       *
       * @param volume
       */
      setVolume(volume) {
        this.player.volume = volume;
      }

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

    },


    beforeDestroy() {

      // Remove player listeners
      this.video.removeEventListener('click', this.togglePlay);
      this.video.removeEventListener('dblclick', this.toggleFullscreen);

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
