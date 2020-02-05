import {mutationsHelper} from '@utils/store'
import {LoginProxy} from '@proxies/profile'

export default {
  namespaced: true,
  state: {
    login: null,
    session: null
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
    authorize: ({}, {login, password}) => new Promise(() => { // eslint-disable-line
      new LoginProxy()
        .authorize({login, password})
        .then(response => console.log({response}))
    })
  }
}
