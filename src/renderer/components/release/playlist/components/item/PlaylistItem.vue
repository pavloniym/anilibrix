<template>
  <v-list-item @click="">

    <v-list-item-content>
      <v-list-item-title v-text="episode.title"/>
      <v-list-item-subtitle>
        <item-quality v-bind="{episode}"/>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>

      <!-- Episode Progress -->
      <v-layout align-center justify-center :style="{width: '40px'}">
        <item-playing v-if="isPlaying"/>
        <item-watched v-else v-bind="{episode, release}"/>
      </v-layout>

    </v-list-item-action>

  </v-list-item>
</template>

<script>

  import ItemQuality from './components/quality'
  import ItemWatched from './components/watched'
  import ItemPlaying from './components/playing'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    }
  };

  export default {
    props,
    components: {
      ItemQuality,
      ItemWatched,
      ItemPlaying,
    }
  }
</script>
