export default {

  data() {
    return {
      from: null
    }
  },

  methods: {

    /**
     * Go to back view
     *
     * @return {void}
     */
    async toBack() {
      await this.$router.replace(this.from || {name: 'releases'});
    },

  },


  beforeRouteEnter(to, from, next) {
    next(vm => vm.from = from || null)
  },

}
