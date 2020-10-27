<template>
  <div>

    <!-- Main Interface Components -->
    <v-fade-transition appear mode="out-in">
      <div
        v-show="interface_is_visible"
        ref="interface"
        class="interface pa-8"
        :class="{'interface--mobile': this.isMobile}">

        <v-layout column>

          <!-- Header components -->
          <!-- Headline + Timeline -->
          <headline v-bind="{player, release,episode}" class="pb-2"/>
          <seek v-bind="{player}"/>

          <!-- Actions components -->
          <v-row no-gutters justify="center">

            <!-- Links -->
            <v-col align-self="center">
              <video-left-controls
                v-bind="{release, source, player}"
                @update:time="updateTime"
                @update:muted="updateMuted"
                @update:volume="updateVolume">
              </video-left-controls>
            </v-col>

            <!-- Play -->
            <v-col align-self="center">
              <play
                v-bind="{player, release, episode}"
                @toggle:play="togglePlay"
                @play:episode="$emit('play:episode', $event)">
              </play>
            </v-col>

            <!-- Controls -->
            <v-col align-self="center">
              <video-right-controls
                v-bind="{episode, source, player}"
                @toggle:pip="togglePIP"
                @update:speed="updateSpeed"
                @update:quality="$emit('update:quality', $event)"
                @toggle:fullscreen="toggleFullscreen">
              </video-right-controls>
            </v-col>
          </v-row>

        </v-layout>
      </div>
    </v-fade-transition>


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
  import Seek from './header/seek'
  import Headline from './header/headline'

  // Actions
  import Play from './actions/play'
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

  // Mixins
  import {DeviceMixin} from "@mixins/app";
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
      DeviceMixin,
      MouseHandlerMixin,
      KeyboardHandlerMixin,
    ],

    components: {
      Seek,
      Play,
      Headline,
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
            events: {'play:episode': $event => this.$emit('play:episode', $event)}
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
              'update:muted': this.updateMuted,
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
      showInterface(is_visible = true) {

        // Show controls
        // Send event to show cursor
        this.interface_is_visible = is_visible;

        // Clear previous interval
        if (this.interface_visibility_handler) clearTimeout(this.interface_visibility_handler);

        // Create new interval
        // this.interface_visibility_handler = setTimeout(() => this.interface_is_visible = false, 2500);
      },

      /**
       * Handle mouse move
       * Show interface on mouse move
       *
       * @return {void}
       */
      handleMouseEvents() {
        if (!this.isMobile) {
          this.showInterface();
        }
      },


      /**
       * Handler mouse scroll
       * Show interface on mouse move
       */
      handleMouseScroll() {
        if (!this.isMobile) {
          this.showInterface();
        }
      },

      /**
       * Handle keyboard move
       * Show interface on mouse move
       *
       * @return {void}
       */
      handleKeyboardEvents() {
        if (!this.isMobile) {
          this.showInterface();
        }
      },


      /**
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return {void}
       */
      toggleFullscreen() {
        if (!this.isMobile) {
          screenfull.toggle(document.getElementById('player-container'));
        }
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
      },


      /**
       * Update player muted state
       *
       * @param muted
       */
      updateMuted(muted) {
        this.player.muted = muted;
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
      // Prevent children clicks invocation
      [this.video, this.$refs.interface].forEach(el => {

        el.addEventListener('click', e => {
          if (e.target !== el) return;

          console.log('Interface event, single click', e);
          if (!this.isMobile) this.togglePlay();
          if (this.isMobile) this.showInterface(!this.interface_is_visible);
        });

        el.addEventListener('dblclick', (e) => {
          if (e.target !== el) return;

          console.log('Interface event, double click', e);
          this.toggleFullscreen();
        });

      });


      // If mobile -> set volume to 100%
      if (this.isMobile) {
        this.updateVolume(100);
      }
    }

  }
</script>

<style scoped lang="scss">

  .interface {
    width: 100%;
    bottom: 0;
    height: 100%;
    z-index: 10;
    display: flex;
    position: absolute;
    background: rgb(0 0 0 / 0.35);
    align-items: flex-end;

    * {
      user-select: none !important;
    }

  }

</style>
