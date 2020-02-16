<template>
  <v-layout class="release__data">
    <div :style="{width: '5%'}"></div>
    <div :style="{width: '90%'}">

      <div class="display-2 font-weight-black text-truncate">{{release.names.ru}}</div>
      <div class="subtitle-1">{{release.names.original}}</div>
      <div class="body-2">{{release.genres.join(' | ')}}</div>
      <v-chip label color="secondary" class="mt-2 subtitle-2 font-weight-black">{{release.episode}}</v-chip>
      <v-clamp class="my-2 grey--text lighten-1 data__description" autoresize max-height="80px">
        {{ strippedDescription}}
      </v-clamp>

      <v-layout>
        <v-btn @click="watchRelease(release)">Смотреть</v-btn>
        <v-btn class="ml-2" width="10px" disabled>
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

  import {mapActions} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {VClamp},
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
      ...mapActions('player', ['setTitleData', 'setStreamData']),

      /**
       * Watch release
       * Set player data:
       * -> release title and episode
       * -> stream data
       *
       * @param release
       */
      watchRelease(release) {

        this.setTitleData({name: release.names.ru, episode: '1 серия'});
        this.setStreamData(release.player.stream);

        this.$router.push({name: 'player.stream'});
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
        height: 80px;
      }
    }

  }
</style>
