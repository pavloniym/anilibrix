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
    placeholder="Выбрать жанры"
    :value="genres"
    :items="_items"
    :loading="_loading"
    @input="$emit('update:genres', $event)">

  </v-autocomplete>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  const props = {
    genres: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    computed: {
      ...mapState('catalog', {
        _items: s => s.filters.genres.items,
        _loading: s => s.filters.genres.loading,
      })
    },

    methods: {
      ...mapActions('catalog', {_getCatalogGenresFilter: 'getCatalogGenresFilter'})
    },

    created() {
      this._getCatalogGenresFilter();
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
