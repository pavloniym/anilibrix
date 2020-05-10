<template>
  <v-layout align-center>

    <!-- Search -->
    <toolbar-search v-bind="{search}" @update:search="$emit('update:search', $event)"/>

    <!-- Sort -->
    <toolbar-sort class="mx-1"/>
    <toolbar-actions v-bind="{release}"/>

  </v-layout>
</template>

<script>

  import ToolbarSort from './components/sort'
  import ToolbarSearch from './components/search'
  import ToolbarActions from './components/actions'

  const props = {
    search: {
      type: String,
      default: null
    },
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {
      ToolbarSort,
      ToolbarSearch,
      ToolbarActions
    },
  }
</script>
