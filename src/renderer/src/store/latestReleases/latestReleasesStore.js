import {defineStore} from 'pinia'
import {useReleasesProxy} from "@proxies/releases/releasesProxy";

export const useLatestReleasesStore = defineStore('latestReleases', {
    state: () => ({
        items: [],
        isLoading: false,
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


                this.items = await useReleasesProxy().fetchLatestReleases();

            } catch (e) {

                console.log(e);

            } finally {
                this.isLoading = false;
            }
        }

    }

})
