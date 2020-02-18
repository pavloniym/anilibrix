<template>
  <v-layout class="release__data">
    <div :style="{width: '5%'}"></div>
    <div :style="{width: '90%'}">

      <div class="display-2 font-weight-black text-truncate">{{release.names.ru}}</div>
      <div class="subtitle-1">{{release.names.original}}</div>
      <div class="body-2">{{release.genres.join(' | ')}}</div>
      <v-chip label color="secondary" class="mt-2 subtitle-2 font-weight-black">{{release.episode.title}}</v-chip>
      <v-clamp class="my-2 grey--text lighten-1 data__description" autoresize max-height="75px">
        {{ strippedDescription}}
      </v-clamp>

      <v-layout>
        <v-btn v-bind="{loading}" :disabled="loading" @click="watchRelease(release)">Смотреть</v-btn>
        <v-btn v-bind="{loading}" class="ml-2" width="10px" disabled>
          <v-icon>mdi-playlist-plus</v-icon>
        </v-btn>
      </v-layout>

    </div>
    <div :style="{width: '5%'}"></div>
  </v-layout>
</template>

<script>

  import VClamp from 'vue-clamp'
  import stripHtml from "string-strip-html";

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

      /**
       * Stripped from html description
       *
       * @return string|null
       */
      strippedDescription() {
        return stripHtml(this.release.description || null);
      }

    },
    methods: {

      /**
       * Watch release
       * Set player data:
       * -> release title and episode
       * -> stream data
       *
       * @param release
       */
      watchRelease(release) {
        this.loading = true;
        this.$store
          .dispatchPromise('player/setPlayerData', {release, type: 'stream'})
          .then(() => this.$router.push({name: 'player'}))
          .finally(() => this.loading = false);
      }

    },
  }

</script>

<style lang="scss" scoped>

  .release__data {
    max-height: 300px;
    user-select: none;

    .data {
      &__description {
        height: 75px;
      }
    }

  }
</style>
