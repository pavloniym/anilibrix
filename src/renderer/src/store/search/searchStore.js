import {defineStore} from 'pinia'

// Proxy + Transfer
import SearchProxy from "@proxies/search/SearchProxy";
import SearchTransformer from "@transformers/search/SearchTransformer";

export const useSearchStore = defineStore('search', {
    state: () => ({
        items: [],
        isLoading: false,
        searchInput: null,
        abortController: null,
    }),
    actions: {

        /**
         * Search releases
         *
         * @return {Promise}
         */
        async searchReleases() {
            try {

                this.isLoading = true;

                // Cancel previous request if it was stored
                // Create new request token if exists
                //if (REQUEST_FOR_SEARCH) REQUEST_FOR_SEARCH.cancel();
                //REQUEST_FOR_SEARCH = axios.CancelToken.source();

                // Get releases
                const abortController = new AbortController();

                const searchResponse = await new SearchProxy()
                    .searchReleases({searchInput: this.searchInput});

                // Transform releases
                this.items = (searchResponse?.data || []).map(release => new SearchTransformer().fetchRelease(release));
                this.abortController = abortController;

            } catch (error) {

                console.log(error);
                /*if (!axios.isCancel(error)) {
                    // Show app error
                    // Return empty array
                    showAppError('Произошла ошибка при поиске релизов');
                    return [];
                }*/

            } finally {
                this.isLoading = false;
            }
        }


    }
})
