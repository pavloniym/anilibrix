<template>
  <drawer v-model="is_visible" absolute temporary width="400" z-index="100">
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
  </drawer>
</template>

<script>

  // Components
  import Drawer from '@components/app/ui/drawer'
  import Episodes from '@components/release/episodes'

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
