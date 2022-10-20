import {defineStore} from 'pinia'

// Proxy + Transformer
import ReleasesProxy from "@proxies/releases/ReleasesProxy";
import ReleasesTransformer from "@transformers/releases/ReleasesTransformer";

export const useLatestReleasesStore = defineStore('latestReleases', {
    state: () => ({
        items: [],
        isLoading: false,
        hashOfLatestRelease: null,
    }),
    persist: true,
    actions: {

        /**
         * Fetch latest releases
         *
         * @return {Promise}
         */
        async fetchLatestReleases() {
            try {

                this.isLoading = true;

                const response = await new ReleasesProxy().fetchLatestReleases();
                const latestReleases = (response?.data?.items || []).map(release => ReleasesTransformer.fetchRelease(release))

                this.items = latestReleases;

            } catch (e) {

                console.log(e);

            } finally {
                this.isLoading = false;
            }
        }


    }

})
