<template>
  <div>
    <component
      v-for="(filter, k) in filters"
      v-on="filter.events"
      v-bind="filter.props"
      class="mb-2"
      :is="filter.is"
      :key="k">
    </component>
  </div>
</template>

<script>

  import Sort from './components/sort'
  import Years from './components/years'
  import Genres from './components/genres'

  const props = {
    genres: {
      type: Array,
      default: null
    },
    years: {
      type: Array,
      default: null
    },
    sort: {
      type: Number,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get filters
       *
       * @return {array}
       */
      filters() {
        return [
          {
            is: Genres,
            props: {genres: this.genres},
            events: {'update:genres': $event => this.$emit('update:genres', $event)}
          },
          {
            is: Years,
            props: {years: this.years},
            events: {'update:years': $event => this.$emit('update:years', $event)}
          },
          {
            is: Sort,
            props: {sort: this.sort},
            events: {'update:sort': $event => this.$emit('update:sort', $event)}
          }
        ]
      }
    }
  }
</script>
