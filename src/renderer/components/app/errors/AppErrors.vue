<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    render: () => null,
    computed: {
      ...mapState('app/errors', {_errors: s => s.items}),
    },
    methods: {
      ...mapActions('app/errors', {_shift: 'shift'})
    },

    watch: {
      _errors: {
        deep: true,
        handler(errors) {
          (errors || [])
            .map(error => typeof error === 'object' ? `${error.code}: ${error.message}` : error)
            .forEach((error, k) => {
              this.$toasted.show(error, {type: 'error'});
              this._shift(k);
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
    max-width: 400px;
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
