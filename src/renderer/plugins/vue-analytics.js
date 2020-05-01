import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import app from '@/../package'

export default ({router} = {}) => {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS_ID,
    debug: {
      enabled: true
    },
    router,
    autoTracking: {
      screenview: true
    },
    set: [
      { field: 'version', value: app.version }
    ]
  })
}
