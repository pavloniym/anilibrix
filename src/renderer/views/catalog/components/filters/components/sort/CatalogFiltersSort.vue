<template>
  <v-select
    v-bind="{items}"
    outlined
    hide-details
    item-text="title"
    item-value="value"
    placeholder="Сортировка"
    :value="sort"
    @input="$emit('update:sort', $event)">
  </v-select>
</template>

<script>

  const props = {
    sort: {
      type: Number,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        items: [
          {title: 'По новизне', value: 1},
          {title: 'По популярности', value: 2},
        ]
      }
    }

  }
</script>
