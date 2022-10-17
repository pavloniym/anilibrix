import {defineStore} from 'pinia'

// Proxy + Transformer
import ReleasesProxy from "@proxies/releases/ReleasesProxy";
import ReleaseTransformer from "@transformers/releases/ReleaseTransformer";

export const useLatestReleasesStore = defineStore('latestReleases', {

    state: () => ({
        items: [],
        isLoading: false,
        hashOfLatestRelease: null,
    }),

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
                const latestReleases = (response?.data?.items || []).map(release => ReleaseTransformer.fetchRelease(release))

                this.items = latestReleases;

            } catch (e) {

                console.log(e);

            } finally {
                this.isLoading = false;
            }
        }


    }

})
