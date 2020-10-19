<template>
    <v-btn height="48" @click="setEpisodesSort">
      <v-icon>mdi-sort</v-icon>
    </v-btn>
</template>

<script>

  // Utils
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('app/settings', {_episodes_sort: s => s.player.episodes.order}),

      /**
       * Get sort order
       *
       * @return {string}
       */
      order() {
        return this._episodes_sort === 'asc' ? 'desc' : 'asc'
      },

    },
    methods: {
      ...mapActions('app/settings', {_setSettingsValue: 'setSettingsValue'}),

      /**
       * Set episodes sort
       *
       * @return {void}
       */
      setEpisodesSort() {
        this._setSettingsValue({k: 'player.episodes.order', v: this.order})
      }
    }

  }
</script>
