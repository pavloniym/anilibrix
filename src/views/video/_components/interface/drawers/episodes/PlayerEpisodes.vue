<template>
  <v-navigation-drawer v-model="is_visible" absolute temporary width="400" :style="{zIndex: 100}">

    <!-- Episodes -->
    <v-card>
      <v-card-title>Эпизоды</v-card-title>
      <v-card-subtitle>Список всех эпизодов релиза</v-card-subtitle>
      <episodes
        v-bind="{release, episodes}"
        class="pa-4"
        :playing_episode_id="episode ? episode.id : null"
        @play:episode="$emit('play:episode', {release_id: release.id, episode_id: $event.id})">
      </episodes>
    </v-card>

  </v-navigation-drawer>
</template>

<script>

  // Components
  import Episodes from '@components/release/episodes'

  // Mixins
  import {PlatformMixin} from '@mixins/app'

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
    mixins: [PlatformMixin],
    components: {
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
