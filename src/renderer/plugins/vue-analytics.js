import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import app from '@/../package'

export default ({store, router} = {}) => {

    const isDev = process.env.NODE_ENV === 'development';

    Vue.use(VueAnalytics, {
        id: process.env.GOOGLE_ANALYTICS_ID,
        debug: {
            enabled: isDev,
            sendHitTask: isDev,
        },
        router,
        set: [
            {field: 'userId', value: store.state.app.account.uuid},
            {field: 'dimension1', value: app.version}
        ],
    })
}
