import app from '@/../package'
import VueYandexMetrika from 'vue-yandex-metrika'

export default {
  install: (Vue, {id, store, router}) => {
    Vue.use(VueYandexMetrika, {
      id,
      router: router,
      env: process.env.NODE_ENV,
      options: {
        userParams: {
          UserID: store.state.app.account.userId,
          release: `${app.name}@${app.version}`,
        }
      }
    })
  }
}
