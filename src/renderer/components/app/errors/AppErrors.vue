<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    render: () => null,
    computed: {
      ...mapState('app/settings/system', {_errors: s => s.errors}),
    },
    methods: {
      ...mapActions('app/settings/system', {_removeError: 'removeError'})
    },

    watch: {
      _errors: {
        deep: true,
        handler(errors) {
          (errors || [])
            .map(error => typeof error === 'object' ? `${error.code}: ${error.message}` : error)
            .forEach((error, k) => {
              this.$toasted.show(error, {type: 'error'});
              this._removeError(k);
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
