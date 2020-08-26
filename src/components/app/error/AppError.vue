<script>

  // Resolvers
  import ErrorResolver from "@@/utils/resolvers/error";

  export default {
    render: () => null,
    methods: {

      /**
       * Show toast with app error
       * @param error
       */
      showError(error) {
        this.$toasted.show(error, {type: 'error'});
      }
    },

    created() {
      ErrorResolver.catchError(this.showError);
    },

    destroyed() {
      ErrorResolver.unsubscribeError(this.showError);
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
