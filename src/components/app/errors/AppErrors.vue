<script>

  //import {catchError, unsubscribeError} from "@/events/errors/errorsEvents";

  export default {
    render: () => null,
    methods: {

      /**
       * Show toast with app error
       * @param error
       */
      showError(error) {
       // this.$toasted.show(error, {type: 'error'});
      }
    },

    created() {
      //catchError(this.showError);
    },

    destroyed() {
      //unsubscribeError(this.showError);
    }

  }
</script>

<style lang="scss">

  .toasted-container.bottom-right {
    right: 2%;
    bottom: 3%;
    max-width: 400px;
    display: none;
  }

  .toasted {
    font-family: Roboto, sans-serif;
    font-weight: 500 !important;
    padding: 1rem;
    display: none;

    &.error {
      background: #F44336 !important;
    }

  }

</style>
