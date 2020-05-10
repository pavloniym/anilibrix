import AnilibriaProxy from '@proxies/anilibria'
import AnilibriaReleaseTransformer from '@transformers/anilibria/release'

import {generalMutations as mutations} from '@utils/store/mutations'

export default {
  namespaced: true,
  state: {
    data: [],
    index: null,
    loading: false,
    datetime: null,
  },

  mutations,
  actions: {

    /**
     * Set slider index
     *
     * @param commit
     * @param index
     * @return {*}
     */
    setIndex: ({commit}, index) => commit('set', {k: 'index', v: index}),


    /**
     * Get latest releases
     *
     * @param state
     * @param commit
     * @param dispatch
     * @return {Promise<any>}
     */
    getReleases: async ({commit, dispatch}) => {
      commit('set', {k: 'loading', v: true});

      try {

        // Get releases
        const data = await new AnilibriaProxy().getReleases();
        let releases = await AnilibriaReleaseTransformer.fetchCollection(data.items);

        // Get posters
        const posters = await dispatch('_getPosters', {releases});

        // Sort releases from newest to oldest
        releases = releases.sort((a, b) => new Date(b.datetime.system) - new Date(a.datetime.system));

        // Set release posters
        posters
          .map(poster => poster.value || null)
          .filter(poster => poster)
          .forEach(poster => {
            const release = releases.find(release => release.id === poster.releaseId);
            if (release) {
              release.poster.image = poster.image;
            }
          });

        // Commit releases
        // Set update datetime
        commit('set', {k: 'data', v: releases});
        commit('set', {k: 'datetime', v: new Date()});

        // Get updates
        // Send them to notification store
        /*.then(() =>
          state.data
            .filter(release =>
              state.datetime
                ? new Date(release.datetime.system) > state.datetime
                : false
            )
            .forEach(release => dispatch('notifications/addRelease', release, {root: true}))
        )*/

      } catch (error) {
        dispatch('app/setError', 'Произошла ошибка при загрузке релизов', {root: true});
        dispatch('app/setError', error, {root: true});
      }

      commit('set', {k: 'loading', v: false});
    },


    /**
     * Update releases posters
     *
     * @param commit
     * @param state
     * @param dispatch
     * @param releases
     * @return Promise
     */
    _getPosters: async ({commit, state, dispatch}, {releases = []} = {}) => {
      return await Promise.allSettled(
        releases
          .filter(release => release.poster.path)
          .map(async release => {
              try {

                return await new AnilibriaProxy()
                  .getPoster({src: release.poster.path})
                  .then(image => ({image: `data:image/jpeg;base64,${image}`, releaseId: release.id}));

              } catch (error) {
                dispatch('app/setError', `Произошла ошибка при загрузке постера к релизу ${release.id}`, {root: true});
              }
            }
          )
      );
    }
  }
}
