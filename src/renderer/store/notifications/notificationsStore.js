const SET_RELEASE = 'SET_RELEASE';
const REMOVE_RELEASE = 'REMOVE_RELEASE';

export default {
  namespaced: true,
  state: {
    item: null,
  },

  mutations: {

    /**
     * Set release
     *
     * @param s
     * @param release
     * @return {*}
     */
    [SET_RELEASE]: (s, release) => s.item = release,


    /**
     * Set
     * @param s
     * @return {null}
     */
    [REMOVE_RELEASE]: s => s.item = null,

  },

  actions: {

    /**
     * Add release to notification items
     *
     * @param commit
     * @param release
     * @return {*}
     */
    setRelease: ({commit}, release) => {
      commit(SET_RELEASE, release);
      commit(REMOVE_RELEASE);
    },

  }

}
