<template>
  <v-layout class="release__data">
    <loader v-if="loading"/>
    <div v-else :style="{maxWidth: '100%'}">

      <!-- Release Data -->
      <div class="display-2 font-weight-black text-truncate">{{title}}</div>
      <div class="subtitle-1">{{subtitle}}</div>
      <div class="body-2">{{genres}}</div>

      <!-- Episode -->
      <!-- Favorite action -->
      <v-layout class="my-3">
        <favorite v-bind="{release}" class="mr-1"/>
        <v-chip v-text="episode.title" label color="secondary" class="font-weight-black" :style="{height: '36px'}"/>
      </v-layout>

      <!-- Description -->
      <v-clamp class="my-3 grey--text lighten-1" max-height="75px">{{description}}</v-clamp>

    </div>
  </v-layout>
</template>

<script>

  import VClamp from 'vue-clamp'
  import Loader from './components/loader'
  import Favorite from '@components/release/favorite'

  const props = {
    release: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    },
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {
      VClamp,
      Loader,
      Favorite,
    },
    computed: {


      /**
       * Get release title
       *
       * @return {string|null}
       */
      title() {
        return this.$__get(this.release, 'names.ru');
      },

      /**
       * Get subtitle
       *
       * @return {string|null}
       */
      subtitle() {
        return this.$__get(this.release, 'names.original')
      },


      /**
       * Get release genres
       *
       * @return {string|null}
       */
      genres() {
        return (this.$__get(this.release, 'genres') || []).join(' | ')
      },


      /**
       * Get description
       *
       * @return {string|null}
       */
      description() {
        return this.$__get(this.release, 'description');
      }

    }
  }

</script>

<style lang="scss" scoped>

  .release {
    &__data {
      max-height: 230px;
      user-select: none;
    }
  }

</style>
