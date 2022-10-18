import {defineStore} from 'pinia'

// Proxy + Transfer
import SearchProxy from "@proxies/search/SearchProxy";
import SearchTransformer from "@transformers/search/SearchTransformer";

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

                    // Make request
                    const searchResponse = await new SearchProxy().searchReleases({searchInput: this.searchInput});

                    // Transform releases
                    this.items = (searchResponse?.data || []).map(release => new SearchTransformer().fetchRelease(release));

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
