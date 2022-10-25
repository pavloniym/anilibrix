import {defineStore} from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        hasAds: true,
        welcomeView: null,
        showDevtools: false,
        hasMaximumAds: false,
        playerQuality: '480',
        episodesOrder: 'asc',
        hasAutoUpdates: true,
        connectionHost: 'https://anilibrix.anilib.top',
        searchInSettings: null,
        hasNotifications: true,
        autoUpdatesTimeout: 10,
        videoBufferSeconds: 300,
        settingsAreVisible: false,
        autoplayNextEpisode: true,
        manualOpeningSkipButton: true,
        manualOpeningSkipSeconds: 90,
    }),
    persist: true,
    actions: {


        /**
         * Apply to connection host
         *
         * @param url
         * @return {string|null}
         */
        applyToConnectionHost(url) {
            if (url) {

                const finalUrl = url?.startsWith('/') ? url?.slice(1, url.length) : url;
                const finalHost = this.connectionHost.endsWith('/') ? this.connectionHost.slice(0, -1) : this.connectionHost;

                return `${finalHost}/${finalUrl}`;
            }

            return null;
        }


    }
})
