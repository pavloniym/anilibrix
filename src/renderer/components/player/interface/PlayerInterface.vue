<template>
  <div>

    <!-- Player Interface Toolbar -->
    <v-slide-y-transition>
      <interface-toolbar v-show="visible"/>
    </v-slide-y-transition>


    <!-- Player Interface Controls -->
    <v-slide-y-reverse-transition>
      <interface-controls
        v-show="visible"
        v-bind="{player, sources, source}"
        @time="$emit('time', $event)"
        @back="$emit('back')"
        @source="$emit('source', $event)"
        @fullscreen="toggleFullscreen">

        <!-- Info -->
        <template v-slot:info v-if="release && episode">
          <h2>{{release.names.ru}}</h2>
          <h3>{{episode.title}}</h3>
        </template>

      </interface-controls>
    </v-slide-y-reverse-transition>

  </div>
</template>

<script>

  import InterfaceControls from './components/controls'
  import InterfaceToolbar from './components/toolbar'

  import screenfull from 'screenfull';

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
    container: {
      type: HTMLDivElement,
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
    components: {
      InterfaceToolbar,
      InterfaceControls
    },
    data() {
      return {
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
        if (this.visibilityHandler) {
          clearTimeout(this.visibilityHandler);
        }

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
        if (e.key === 'f') {
          this.toggleFullscreen();
        }
      },


      /**
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return void
       */
      toggleFullscreen() {
        if (this.container) {
          screenfull.toggle(this.container);
        }
      },


    },

    mounted() {
      this.$nextTick(async () => {

        // Hide / Show controls
        this.showInterface();

        // Add some event listeners
        window.addEventListener('mousemove', this.showInterface, true);
        window.addEventListener('keydown', this.handleKeyboardEvent, true);

      })
    },


    destroyed() {
      window.removeEventListener('mousemove', this.showInterface);
      window.removeEventListener('keydown', this.handleKeyboardEvent);
    }

  }
</script>
