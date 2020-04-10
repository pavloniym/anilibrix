<template>
  <v-layout class="release__data">
    <div :style="{width: '5%'}"></div>
    <div :style="{width: '90%'}">

      <!-- Release Data -->
      <div class="display-2 font-weight-black text-truncate">{{data.names.ru}}</div>
      <div class="subtitle-1">{{data.names.original}}</div>
      <div class="body-2">{{data.genres.join(' | ')}}</div>

      <!-- Episode -->
      <v-chip label color="secondary" class="mt-2 subtitle-2 font-weight-black">{{data.episode.title}}</v-chip>

      <!-- Description -->
      <div class="my-2 grey--text lighten-1" :style="{maxHeight: '75px'}">
        <v-clamp max-height="75px">{{data.description}}</v-clamp>
      </div>

      <v-layout>
        <v-btn v-bind="{loading}" :disabled="loading" @click="watchEpisode">Смотреть</v-btn>
        <v-btn v-bind="{loading}" class="ml-1" :disabled="loading" @click="toRelease">Релиз</v-btn>
      </v-layout>

    </div>
    <div :style="{width: '5%'}"></div>
  </v-layout>
</template>

<script>

  import VClamp from 'vue-clamp'
  import {mapState} from 'vuex'
  import __get from 'lodash/get'

  const props = {
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {VClamp},
    data() {
      return {
        loading: false
      }
    },

    computed: {
      ...mapState('settings/player', ['type']),

      data() {
       return {
         names: {
           ru: __get(this.release, 'names.ru'),
           original: __get(this.release, 'names.original')
         },
         description: __get(this.release, 'description'),
         genres: __get(this.release, 'genres') || [],
         episode: {
           title:  __get(this.release, 'episode.title'),
         }
       }
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
      watchEpisode() {
        this.loading = true;
        this.$store
          .dispatchPromise('player/watch', {
            release: this.release,
            episode: this.release.episode
          })
          .then(() => this.$router.push({name: 'player'}))
          .finally(() => this.loading = false);
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
            releaseTitle: this.release.names.ru,
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

  .release__data {
    max-height: 300px;
    user-select: none;
  }

</style>
