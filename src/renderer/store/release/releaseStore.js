import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import axios from "axios";
import {generalMutations} from "@utils/store/mutations";

export default {
  namespaced: true,
  state: {
    data: null,
    request: null,
    loading: false
  },

  mutations: {
    ...generalMutations
  },

  actions: {


    /**
     * Get release data
     * Also get release poster
     *
     * @param commit
     * @param dispatch
     * @param state
     * @param releaseId
     * @return {Promise<unknown>}
     */
    getRelease: async ({commit, dispatch, state}, releaseId) => {

      // Cancel previous request if it was stored
      if (state.request !== null) state.request.cancel();

      // Reset data
      // Set loading state
      // Save request token
      commit('set', {k: 'data', v: null});
      commit('set', {k: 'loading', v: true});
      commit('set', {k: 'request', v: axios.CancelToken.source()});

      try {

        // Get release data
        const data = await new AnilibriaProxy().getRelease(releaseId, {cancelToken: state.request.token});
        const release = await AnilibriaReleaseTransformer.fetchItem(data);
        const image = await dispatch('_getPoster', release) || null;

        // Save release data
        commit('set', {k: 'data', v: release});
        commit('set', {k: 'data.poster.image', v: image});

      } catch (error) {

        dispatch('app/setError', 'Произошла ошибка при загрузке релиза', {root: true});
        dispatch('app/setError', error, {root: true});

      }

      // Reset loading state
      commit('set', {k: 'loading', v: false});
    },


    /**
     * Get release poster
     *
     * @param dispatch
     * @param release
     * @return Promise
     */
    _getPoster: async ({dispatch}, release) => {
      if (release && release.poster.path) {
        try {

          return await new AnilibriaProxy()
            .getPoster({src: release.poster.path})
            .then(image => image ? `data:image/jpeg;base64,${image}` : null);

        } catch (error) {
          dispatch('app/setError', `Произошла ошибка при загрузке постера к релизу ${release.id}`, {root: true});
        }
      }
    }

  }
}
