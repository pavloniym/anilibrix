const SET_QUALITY = 'SET_QUALITY';
const SET_UPSCALE_BOLD = 'SET_UPSCALE_BOLD';
const SET_UPSCALE_BLUR = 'SET_UPSCALE_BLUR';
const SET_EPISODES_SORT = 'SET_EPISODES_SORT';
const SET_AUTOPLAY_NEXT = 'SET_AUTOPLAY_NEXT';
const SET_UPSCALE_PROCESS = 'SET_UPSCALE_PROCESS';
const SET_TORRENTS_PROCESS = 'SET_TORRENTS_PROCESS';
const SET_OPENING_SKIP_TIME = 'SET_OPENING_SKIP_TIME';
const SET_OPENING_SKIP_BUTTON = 'SET_OPENING_SKIP_BUTTON';

export default {
  namespaced: true,
  state: {
    quality: null,
    upscale: {
      bold: 6,
      blur: 2,
      process: false
    },
    episodes: {order: 'asc'},
    torrents: {process: false},
    autoplayNext: true,
    opening: {
      skip_time: 30,
      skip_button: false,
    }
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


    /**
     * Set opening skip time
     *
     * @param s
     * @param time
     * @return {*}
     */
    [SET_OPENING_SKIP_TIME]: (s, time) => s.opening.skip_time = time,


    /**
     * Set opening skip button state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_OPENING_SKIP_BUTTON]: (s, state) => s.opening.skip_button = state,
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
    },


    /**
     * Set opening skip time
     *
     * @param commit
     * @param time
     * @return {*}
     */
    setOpeningSkipTime: ({commit}, time) => commit(SET_OPENING_SKIP_TIME, time),

    /**
     * Set opening skip button state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setOpeningSkipButton: ({commit}, state) => commit(SET_OPENING_SKIP_BUTTON, state),

  }
}
