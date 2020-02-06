import {mutationsHelper} from '@utils/store'
import {LoginProxy} from '@proxies/profile'

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
     * @param login
     * @param password
     * @return {Promise<any>}
     */
    authorize: ({dispatch}, {login, password}) => {
      return new Promise((resolve) => {
        new LoginProxy()
          .authorize({login, password})
          .then(response => {
            console.log({response});
            resolve();
          })
      })
    },

    identify: ({commit}) => new Promise((resolve) => {
      return null;
    })

  }
}
