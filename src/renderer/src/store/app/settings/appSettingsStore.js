import {defineStore} from 'pinia'

export const useAppSettingsStore = defineStore('app.settings', {
    state: () => ({
        hasAds: true,
        welcomeView: null,
        showDevtools: false,
        hasMaximumAds: false,
        playerQuality: null,
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
    actions: {


        /**
         * Apply to connection host
         *
         * @param url
         * @return {string}
         */
        applyToConnectionHost(url) {
            const finalUrl = url?.startsWith('/') ? url?.slice(1, url.length) : url;
            const finalHost = this.connectionHost.endsWith('/') ? this.connectionHost.slice(0, -1) : this.connectionHost;

            return `${finalHost}/${finalUrl}`;
        }



    }
})
