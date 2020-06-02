<template>
  <v-layout v-if="loading || release" class="release__data" :key="release ? release.id : null">
    <div :style="{width: '5%'}"></div>
    <div :style="{width: '90%'}">

      <!-- Loading -->
      <template v-if="loading">
        <div class="release__skeleton">
          <v-skeleton-loader boilerplate type="heading" class="mt-4" />
          <v-skeleton-loader boilerplate type="text" class="mt-4" width="130"/>
          <v-skeleton-loader boilerplate type="text" class="mt-1" width="220"/>
          <v-skeleton-loader boilerplate type="button" class="mt-2" width="75"/>
          <v-skeleton-loader boilerplate type="paragraph" class="mt-4"/>
          <v-layout class="mt-2">
            <v-skeleton-loader boilerplate type="button" width="120" class="mr-1"/>
            <v-skeleton-loader boilerplate type="button" width="85"/>
          </v-layout>
        </div>
      </template>

      <!-- Release -->
      <template v-else>

        <!-- Release Data -->
        <div class="display-2 font-weight-black text-truncate">{{data.names.ru}}</div>
        <div class="subtitle-1">{{data.names.original}}</div>
        <div class="body-2">{{data.genres.join(' | ')}}</div>

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
          <v-clamp max-height="75px">{{data.description}}</v-clamp>
        </div>

        <v-layout>
          <v-btn v-bind="{loading}" :disabled="loading" @click="toEpisode">Смотреть</v-btn>
          <v-btn v-bind="{loading}" class="ml-1" :disabled="loading" @click="toRelease">Релиз</v-btn>
        </v-layout>

      </template>

    </div>
    <div :style="{width: '5%'}"></div>
  </v-layout>
</template>

<script>

  import __get from 'lodash/get'
  import VClamp from 'vue-clamp'

  const props = {
    release: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  };

  export default {
    props,
    components: {VClamp},
    computed: {


      /**
       * Get release data
       *
       * @return Object
       */
      data() {
        return {
          names: {
            ru: __get(this.release, 'names.ru'),
            original: __get(this.release, 'names.original')
          },
          genres: __get(this.release, 'genres') || [],
          description: __get(this.release, 'description'),
        }
      },


      /**
       * Get episode
       *
       * @return Object|null
       */
      episode() {
        return __get(this.release, ['episodes', 0]) || null;
      }
    },

    methods: {


      /**
       * Listen keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvents(e) {
        if (e.key === 32) this.watchEpisode(); // space
      },


      /**
       * Watch episode
       *
       * @return void
       */
      toEpisode() {
        this.$emit('watch', {release: this.release, episode: this.episode});
      },


      /**
       * Go to release
       *
       * @return void
       */
      toRelease() {
        this.$router.push({
          name: 'release',
          params: {
            releaseId: this.release.id,
            releaseName: this.release.names.original,
          }
        })
      }

    },

    mounted() {
      document.addEventListener('keydown', this.handleKeyboardEvents, true);
    },


    destroyed() {
      document.removeEventListener('keydown', this.handleKeyboardEvents);
    }

  }

</script>

<style lang="scss" scoped>

  .release {
    &__data {
      max-height: 300px;
      user-select: none;
    }
  }

</style>
