<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    render: () => null,
    computed: {
      ...mapState('app', ['errors']),
    },
    methods: {
      ...mapActions('app', ['shiftError'])
    },

    watch: {
      errors: {
        deep: true,
        handler(errors) {
          (errors || [])
            .map(error => typeof error === 'object' ? `${error.code}: ${error.message}` : error)
            .forEach((error, k) => {
              this.$toasted.show(error, {type: 'error'});
              this.shiftError(k);
            })
        }
      }
    }

  }
</script>

<style lang="scss">

  .toasted-container.bottom-right {
    right: 2%;
    bottom: 3%;
  }

  .toasted {
    font-family: Roboto, sans-serif;
    font-weight: 500 !important;
    padding: 1rem;

    &.error {
      background: #F44336 !important;
    }

  }

</style>
