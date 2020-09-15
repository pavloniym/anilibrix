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
      label="Выбрать жанры"
      :value="_value"
      :items="_items"
      :loading="_loading"
      :menu-props="{attach: '#container'}"
      @input="_setFilterValue({filter: 'genres', value: $event})">
    </v-autocomplete>

  </v-card>
</template>

<script>

  // Store
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        title: 'Жанры',
        subtitle: 'Вы можете отфильтровать список релизов по указанным жанрам'
      }
    },
    computed: {
      ...mapState('catalog', {
        _items: s => s.filters.genres.items,
        _value: s => s.filters.genres.value,
        _loading: s => s.filters.genres.loading,
      })
    },

    methods: {
      ...mapActions('catalog', {
        _setFilterValue: 'setFilterValue',
        _getGenresFilter: 'getGenresFilter',
      })
    },

    created() {
      this._getGenresFilter();
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
