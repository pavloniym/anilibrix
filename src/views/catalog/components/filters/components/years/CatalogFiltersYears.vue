<template>
  <v-card>

    <!-- Header -->
    <v-card-title v-text="title"/>
    <v-card-subtitle v-text="subtitle"/>
    <v-divider/>

    <!-- Content -->
    <v-autocomplete
      solo
      flat
      chips
      multiple
      clearable
      hide-details
      hide-no-data
      deletable-chips
      class="py-2 filter"
      label="Года"
      :value="_value"
      :items="_items"
      :loading="_loading"
      @input="_setFilterValue({filter: 'years', value: $event})">
    </v-autocomplete>

  </v-card>
</template>

<script>

  // Store
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        title: 'Период',
        subtitle: 'Вы можете отфильтровать список релизов по годам выпуска'
      }
    },
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
        _getYearsFilter: 'getYearsFilter'
      })
    },

    created() {
      this._getYearsFilter();
    }
  }
</script>

<style lang="scss" scoped>

  .filter {
    ::v-deep {
      .v-chip {
        border-radius: 4px;
      }
      .v-label {
        padding-left: 4px;
      }
    }
  }

</style>
