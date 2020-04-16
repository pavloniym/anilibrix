import { mutationsHelper } from '@utils/store'

export default {
  namespaced: true,
  state: {
    host: 'https://www.anilibria.tv',
    proxy: {

      pac: {
        active: false,
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
     * Set host value
     *
     * @param commit
     * @param host
     * @return {*}
     */
    setHost: ({ commit }, host) =>
      commit('set', { k: 'host', v: host }),

    /**
     * Set proxy type
     *
     * @param commit
     * @param type
     */
    setProxyType: ({ commit }, type) => {
      commit('set', { k: 'proxy.pac.active', v: type === 'pac' });
      commit('set', { k: 'proxy.custom.active', v: type === 'custom' });
    },

    /**
     * Set pac source
     *
     * @param commit
     * @param source
     * @return {*}
     */
    setPacSource: ({ commit }, source) =>
      commit('set', { k: 'proxy.pac.source', v: source }),

    /**
     * Set proxy connection for pac proxy type
     *
     * @param commit
     * @param host
     * @param port
     */
    setPacProxyConnection: ({ commit }, { host, port }) => {
      commit('set', { k: 'proxy.pac.connection.host', v: host });
      commit('set', { k: 'proxy.pac.connection.port', v: port });
    },

    /**
     * Set proxy connection for custom proxy type
     *
     * @param commit
     * @param host
     * @param port
     */
    setCustomProxyConnection: ({ commit }, { host, port }) => {
      commit('set', { k: 'proxy.custom.connection.host', v: host });
      commit('set', { k: 'proxy.custom.connection.port', v: port });
    },

    /**
     * Clear proxy connection for pac usage
     *
     * @param commit
     */
    clearPacProxyConnection: ({ commit }) => {
      commit('set', { k: 'proxy.pac.connection.host', v: null });
      commit('set', { k: 'proxy.pac.connection.port', v: null });
    }

  }
}
