<template>
  <v-card>

    <!-- Header -->
    <v-card-title v-text="title"/>
    <v-card-subtitle v-text="subtitle"/>
    <v-divider/>

    <!-- Header -->
    <v-select
      v-bind="{items}"
      solo
      flat
      hide-details
      class="pl-1"
      label="Сортировка"
      item-text="title"
      item-value="value"
      :value="_value"
      @input="_setFilterValue({filter: 'sort', value: $event})">
    </v-select>

  </v-card>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        title: 'Сортировка',
        items: [
          {title: 'По новизне', value: 1},
          {title: 'По популярности', value: 2},
        ],
        subtitle: 'Вы можете отсортировть список релизов по популярности или новизне'
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
