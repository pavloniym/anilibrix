import {defineStore} from 'pinia'
import {useReleasesProxy} from "@proxies/releases/releasesProxy";

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

                const {latestReleases} = await useReleasesProxy().fetchLatestReleases();

                this.items = latestReleases;

            } catch (e) {

                console.log(e);

            } finally {
                this.isLoading = false;
            }
        }

    }

})
