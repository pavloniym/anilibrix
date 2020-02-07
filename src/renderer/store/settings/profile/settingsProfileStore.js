import {mutationsHelper} from '@utils/store'
import {LoginProxy, ProfileProxy} from '@proxies/profile'

export default {
  namespaced: true,
  state: {
    session: null,
    profile: null
  },

  mutations: {
    ...mutationsHelper
  },

  actions: {

    /**
     * Try to login
     *
     * @param commit
     * @param dispatch
     * @param login
     * @param password
     * @return {Promise<any>}
     */
    authorize: ({commit, dispatch}, {login, password}) => {
      return new Promise((resolve, reject) => {
        new LoginProxy()
          .authorize({login, password})
          .then(response => commit('set', {k: 'session', v: response}))
          .then(() => dispatch('identify'))
          .then(() => resolve())
          .catch(response => reject(response))
      })
    },

    identify: ({commit}) => {
      return new Promise((resolve, reject) => {
        new ProfileProxy()
          .identify()
          .then(response => console.log(response));
      })
    }

  }

}
