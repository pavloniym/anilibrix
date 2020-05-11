import FirebaseWatchProxy from "@proxies/firebase/watch";
import FirebaseWatchTransformer from "@transformers/firebase/watch";

import Vue from 'vue'
import __get from 'lodash/get'
import __set from 'lodash/set'
import __merge from 'lodash/merge'

export default {
  namespaced: true,
  state: {
    items: {},
  },

  mutations: {

    /**
     * Merge data
     * Use Vue.set to save reactivity
     *
     * @param s
     * @param k
     * @param v
     * @return {Object}
     */
    merge: (s, {k, v}) => {

      // Create copy of items
      // Create value (merged with storage item)
      const items = {...s.items};
      const value = __merge(__get(items, k), v);

      // Set object data with provided key
      __set(items, k, value);

      // Set items and save reactivity
      Vue.set(s, 'items', items);
    },


    /**
     * Remove data
     *
     * @param s
     * @param k
     */
    remove: (s, k) => {

      // Create copy of items
      const items = {...s.items};

      // Remove object with provided key
      __set(items, k, undefined);

      // Set items and save reactivity
      Vue.set(s, 'items', items);
    },

  },


  getters: {

    /**
     * Get user id
     *
     * @param state
     * @param getters
     * @param rootState
     * @return {any}
     */
    userId: (state, getters, rootState) => rootState.app.account.userId,


    /**
     * Check if should user firebase
     *
     * @param state
     * @param getters
     * @param rootState
     * @return {any | boolean}
     */
    useFirebase: (state, getters, rootState) => rootState.app.settings.system.firebase.sync,


    /**
     * Get data for provided release and episode
     * @param state
     * @return {function({releaseId?: *, episodeId?: *}=): *|null}
     */
    getWatchData: state => ({releaseId = 0, episodeId = 0} = {}) => __get(state, ['items', releaseId, episodeId]) || null,

  },

  actions: {


    /**
     * Get watch data from storage
     *
     * @param commit
     * @param getters
     * @param dispatch
     * @return void
     */
    getWatchData: async ({commit, getters, dispatch}) => {
      if (getters.useFirebase === true) {
        try {

          FirebaseWatchTransformer
            .fetchCollection(await FirebaseWatchProxy.getWatchData({userId: getters.userId}))
            .forEach(watch => commit('merge', {k: `${watch.releaseId}.${watch.episodeId}`, v: watch}))

        } catch (error) {
          dispatch('app/setError', 'Произошла ошибка при загрузке данных о просмотренных релизах из облачного хранилища', {root: true});
          dispatch('app/setError', error, {root: true});
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
     * @param isSeen
     * @return {Promise<void>}
     */
    setWatchData: async ({commit, getters, dispatch}, {time = 0, quality = null, releaseId = null, episodeId = -1, percentage = 0} = {}) => {
      if (releaseId && episodeId > -1) {

        // Create episode watch data object
        const data = {time, quality, percentage, datetime: new Date()};

        // If isSeen flag is true -> append it to data object
        // This is one-way flag, can't be reset by changing time and percentage
        if (percentage >= 85) data.isSeen = true;

        // Set local storage data
        commit('merge', {k: `${releaseId}.${episodeId}`, v: data});

        // Sync with use firebase
        if (getters.useFirebase === true) {
          try {

            // Send to firestore
            await FirebaseWatchProxy.setWatchData({data, userId: getters.userId, releaseId, episodeId});

          } catch (error) {
            dispatch('app/setError', 'Произошла ошибка при сохранении данных в облачном хранилище', {root: true});
            dispatch('app/setError', error, {root: true});
          }
        }

      }
    },


    /**
     * Set watch package data
     *
     * @param dispatch
     * @param getters
     * @param releaseId
     * @param episodes
     * @return {Promise<void>}
     */
    setWatchPackageData: async ({dispatch, getters}, {releaseId = null, episodes = []} = {}) => {
      if (releaseId && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {

            const episodeId = episode.id;
            const watchData = getters.getWatchData({releaseId, episodeId});

            // Check if episode is not marked as seen
            if (!watchData || watchData.isSeen !== true) {
              dispatch('setWatchData', {releaseId, episodeId, percentage: 100})
            }

          })
        );
      }
    },


    /**
     * Remove watch data
     *
     * @param commit
     * @param getters
     * @param dispatch
     * @param releaseId
     * @param episodeId
     * @return {Promise<void>}
     */
    removeWatchData: async ({commit, getters, dispatch}, {releaseId = null, episodeId = -1} = {}) => {
      if (releaseId && episodeId > -1) {

        // Remove from local storage
        commit('remove', `${releaseId}.${episodeId}`);

        // Sync with use firebase
        if (getters.useFirebase === true) {
          try {

            // Send to firestore
            await FirebaseWatchProxy.removeWatchData({userId: getters.userId, releaseId, episodeId});

          } catch (error) {
            dispatch('app/setError', 'Произошла ошибка во время удаления данных из облачного хранилища', {root: true});
            dispatch('app/setError', error, {root: true});
          }
        }
      }
    },


    /**
     * Remove watch package data
     *
     * @param dispatch
     * @param getters
     * @param releaseId
     * @param episodes
     * @return {Promise<void>}
     */
    removeWatchPackageData: async ({dispatch, getters}, {releaseId = null, episodes = []} = {}) => {
      if (releaseId && episodes && episodes.length > 0) {
        await Promise.allSettled(
          episodes.map(episode => {
            dispatch('removeWatchData', {releaseId, episodeId: episode.id})
          })
        );
      }
    },

  },
}
