<script>

  import {handleAppError} from "@main/handlers/notifications/notificationsHandler";

  export default {
    render: () => null,
    created() {
      handleAppError(error => this.$toasted.show(error, {type: 'error'}));
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
