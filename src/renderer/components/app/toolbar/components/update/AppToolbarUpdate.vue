<template>
  <div>

    <v-tooltip left activator="#toolbar__reload">
      <div class="py-1" :style="{lineHeight: 1}">
        <div class="font-weight-bold">Обновить последние релизы</div>
        <div class="caption">Обновлено в {{datetime}}</div>
      </div>
    </v-tooltip>

    <v-btn
      icon
      id="toolbar__reload"
      :disabled="_loading"
      @click="() => getReleases()">
      <v-fade-transition mode="out-in">
        <v-progress-circular v-if="_loading" indeterminate size="20"/>
        <v-icon v-else>mdi-refresh</v-icon>
      </v-fade-transition>
    </v-btn>

  </div>
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
      ...mapActions('releases', ['getReleases']),
    }
  }
</script>
