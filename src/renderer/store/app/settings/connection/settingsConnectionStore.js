const SET_HOST = 'SET_HOST';
const SET_PROXY_TYPE = 'SET_PROXY_TYPE';
const SET_PROXY_PAC_SOURCE = 'SET_PROXY_PAC_SOURCE';
const SET_PROXY_PAC_CONNECTION = 'SET_PROXY_PAC_CONNECTION';
const CLEAR_PROXY_PAC_CONNECTION = 'CLEAR_PROXY_PAC_CONNECTION';
const SET_PROXY_CUSTOM_CONNECTION = 'SET_PROXY_CUSTOM_CONNECTION';


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

    /**
     * Set host
     *
     * @param s
     * @param host
     * @return {*}
     */
    [SET_HOST]: (s, host) => s.host = host,


    /**
     * Set proxy type
     *
     * @param s
     * @param type
     * @return {*}
     */
    [SET_PROXY_TYPE]: (s, type) => s.proxy.type = type,


    /**
     * Set proxy pac
     *
     * @param s
     * @param source
     * @return {*}
     */
    [SET_PROXY_PAC_SOURCE]: (s, source) => s.proxy.pac.source = source,


    /**
     * Set proxy pac connection payload
     *
     * @param s
     * @param host
     * @param port
     * @param direct
     */
    [SET_PROXY_PAC_CONNECTION]: (s, {host, port, direct}) => {
      s.proxy.pac.host = host;
      s.proxy.pac.port = port;
      s.proxy.pac.direct = direct;
    },


    /**
     * Clear proxy pac connection
     *
     * @param s
     */
    [CLEAR_PROXY_PAC_CONNECTION]: (s) => {
      s.proxy.pac.host = null;
      s.proxy.pac.port = null;
      s.proxy.pac.direct = false;
    },

    /**
     * Set proxy custom connection payload
     *
     * @param s
     * @param host
     * @param port
     * @param direct
     */
    [SET_PROXY_CUSTOM_CONNECTION]: (s, {host, port}) => {
      s.proxy.custom.host = host;
      s.proxy.custom.port = port;
    }

  },

  actions: {

    /**
     * Set host value
     *
     * @param commit
     * @param host
     * @return {*}
     */
    setHost: ({commit}, host) => commit(SET_HOST, host),


    /**
     * Set poxy type
     *
     * @param commit
     * @param type
     * @return {*}
     */
    setProxy: ({commit}, type) => commit(SET_PROXY_TYPE, type),


    /**
     * Set pac source
     *
     * @param commit
     * @param source
     * @return {*}
     */
    setProxyPacSource: ({commit}, source) => commit(SET_PROXY_PAC_SOURCE, source),


    /**
     * Set proxy connection for pac proxy type
     *
     * @param commit
     * @param host
     * @param port
     * @param direct
     */
    setProxyPacConnection: ({commit}, {host = null, port = null, direct = false} = {}) =>
      commit(SET_PROXY_PAC_CONNECTION, {host, port, direct}),


    /**
     * Set proxy connection for custom proxy type
     *
     * @param commit
     * @param host
     * @param port
     */
    setProxyCustomConnection: ({commit}, {host = null, port = null} = {}) =>
      commit(SET_PROXY_CUSTOM_CONNECTION, {host, port}),


    /**
     * Clear proxy connection for pac usage
     *
     * @param commit
     */
    clearProxyPacConnection: ({commit}) => commit(CLEAR_PROXY_PAC_CONNECTION)

  }
}
