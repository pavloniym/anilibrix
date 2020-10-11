<template>
  <v-list-item two-line ref="container" @click="$emit('click')" >

    <v-list-item-content>
      <v-list-item-title v-text="episode.title"/>
      <v-list-item-subtitle>
        <quality v-bind="{episode}"/>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-layout>

        <!-- Episode Progress -->
        <v-layout align-center justify-center :style="{width: '40px'}">
          <playing v-if="is_playing"/>
          <watched v-else v-bind="{episode, release}"/>
        </v-layout>

        <!-- Actions -->
        <actions v-bind="{episode, release, container}" />

      </v-layout>
    </v-list-item-action>

  </v-list-item>
</template>

<script>

  import Quality from './components/quality'
  import Watched from './components/watched'
  import Playing from './components/playing'
  import Actions from './components/actions'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null,
    },
    is_playing: {
      type: Boolean,
      default: false,
    }
  };

  export default {
    props,
    components: {
      Quality,
      Watched,
      Playing,
      Actions,
    },
    data() {
      return {
        container: null
      }
    },

    mounted() {
      this.container = this.$refs.container.$el;
    }
  }
</script>
