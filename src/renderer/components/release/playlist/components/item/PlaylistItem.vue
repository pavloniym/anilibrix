<template>
  <v-list-item @click="">

    <v-list-item-content>
      <v-list-item-title v-text="episode.title"/>
      <v-list-item-subtitle>
        <item-quality v-bind="{episode}"/>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-layout>

        <!-- Episode Progress -->
        <item-progress v-bind="{episode, release}"/>

      </v-layout>
    </v-list-item-action>

  </v-list-item>
</template>

<script>

  import ItemQuality from './components/quality'
  import ItemProgress from './components/progress'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null,
    }
  };

  export default {
    props,
    components: {
      ItemQuality,
      ItemProgress
    }
  }
</script>
