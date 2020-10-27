<template>
  <drawer
    v-model="is_visible"
    absolute
    temporary
    width="400"
    z-index="100">

    <v-toolbar dark>
      <v-app-bar-nav-icon @click="is_visible = false">
        <v-icon>mdi-close</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <div>Эпизоды</div>
        <div class="caption grey--text" :style="{lineHeight: 1}">Список всех эпизодов релиза</div>
      </v-toolbar-title>
    </v-toolbar>

    <episodes
      v-bind="{release, episodes}"
      class="py-4 px-2"
      :show_progress="false"
      :playing_episode_id="episode ? episode.id : null"
      @play:episode="$emit('play:episode', {release_id: release.id, episode_id: $event.id})">
    </episodes>

  </drawer>
</template>

<script>

  // Components
  import Drawer from '@components/app/ui/drawer'
  import Episodes from '@components/release/episodes'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

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
    mixins: [DeviceMixin],
    components: {
      Drawer,
      Episodes,
    },

    data() {
      return {
        is_visible: false,
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
        this.is_visible = true;
      },
    }

  }
</script>
