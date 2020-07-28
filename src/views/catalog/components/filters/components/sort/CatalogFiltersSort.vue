<template>
  <v-select
    v-bind="{items}"
    outlined
    hide-details
    item-text="title"
    item-value="value"
    placeholder="Сортировка"
    :value="_value"
    @input="_setFilterValue({filter: 'sort', value: $event})">
  </v-select>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        items: [
          {title: 'По новизне', value: 1},
          {title: 'По популярности', value: 2},
        ]
      }
    },
    computed: {
      ...mapState('catalog', {_value: s => s.filters.sort.value})
    },

    methods: {
      ...mapActions('catalog', {_setFilterValue: 'setFilterValue'})
    },

  }
</script>
