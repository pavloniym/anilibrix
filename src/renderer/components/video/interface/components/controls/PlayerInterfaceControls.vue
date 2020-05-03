<template>
  <v-layout align-center justify-end ref="controls">
    <template v-if="isMounted">

      <!-- Volume -->
      <volume v-bind="{player}"/>

      <!-- Quality -->
      <quality v-if="source" v-bind="{source, sources}" :attach="$refs.controls"/>

      <!-- PIP -->
      <v-btn icon large class="mx-2" @click="player.pip = true">
        <v-icon size="24">mdi-picture-in-picture-bottom-right</v-icon>
      </v-btn>


      <!-- Fullscreen -->
      <v-btn icon large @click="toggleFullscreen">
        <v-icon size="24">mdi-fullscreen</v-icon>
      </v-btn>


    </template>
  </v-layout>
</template>

<script>

  import Volume from './components/volume'
  import Quality from './components/quality'

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
    container: {
      type: HTMLDivElement,
      default: null
    }
  };

  export default {
    props,
    components: {
      Volume,
      Quality,
    },
    data() {
      return {
        isMounted: false
      }
    },

    methods: {

      /**
       * Handle keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvent(e) {
        if (e.code === 'KeyF') this.toggleFullscreen();
      },


      /**
       * Enter fullscreen mode
       * Fullscreen div container with player and controls
       *
       * @return void
       */
      toggleFullscreen() {
        if (this.container) screenfull.toggle(this.container);
      },


    },

    mounted() {
      this.isMounted = true;
      window.addEventListener('keydown', this.handleKeyboardEvent, true);
    },


    destroyed() {
      window.removeEventListener('keydown', this.handleKeyboardEvent);
    }

  }

</script>
