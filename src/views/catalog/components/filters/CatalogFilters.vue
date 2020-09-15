<template>
  <div>
    <template v-for="(filter, k) in filters">
      <component :is="filter" :key="k" :class="{'mt-2': k > 0}"/>
    </template>
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
          Sort
        ]
      }
    }
  }
</script>
