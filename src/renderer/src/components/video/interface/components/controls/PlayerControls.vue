<template>
  <v-layout align-center justify-end ref="controls">
    <template v-if="is_mounted">

      <!-- Volume -->
      <volume v-bind="{player}" class="mr-2" @change="$emit('set:volume', $event)"/>

      <!-- Quality -->
      <quality v-if="source" v-bind="{episode, source}" :attach="$refs.controls" @click="$emit('set:source', $event)"/>

      <!-- Speed -->
      <speed v-bind="{player}" :attach="$refs.controls" @click="$emit('set:speed', $event)"/>

      <!-- PIP -->
      <v-btn icon large @click="$emit('toggle:pip')">
        <v-icon size="22">mdi-picture-in-picture-bottom-right</v-icon>
      </v-btn>

      <!-- Fullscreen -->
      <v-btn icon large @click="$emit('toggle:fullscreen')">
        <v-icon size="28">mdi-fullscreen</v-icon>
      </v-btn>

    </template>
  </v-layout>
</template>

<script>

  import Speed from './components/speed'
  import Volume from './components/volume'
  import Quality from './components/quality'

  const props = {
    player: {
      type: Object,
      default: null
    },
    source: {
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
      Speed,
      Volume,
      Quality,
    },

    data() {
      return {
        is_mounted: false
      }
    },

    mounted() {
      this.is_mounted = true;
    },

  }

</script>
