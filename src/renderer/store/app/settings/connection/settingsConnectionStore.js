import {generalMutations} from '@utils/store/mutations'

export default {
  namespaced: true,
  state: {
    host: 'https://www.anilibria.tv',
    proxy: {
      type: 'pac',
      pac: {
        host: null,
        port: null,
        direct: false,
        source: 'https://antizapret.prostovpn.org/proxy.pac',
      },
      custom: {
        host: null,
        port: null
      }
    }
  },

  mutations: {
    ...generalMutations
  },

  actions: {

    /**
     * Set host value
     *
     * @param commit
     * @param host
     * @return {*}
     */
    setHost: ({commit}, host) => commit('set', {k: 'host', v: host}),


    /**
     * Set poxy type
     *
     * @param commit
     * @param type
     * @return {*}
     */
    setProxy: ({commit}, type) => commit('set', {k: 'proxy.type', v: type}),


    /**
     * Set pac source
     *
     * @param commit
     * @param source
     * @return {*}
     */
    setProxyPacSource: ({commit}, source) => commit('set', {k: 'proxy.pac.source', v: source}),


    /**
     * Set proxy connection for pac proxy type
     *
     * @param commit
     * @param host
     * @param port
     * @param direct
     */
    setProxyPacConnection: ({commit}, {host = null, port = null, direct = false} = {}) => {
      commit('set', {k: 'proxy.pac.host', v: host});
      commit('set', {k: 'proxy.pac.port', v: port});
      commit('set', {k: 'proxy.pac.direct', v: direct});
    },


    /**
     * Set proxy connection for custom proxy type
     *
     * @param commit
     * @param host
     * @param port
     */
    setProxyCustomConnection: ({commit}, {host = null, port = null} = {}) => {
      commit('set', {k: 'proxy.custom.host', v: host});
      commit('set', {k: 'proxy.custom.port', v: port});
    },


    /**
     * Clear proxy connection for pac usage
     *
     * @param commit
     */
    clearProxyPacConnection: ({commit}) => {
      commit('set', {k: 'proxy.pac.host', v: null});
      commit('set', {k: 'proxy.pac.port', v: null});
      commit('set', {k: 'proxy.pac.direct', v: false});
    }

  }
}
