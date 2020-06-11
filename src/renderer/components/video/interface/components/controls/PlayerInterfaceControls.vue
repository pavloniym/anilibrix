<template>
  <v-layout align-center justify-end ref="controls">
    <template v-if="isMounted">

      <!-- Volume -->
      <volume v-bind="{player}" class="mr-2"/>

      <!-- Quality -->
      <quality v-if="source" v-bind="{source, sources}" :attach="$refs.controls"/>

      <!-- PIP -->
      <v-btn icon large @click="player.pip = true">
        <v-icon size="22">mdi-picture-in-picture-bottom-right</v-icon>
      </v-btn>

      <!-- Chromecast -->
      <!--<v-btn icon large @click="chromecast().show()">
        <v-icon size="22">mdi-cast</v-icon>
      </v-btn>-->

      <!-- Fullscreen -->
      <v-btn icon large @click="$emit('toggle:fullscreen')">
        <v-icon size="28">mdi-fullscreen</v-icon>
      </v-btn>

    </template>
  </v-layout>
</template>

<script>

  import Volume from './components/volume'
  import Quality from './components/quality'

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
    chromecast: {
      type: Function,
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

    mounted() {
      this.isMounted = true;
    },

  }

</script>
