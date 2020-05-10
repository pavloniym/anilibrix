import {generalMutations} from '@utils/store/mutations'

export default {
  namespaced: true,
  state: {
    quality: null,
    episodes: {
      order: 'asc',
    },
    torrents: {
      process: false,
    },
    autoplayNext: true
  },

  mutations: {
   ...generalMutations
  },


  actions: {

    /**
     * Set quality alias
     *
     * @param commit
     * @param quality
     * @return {*}
     */
    setQuality: ({commit}, quality) => commit('set', {k: 'quality', v: quality}),


    /**
     * Set episodes sort order
     *
     * @param commit
     * @param sortOrder
     * @return {*}
     */
    setEpisodesSort: ({commit}, sortOrder) => commit('set', {k: 'episodes.order', v: sortOrder}),


    /**
     * Set torrents process
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setTorrentsProcess: ({commit}, state) => commit('set', {k: 'torrents.process', v: state}),


    /**
     * Set autoplay next episode
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAutoplayNext: ({commit}, state) => commit('set', {k: 'autoplayNext', v: state}),

  }
}
