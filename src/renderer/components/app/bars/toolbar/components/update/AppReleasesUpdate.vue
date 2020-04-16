<template>
  <!-- Reload -->
  <v-tooltip left>

    <template v-slot:activator="{ on }">
      <v-btn
        v-on="datetime ? on : null"
        icon
        :disabled="_loading"
        @click="getLatestReleases">
        <v-fade-transition mode="out-in">
          <v-progress-circular v-if="_loading" indeterminate size="20"/>
          <v-icon v-else>mdi-refresh</v-icon>
        </v-fade-transition>
      </v-btn>
    </template>

    <span>
      <div>Обновить последние релизы</div>
      <div class="caption">Обновлено в {{datetime}}</div>
    </span>

  </v-tooltip>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    computed: {
      ...mapState('releases', {
        _loading: s => s.loading,
        _datetime: s => s.datetime,
      }),


      /**
       * Get human update datetime
       *
       * @return {any}
       */
      datetime() {
        return this._datetime
          ? this._datetime.toLocaleString()
          : null
      }

    },
    methods: {
      ...mapActions('releases', ['getLatestReleases']),
    }
  }
</script>
