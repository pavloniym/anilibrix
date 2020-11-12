<template>
  <v-card @click="setSeenReleasesSettings(!_show_seen)">
    <v-layout align-center>

      <div>
        <v-card-title>Просмотренные релизы</v-card-title>
        <v-card-subtitle>Вы можете показать или скрыть уже просмотренные релизы</v-card-subtitle>
      </div>

      <v-spacer/>

      <v-switch class="mr-2" :input-value="_show_seen"/>

    </v-layout>
  </v-card>
</template>

<script>

  // Store
  import {mapActions, mapState} from 'vuex'
  import {SET_SEEN_RELEASES_SETTINGS_ACTION} from "@store/favorites/favoritesStore";

  export default {
    computed: {
      ...mapState('favorites', {_show_seen: s => s.settings.show_seen})
    },
    methods: {
      ...mapActions('favorites', [SET_SEEN_RELEASES_SETTINGS_ACTION]),

      /**
       * Toggle seen releases
       *
       * @param show_seen
       * @return {void}
       */
      setSeenReleasesSettings(show_seen) {
        this[SET_SEEN_RELEASES_SETTINGS_ACTION](show_seen);
      }

    }
  }
</script>
