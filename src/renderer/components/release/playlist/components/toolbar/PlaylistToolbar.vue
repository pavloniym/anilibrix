<template>
  <v-layout align-center>

    <!-- Search -->
    <toolbar-search v-bind="{search}" @update:search="$emit('update:search', $event)"/>

    <!-- Sort -->
    <toolbar-sort class="ml-2" />

  </v-layout>
</template>

<script>

  import ToolbarSort from './components/sort'
  import ToolbarSearch from './components/search'

  const props = {
    search: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    components: {
      ToolbarSort,
      ToolbarSearch
    },
  }
</script>
