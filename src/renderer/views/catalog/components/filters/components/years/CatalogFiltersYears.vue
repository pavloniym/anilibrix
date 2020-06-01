<template>
  <v-autocomplete
    chips
    outlined
    multiple
    clearable
    hide-details
    hide-no-data
    deletable-chips
    class="filter"
    placeholder="Года"
    :value="years"
    :items="_items"
    :loading="_loading"
    @input="$emit('update:years', $event)">

  </v-autocomplete>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  const props = {
    years: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    computed: {
      ...mapState('catalog', {
        _items: s => s.filters.years.items,
        _loading: s => s.filters.years.loading,
      })
    },

    methods: {
      ...mapActions('catalog', {_getCatalogYearsFilter: 'getCatalogYearsFilter'})
    },

    created() {
      this._getCatalogYearsFilter();
    }
  }
</script>

<style lang="scss" scoped>

  .filter {
    ::v-deep {
      .v-chip {
        border-radius: 4px;
      }
    }
  }

</style>
