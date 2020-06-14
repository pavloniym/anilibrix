<template>
  <div>
    <component
      v-for="(filter, k) in filters"
      class="mb-2"
      :is="filter"
      :key="k">
    </component>
  </div>
</template>

<script>

  import Sort from './components/sort'
  import Years from './components/years'
  import Genres from './components/genres'


  export default {
    computed: {

      /**
       * Get filters
       *
       * @return {array}
       */
      filters() {
        return [
          Genres,
          Years,
          Sort,
        ]
      }
    }
  }
</script>
