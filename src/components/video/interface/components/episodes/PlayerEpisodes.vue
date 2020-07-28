<template>
  <v-navigation-drawer
    v-model="visible"
    absolute
    temporary
    width="400"
    :style="{zIndex: 100}">

    <!-- System Bar Offset-->
    <app-system-bar-placeholder fixed/>

    <!-- Episodes -->
    <v-card :class="{'mt-9': !this.isMacOnFullscreen}">
      <v-card-title>Эпизоды</v-card-title>
      <v-card-subtitle>Список всех эпизодов релиза</v-card-subtitle>
      <episodes
        v-bind="{release, episodes}"
        class="pa-4"
        :playing="episode"
        @episode="toVideo(release, $event)">
      </episodes>
    </v-card>

  </v-navigation-drawer>
</template>

<script>

  import Episodes from '@components/release/episodes'
  import AppSystemBarPlaceholder from '@components/app/systembar/placeholder'

  import {AppPlatformMixin} from '@mixins/app'
  import {toVideo} from "@utils/router/views";

  const props = {
    release: {
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
    mixins: [AppPlatformMixin],
    components: {
      Episodes,
      AppSystemBarPlaceholder
    },

    data() {
      return {
        visible: false,
      }
    },

    computed: {

      /**
       * Get episodes
       *
       * @return {*|*[]}
       */
      episodes() {
        return this.$__get(this.release, 'episodes') || [];
      }

    },

    methods: {

      /**
       * Show playlist
       *
       * @return void
       */
      show() {
        this.visible = true;
      },

      /**
       * To video episode
       *
       * @param episode
       * @param release
       */
      toVideo,

    }

  }
</script>
