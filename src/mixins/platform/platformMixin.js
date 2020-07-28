export default {
  data() {
    return {
      is_web: process.env.IS_WEB === true,
      is_desktop: process.env.IS_DESKTOP === true,
    }
  },
}
