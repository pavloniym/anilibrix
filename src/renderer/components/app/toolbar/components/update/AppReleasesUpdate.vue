<template>
  <!-- Reload -->
  <v-btn icon class="mr-1" :disabled="_loading" @click="getLatestReleases">
    <v-progress-circular v-if="_loading" indeterminate size="20"/>
    <v-icon v-else>mdi-refresh</v-icon>
  </v-btn>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    computed: {
      ...mapState('releases', {
        _loading: s => s.items.loading,
      }),
    },
    methods: {
      ...mapActions('releases', ['getLatestReleases']),
    }
  }
</script>
