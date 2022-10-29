import {defineStore} from 'pinia'
import {useSearchProxy} from "@proxies/search/searchProxy";

export const useSearchStore = defineStore('search', {
    state: () => ({
        items: [],
        isLoading: false,
        searchInput: null,
    }),
    persist: true,
    actions: {

        /**
         * Search releases
         *
         * @return {Promise}
         */
        async searchReleases() {
            this.items = [];
            if (this.searchInput?.length >= 3) {
                try {

                    this.isLoading = true;
                    this.items = (await useSearchProxy().searchReleases({searchInput: this.searchInput}))?.searchedReleases;

                } catch (error) {

                    // Emit error
                    throw error;

                } finally {
                    this.isLoading = false;
                }
            }
        }

    }
})
