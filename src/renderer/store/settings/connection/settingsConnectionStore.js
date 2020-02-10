import {mutationsHelper} from '@utils/store'

export default {
  namespaced: true,
  state: {
    host: 'https://www.anilibria.tv',
    proxy: {

      pac: {
        active: true,
        source: 'https://antizapret.prostovpn.org/proxy.pac',
        connection: {
          host: null,
          port: null
        }
      },

      custom: {
        active: false,
        connection: {
          host: null,
          port: null
        }
      }
    }
  },

  mutations: {
    ...mutationsHelper
  },


  actions: {

    /**
     * Set proxy connection for pac proxy type
     *
     * @param commit
     * @param host
     * @param port
     */
    setPacProxyConnection: ({commit}, {host, port}) => {
      commit('set', {k: 'proxy.pac.connection.host', v: host});
      commit('set', {k: 'proxy.pac.connection.port', v: port});
    },


    /**
     * Clear proxy connection for pac usage
     *
     * @param commit
     */
    clearPacProxyConnection: ({commit}) => {
      commit('set', {k: 'proxy.pac.connection.host', v: null});
      commit('set', {k: 'proxy.pac.connection.port', v: null});
    }


  }
}
