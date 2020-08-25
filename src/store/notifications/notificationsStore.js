const PUSH_TO_RELEASES = 'PUSH_TO_RELEASES';
const SORT_NOTIFICATIONS = 'SORT_NOTIFICATIONS';
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
const FILTER_NOTIFICATIONS = 'FILTER_NOTIFICATIONS';
const SET_NOTIFICATIONS_SEEN_STATUS = 'SET_NOTIFICATIONS_SEEN_STATUS';

export default {
  namespaced: true,
  state: {
    items: [],
  },

  mutations: {

    /**
     * Push release to releases
     *
     * @param s
     * @param release
     * @return {*}
     */
    [PUSH_TO_RELEASES]: (s, release) => s.items.push(release),


    /**
     * Filter notifications
     * Keep only last 7 days
     *
     * @param s
     * @return {*}
     */
    [FILTER_NOTIFICATIONS]: s =>
      s.items = s.items.filter(item => (new Date(item.datetime).getTime() / 1000) + (60 * 60 * 24 * 7) > new Date().getTime() / 1000),


    /**
     * Sort notifications
     *
     * @param s
     * @return {*}
     */
    [SORT_NOTIFICATIONS]: s => s.items = s.items.sort((a, b) => new Date(b.datetime) - new Date(a.datetime)),


    /**
     * Set seen status of all items
     *
     * @param s
     * @return {*}
     */
    [SET_NOTIFICATIONS_SEEN_STATUS]: s => s.items = s.items.map(item => ({...item, is_seen: true})),


    /**
     * Clear notifications
     *
     * @param s
     * @return {*[]}
     */
    [CLEAR_NOTIFICATIONS]: s => s.items = []

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

      // Add notification
      // Push release to releases items
      if (release && release.episodes[0]) {
        commit(PUSH_TO_RELEASES, {release, episode: release.episodes[0], is_seen: false, datetime: new Date()});
      }

      // Filter notifications
      // Sort notifications
      commit(FILTER_NOTIFICATIONS);
      commit(SORT_NOTIFICATIONS);

    },


    /**
     * Set seen status
     *
     * @param commit
     * @return {*}
     */
    setSeen: ({commit}) => commit(SET_NOTIFICATIONS_SEEN_STATUS),


    /**
     * Clear notifications
     *
     * @param commit
     * @return {*}
     */
    clearNotifications: ({commit}) => commit(CLEAR_NOTIFICATIONS),
  }

}
