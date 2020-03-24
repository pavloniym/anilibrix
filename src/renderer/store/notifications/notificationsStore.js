import Fuse from 'fuse.js'
import AnilibriaNotificationTransformer from '@transformers/anilibria/notifications'
import {mutationsHelper} from '@utils/store'
import __get from 'lodash/get'


/**
 * Check subscription string in releases
 *
 * @param releases
 * @param subscriptionString
 * @return array
 */
const checkSubscription = (releases, subscriptionString) => {

  const fuse = new Fuse(releases, {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    includeScore: true,
    threshold: 0.35,
    location: 0,
    distance: 100,
    maxPatternLength: 128,
    minMatchCharLength: 1,
    keys: [
      'names.ru',
      'names.original'
    ]
  });

  return fuse.search(subscriptionString);
};


export default {
  namespaced: true,
  state: {
    items: {},
    subscriptions: [],
  },

  mutations: {
    ...mutationsHelper
  },


  actions: {

    /**
     * Check releases for subscription
     * If release is in subscriptions -> add it to notifications
     *
     * @param state
     * @param commit
     * @param releases
     */
    checkReleasesForSubscription: ({state, commit}, releases) => {
      (state.subscriptions || []).forEach(subscription => {
        checkSubscription(releases, subscription).forEach(search => {

          // Get release object
          const release = search.item;

          // If no previous notification with this release id
          if (!state.items.hasOwnProperty(release.id)) {

            // Create notification item -> add notification data object to release item
            const notificationItem = AnilibriaNotificationTransformer.fetchItem(release);

            // Update notifications items
            commit('set', {k: 'items', v: {...state.items, [release.id]: notificationItem}})
          }
        })
      })
    },


    /**
     * Set release as notified
     *
     * @param commit
     * @param state
     * @param releaseId
     */
    setReleaseAsNotified: ({commit, state}, releaseId) => {
      if (__get(state, ['items', releaseId])) {
        commit('set', {k: ['items', releaseId, 'notification', 'isNotified'], v: true});
      }
    }


  }

}
