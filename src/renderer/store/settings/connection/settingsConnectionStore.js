export default {
  namespaced: true,
  state: {
    host: 'https://www.anilibria.tv',
    proxy: {
      pac: {
        active: true,
        url: 'https://antizapret.prostovpn.org/proxy.pac'
      },
      custom: {
        active: false,
        host: null
      }
    }

  }
}
