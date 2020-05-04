import FirebaseWatchProxy from "@proxies/firebase/watch";
import FirebaseWatchTransformer from "@transformers/firebase/watch";

import __get from 'lodash/get'
import {mutationsHelper} from "@utils/store";

export default {
  namespaced: true,
  state: {
    items: {},
  },

  mutations: {
    ...mutationsHelper
  },


  getters: {

    /**
     * Get data for provided release and episode
     * @param state
     * @return {function({releaseId?: *, episodeId?: *}=): *|null}
     */
    getData: state => ({releaseId = 0, episodeId = 0} = {}) => __get(state, ['items', releaseId, episodeId]) || null,

  },

  actions: {


    /**
     * Get watch data from storage
     *
     * @param commit
     * @param rootState
     * @return {Promise<void>}
     */
    getWatchData: async ({commit, rootState}) => {
      if (0) {

        const userId = rootState.app.account.userId;
        try {

          FirebaseWatchTransformer
            .fetchCollection(
              await FirebaseWatchProxy.getWatchData({userId})
            )
            .forEach(watch => commit('set', {k: ['items', watch.releaseId, watch.episodeId], v: watch}))

        } catch (error) {

          // TODO: show error toast
          console.log(error);

          throw error;
        }

      }
    },


    /**
     * Set episode watch data
     *
     * @param commit
     * @param rootState
     * @param time
     * @param quality
     * @param releaseId
     * @param episodeId
     * @param percentage
     * @return {Promise<void>}
     */
    setWatchData: async ({commit, rootState}, {time = 0, quality = null, releaseId = null, episodeId = -1, percentage = 0} = {}) => {

      // Create episode watch data object
      const data = {time, quality, percentage, datetime: new Date()};
      const userId = rootState.app.account.userId;

      // If isSeen flag is true -> append it to data object
      // This is one-way flag, can't be reset by changing time and percentage
      if (percentage >= 85) data.isSeen = true;

      // Set local storage data
      commit('set', {k: `items.${releaseId}.${episodeId}`, v: data});

      try {

        // Send to firestore
        await FirebaseWatchProxy
          .setWatchData({data, userId, releaseId, episodeId});

      } catch (error) {

        // TODO: show error toast
        console.log(error);

        throw error;
      }
    }


  }
}
