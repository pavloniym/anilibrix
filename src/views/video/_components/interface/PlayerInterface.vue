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
            <links
              v-bind="{release, source, player}"
              :getTorrentDrawer="() => $refs.torrent[0]"
              :getEpisodesDrawer="() => $refs.episodes[0]"
              @update:time="updateTime">
            </links>
          </v-col>

          <!-- Play -->
          <v-col align-self="center">
            <buttons v-bind="{player, release, episode}" @play:episode="$emit('play:episode', $event)"/>
          </v-col>

          <!-- Controls -->
          <v-col align-self="center">
            <!--<player-controls
              v-bind="{episode, source, player}"
              @set:speed="setSpeed"
              @set:source="setSource"
              @set:volume="setVolume"
              @toggle:pip="togglePIP"
              @toggle:fullscreen="toggleFullscreen">
            </player-controls>-->
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


    <!-- Keyboard -->
    <!--<player-next v-bind="{player, release, episode}"/>
    <player-mouse v-bind="{player}" @set:volume="setVolume"/>
    <player-label v-bind="{player}" :key="`label:${episode.id}:${source.label}`"/>-->

  </div>
</template>

<script>

  // Header
  import Headline from './header/headline'
  import Timeline from './header/timeline'

  // Actions
  import Links from './actions/links'
  import Buttons from './actions/buttons'

  // Drawers
  import TorrentDrawer from './drawers/torrent'
  import EpisodesDrawer from './drawers/episodes'

  // Helpers
  import LabelHelper from './helpers/label'
  import KeyboardHelper from './helpers/keyboard'
  import BufferingHelper from './helpers/buffering'

  // Support

  /*import PlayerPlay from './components/play'
  import PlayerNext from './components/next'
  import PlayerLabel from './components/label'

  import PlayerMouse from './components/mouse'
  import PlayerTorrent from './components/torrent'
  import PlayerKeyboard from './components/keyboard'

  import PlayerControls from './components/controls'
  import PlayerEpisodes from './components/episodes'
  import PlayerBuffering from './components/buffering'*/


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
      Links,
      Buttons,
      Headline,
      Timeline,
    },

    data() {
      return {
        video: null,
        interface_is_visible: true,
        cursor_visibility_handler: null,
        interface_visibility_handler: null,
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
            is: LabelHelper,
            key: `label:${this.episode.id}:${this.source.label}`,
            props: {player: this.player}
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
