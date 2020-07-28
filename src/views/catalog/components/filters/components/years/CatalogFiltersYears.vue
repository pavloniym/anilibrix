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
    :value="_value"
    :items="_items"
    :loading="_loading"
    @input="_setFilterValue({filter: 'years', value: $event})">

  </v-autocomplete>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('catalog', {
        _items: s => s.filters.years.items,
        _value: s => s.filters.years.value,
        _loading: s => s.filters.years.loading,
      })
    },

    methods: {
      ...mapActions('catalog', {
        _setFilterValue: 'setFilterValue',
        _getCatalogYearsFilter: 'getCatalogYearsFilter'
      })
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
