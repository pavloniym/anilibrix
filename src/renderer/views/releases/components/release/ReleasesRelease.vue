<template>
  <v-layout class="release__data">
    <loader v-if="loading"/>
    <div v-else :style="{maxWidth: '100%'}">

      <!-- Release Data -->
      <div class="display-2 font-weight-black text-truncate">{{title}}</div>
      <div class="subtitle-1">{{subtitle}}</div>
      <div class="body-2">{{genres}}</div>

      <!-- Episode -->
      <v-chip
        v-if="episode"
        v-text="episode.title"
        label
        color="secondary"
        class="mt-2 subtitle-2 font-weight-black">
      </v-chip>

      <!-- Description -->
      <div class="my-2 grey--text lighten-1" :style="{maxHeight: '75px'}">
        <v-clamp max-height="75px">{{description}}</v-clamp>
      </div>

    </div>
  </v-layout>
</template>

<script>

  import Loader from './components/loader'
  import VClamp from 'vue-clamp'

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
      Loader,
      VClamp
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
      max-height: 220px;
      user-select: none;
    }
  }

</style>
