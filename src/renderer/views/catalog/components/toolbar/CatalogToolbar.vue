<template>
  <v-layout class="shrink">


    <!-- Reload -->
    <v-btn v-bind="{loading}" class="mr-2" height="48" @click="$emit('reload')">
      <v-icon small class="mr-2">mdi-refresh</v-icon>
      <span>Обновить</span>
    </v-btn>

    <!-- Settings -->
    <v-badge dot overlap offset-x="10" offset-y="10" :value="hasFilters">
      <v-btn v-bind="{loading}" height="48" @click="$emit('update:settings', !settings)">
        <v-icon small class="mr-2">mdi-filter</v-icon>
        <span>Фильтры</span>
      </v-btn>
    </v-badge>

  </v-layout>
</template>

<script>

  import {mapState} from 'vuex';

  const props = {
    settings: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  };

  export default {
    props,
    computed: {
      ...mapState('catalog', {
        _genres: s => s.filters.genres.value,
        _years: s => s.filters.years.value,
      }),


      /**
       * Check if have active filters
       *
       * @return {boolean}
       */
      hasFilters() {
        const years = this._years || [];
        const genres = this._genres || [];

        return (years.length + genres.length) > 0;
      }


    }

  }
</script>
