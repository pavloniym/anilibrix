<template>
  <!-- Reload -->
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="datetime ? on : null"
        icon
        :disabled="_loading"
        @click="getLatestReleases">

        <v-progress-circular v-if="_loading" indeterminate size="20"/>
        <v-icon v-else>mdi-refresh</v-icon>

      </v-btn>
    </template>
    <span>Обновлено в {{datetime}}</span>
  </v-tooltip>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    computed: {
      ...mapState('releases', {
        _loading: s => s.items.loading,
        _datetime: s => s.items.datetime,
      }),


      /**
       * Get human update datetime
       *
       * @return {any}
       */
      datetime() {
        return this._datetime
          ? new Intl.DateTimeFormat(undefined, {hour: 'numeric', minute: 'numeric', second: 'numeric'})
            .format(this._datetime)
          : null
      }

    },
    methods: {
      ...mapActions('releases', ['getLatestReleases']),
    }
  }
</script>
