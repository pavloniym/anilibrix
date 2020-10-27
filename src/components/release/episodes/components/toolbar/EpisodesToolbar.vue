<template>
  <v-layout align-center>

    <!-- Search -->
    <search v-bind="{search}" @update:search="$emit('update:search', $event)"/>

    <!-- Sort -->
    <sort class="mx-1"/>
    <actions v-bind="{release, container}"/>

  </v-layout>
</template>

<script>

  // Components
  import Sort from './components/sort'
  import Search from './components/search'
  import Actions from './components/actions'

  const props = {
    search: {
      type: String,
      default: null
    },
    release: {
      type: Object,
      default: null
    },
    container: {
      type: HTMLDivElement,
      default: null
    }
  };

  export default {
    props,
    components: {
      Sort,
      Search,
      Actions
    },
  }
</script>
