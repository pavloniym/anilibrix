<script>

  export default {
    render: () => null,
    created() {
      this.$electron.ipcRenderer.on('app:error', (e, error) =>
        this.$toasted.show(error, {type: 'error'})
      )
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
