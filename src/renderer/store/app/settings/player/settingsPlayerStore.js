const SET_QUALITY = 'SET_QUALITY';
const SET_EPISODES_SORT = 'SET_EPISODES_SORT';
const SET_TORRENTS_PROCESS = 'SET_TORRENTS_PROCESS';
const SET_AUTOPLAY_NEXT = 'SET_AUTOPLAY_NEXT';

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

    /**
     * Set quality
     *
     * @param s
     * @param quality
     * @return {*}
     */
    [SET_QUALITY]: (s, quality) => s.quality = quality,


    /**
     * Set episodes sort
     *
     * @param s
     * @param order
     * @return {*}
     */
    [SET_EPISODES_SORT]: (s, order) => s.episodes.order = order,


    /**
     * Set torrent process state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_TORRENTS_PROCESS]: (s, state) => s.torrents.process = state,


    /**
     *
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_AUTOPLAY_NEXT]: (s, state) => s.autoplayNext = state,


  },


  actions: {

    /**
     * Set quality alias
     *
     * @param commit
     * @param quality
     * @return {*}
     */
    setQuality: ({commit}, quality) => commit(SET_QUALITY, quality),


    /**
     * Set episodes sort order
     *
     * @param commit
     * @param sortOrder
     * @return {*}
     */
    setEpisodesSort: ({commit}, sortOrder) => commit(SET_EPISODES_SORT, sortOrder),


    /**
     * Set torrents process
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setTorrentsProcess: ({commit}, state) => commit(SET_TORRENTS_PROCESS, state),


    /**
     * Set autoplay next episode
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAutoplayNext: ({commit}, state) => commit(SET_AUTOPLAY_NEXT, state),

  }
}
