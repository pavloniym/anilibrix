export default {

  methods: {

    /**
     * Handler mouse event
     *
     * @param e
     */
    handleMouseEvents(e) {
      //
    },

    /**
     * Handle mouse scroll event
     *
     * @param e
     */
    handleMouseScroll(e) {
      //
    }

  },

  mounted() {
    window.addEventListener('mousemove', this.handleMouseEvents);
    window.addEventListener('mousewheel', this.handleMouseScroll);
  },

  destroyed() {
    window.removeEventListener('mousemove', this.handleMouseEvents);
    window.removeEventListener('mousewheel', this.handleMouseScroll);
  }
}
