<template>
  <div>

    <!-- Main Interface Components -->
    <v-slide-y-reverse-transition>
      <v-layout v-show="interface_is_visible" column class="interface pa-8 pt-0">

        <!-- Header components -->
        <!-- Headline + Timeline -->
        <headline v-bind="{player, release,episode}" class="pb-2"/>
        <timeline v-bind="{player}"/>

        <!-- Actions components -->
        <v-row no-gutters justify="center">

          <!-- Links -->
          <v-col align-self="center">
            <video-left-controls
              v-bind="{release, source, player}"
              @update:time="updateTime"
              @update:volume="updateVolume">
            </video-left-controls>
          </v-col>

          <!-- Play -->
          <v-col align-self="center">
            <buttons v-bind="{player, release, episode}" @play:episode="$emit('play:episode', $event)"/>
          </v-col>

          <!-- Controls -->
          <v-col align-self="center">
            <video-right-controls
              v-bind="{episode, source, player}"
              @update:speed="updateSpeed"
              @toggle:pip="togglePIP"
              @toggle:fullscreen="toggleFullscreen">
            </video-right-controls>
          </v-col>
        </v-row>

      </v-layout>
    </v-slide-y-reverse-transition>


    <!-- Misc components -->
    <!-- Drawers -->
    <!-- Helpers -->
    <component
      v-on="component.events"
      v-for="(component, k) in misc"
      v-bind="component.props"
      :is="component.is"
      :ref="component.ref"
      :key="component.key || k">
    </component>

  </div>
</template>

<script>

  // Header
  import Headline from './header/headline'
  import Timeline from './header/timeline'

  // Actions
  import Buttons from './actions/buttons'
  import {VideoLeftControls, VideoRightControls} from './actions/controls'

  // Drawers
  import TorrentDrawer from './drawers/torrent'
  import EpisodesDrawer from './drawers/episodes'

  // Helpers
  import NextHelper from './helpers/next'
  import LabelHelper from './helpers/label'
  import MouseHelper from './helpers/mouse'
  import KeyboardHelper from './helpers/keyboard'
  import BufferingHelper from './helpers/buffering'

  // Utils
  import screenfull from "screenfull";

  // Handlers
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
      Buttons,
      Headline,
      Timeline,
      VideoLeftControls,
      VideoRightControls
    },

    data() {
      return {
        video: null,
        interface_is_visible: true,
        interface_visibility_handler: null,
      }
    },

    provide() {
      return {
        '$interface': this
      }
    },

    computed: {

      /**
       * Get interface drawers
       *
       * @return {array}
       */
      misc() {
        return [
          {
            is: TorrentDrawer,
            ref: 'torrent',
            key: `torrent:${this.source.label}`,
            props: {source: this.source}
          },
          {
            is: EpisodesDrawer,
            ref: 'episodes',
            key: `episodes:${this.source.label}`,
            props: {release: this.release, episode: this.episode},
            events: {'play:episode': $event => this.$emit('play:episode', $event)}
          },
          {
            is: NextHelper,
            props: {player: this.player, release: this.release, episode: this.episode},

          },
          {
            is: LabelHelper,
            key: `label:${this.episode.id}:${this.source.label}`,
            props: {player: this.player}
          },
          {
            is: MouseHelper,
            props: {player: this.player},
            events: {
              'update:volume': this.updateVolume,
            },
          },
          {
            is: KeyboardHelper,
            props: {player: this.player},
            events: {
              'update:time': this.updateTime,
              'toggle:play': this.togglePlay,
              'update:speed': this.updateSpeed,
              'toggle:fullscreen': this.toggleFullscreen
            },
          },
          {
            is: BufferingHelper,
            props: {player: this.player}
          }
        ]
      },

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
        this.interface_is_visible = true;

        // Clear previous interval
        // Create new interval
        if (this.interface_visibility_handler) clearTimeout(this.interface_visibility_handler);
        this.interface_visibility_handler = setTimeout(() => this.interface_is_visible = false, 2500);

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
       * Update player speed
       *
       * @param speed
       * @return {void}
       */
      updateSpeed(speed) {
        this.player.speed = speed;
      },


      /**
       * Update player time
       *
       * @param time
       * @return {void}
       */
      updateTime(time) {
        this.player.currentTime = time;
      },


      /**
       * Update volume
       *
       * @param volume
       */
      updateVolume(volume) {
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
