const SET_SPEED = 'SET_SPEED';
const SET_QUALITY = 'SET_QUALITY';
const SET_UPSCALE_BOLD = 'SET_UPSCALE_BOLD';
const SET_UPSCALE_BLUR = 'SET_UPSCALE_BLUR';
const SET_EPISODES_SORT = 'SET_EPISODES_SORT';
const SET_AUTOPLAY_NEXT = 'SET_AUTOPLAY_NEXT';
const SET_UPSCALE_PROCESS = 'SET_UPSCALE_PROCESS';
const SET_TORRENTS_PROCESS = 'SET_TORRENTS_PROCESS';

export default {
  namespaced: true,
  state: {
    speed: 1,
    quality: null,
    upscale: {
      bold: 6,
      blur: 2,
      process: false
    },
    episodes: {order: 'asc'},
    torrents: {process: false},
    autoplayNext: true,
  },

  mutations: {

    /**
     * Set speed
     *
     * @param s
     * @param speed
     * @return {*}
     */
    [SET_SPEED]: (s, speed) => s.speed = speed,

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


    /**
     * Set upscale blur
     *
     * @param s
     * @param value
     * @return {number}
     */
    [SET_UPSCALE_BLUR]: (s, value) => s.upscale.blur = value,


    /**
     * Set upscale bold
     *
     * @param s
     * @param value
     * @return {number}
     */
    [SET_UPSCALE_BOLD]: (s, value) => s.upscale.bold = value,


    /**
     * Set upscale processing state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_UPSCALE_PROCESS]: (s, state) => s.upscale.process = state,

  },


  actions: {


    /**
     * Set speed
     *
     * @param commit
     * @param speed
     * @return {*}
     */
    setSpeed: ({commit}, speed) => commit(SET_SPEED, speed),


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


    /**
     * Set upscale process
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpscaleProcess: ({commit}, state) => commit(SET_UPSCALE_PROCESS, state),

    /**
     * Set upscale parameters
     *
     * @param commit
     * @param bold
     * @param blur
     */
    setUpscaleParameters: ({commit}, {bold, blur}) => {
      commit(SET_UPSCALE_BLUR, blur);
      commit(SET_UPSCALE_BOLD, bold);
    }

  }
}
