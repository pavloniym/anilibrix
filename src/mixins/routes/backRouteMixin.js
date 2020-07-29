export default {

  computed: {

    /**
     * Check if router has previous route
     *
     * @return {boolean}
     */
    hasBack() {
      return this.$routerHistory.hasPrevious();
    }

  },

  methods: {

    /**
     * Go to back view
     *
     * @return {void}
     */
    async toBack() {
      if (this.hasBack) {
        await this.$router.replace(this.$routerHistory.previous());
      }
    },
  }

}
