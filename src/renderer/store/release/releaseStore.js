import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import axios from "axios";
import {Main} from '@main/utils/windows'

let REQUEST = null;

const SET_RELEASE_DATA = 'SET_RELEASE_DATA';
const SET_RELEASE_LOADING = 'SET_RELEASE_LOADING';
const SET_RELEASE_POSTER_IMAGE = 'SET_RELEASE_POSTER_IMAGE';

export default {
  namespaced: true,
  state: {
    data: null,
    request: null,
    loading: false
  },

  mutations: {

    /**
     * Set release data
     *
     * @param s
     * @param data
     * @return {*}
     */
    [SET_RELEASE_DATA]: (s, data) => s.data = data,

    /**
     * Set loading state
     *
     * @param s
     * @param loading
     * @return {*}
     */
    [SET_RELEASE_LOADING]: (s, loading) => s.loading = loading,

    /**
     * Set release poster image
     *
     * @param s
     * @param image
     * @return {*}
     */
    [SET_RELEASE_POSTER_IMAGE]: (s, image) => s.data.poster.image = image,

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
      if (REQUEST !== null) REQUEST.cancel();

      // Reset data
      // Set loading state
      commit(SET_RELEASE_DATA, null);
      commit(SET_RELEASE_LOADING, true);

      // Save request token
      REQUEST = axios.CancelToken.source();

      try {

        // Get release data
        const data = await new AnilibriaProxy().getRelease(releaseId, {cancelToken: REQUEST.token});
        const release = await AnilibriaReleaseTransformer.fetchItem(data);
        const image = await new AnilibriaProxy().getPoster({src: release.poster.path});

        // Save release data
        commit(SET_RELEASE_DATA, release);
        commit(SET_RELEASE_POSTER_IMAGE, image);

      } catch (error) {
        if (!axios.isCancel(error)) {

          Main.sendToWindow('app:error', 'Произошла ошибка при загрузке релиза');
          Main.sendToWindow('app:error', error);

        }
      } finally {

        commit(SET_RELEASE_LOADING, false);

      }
    }

  }
}
