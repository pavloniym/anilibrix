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
    })
})
