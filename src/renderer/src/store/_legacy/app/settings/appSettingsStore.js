
// Mutations
const SET_HAS_ADS_MUTATION = 'SET_HAS_ADS_MUTATION';
const SET_WELCOME_VIEW_MUTATION = 'SET_WELCOME_VIEW_MUTATION';
const SET_SHOW_DEVTOOLS_MUTATION = 'SET_SHOW_DEVTOOLS_MUTATION';
const SET_EPISODES_ORDER_MUTATION = 'SET_EPISODES_ORDER_MUTATION';
const SET_PLAYER_QUALITY_MUTATION = 'SET_PLAYER_QUALITY_MUTATION'
const SET_HAS_MAXIMUM_ADS_MUTATION = 'SET_HAS_MAXIMUM_ADS_MUTATION';
const SET_CONNECTION_HOST_MUTATION = 'SET_CONNECTION_HOST_MUTATION';
const SET_HAS_AUTO_UPDATES_MUTATION = 'SET_HAS_AUTO_UPDATES_MUTATION';
const SET_HAS_NOTIFICATIONS_MUTATION = 'SET_HAS_NOTIFICATIONS_MUTATION';
const SET_SEARCH_IN_SETTINGS_MUTATION = 'SET_SEARCH_IN_SETTINGS_MUTATION';
const SET_AUTO_UPDATES_TIMEOUT_MUTATION = 'SET_AUTO_UPDATES_TIMEOUT_MUTATION';
const SET_VIDEO_BUFFER_SECONDS_MUTATION = 'SET_VIDEO_BUFFER_SECONDS_MUTATION';
const SET_SETTINGS_ARE_VISIBLE_MUTATION = 'SET_SETTINGS_ARE_VISIBLE_MUTATION';
const SET_AUTOPLAY_NEXT_EPISODE_MUTATION = 'SET_AUTOPLAY_NEXT_EPISODE_MUTATION';
const SET_MANUAL_OPENING_SKIP_BUTTON_MUTATION = 'SET_MANUAL_OPENING_SKIP_BUTTON_MUTATION';
const SET_MANUAL_OPENING_SKIP_SECONDS_MUTATION = 'SET_MANUAL_OPENING_SKIP_SECONDS_MUTATION';

// Actions
export const SET_HAS_ADS_ACTION = 'SET_HAS_ADS_ACTION';
export const SET_WELCOME_VIEW_ACTION = 'SET_WELCOME_VIEW_ACTION';
export const SET_SHOW_DEVTOOLS_ACTION = 'SET_SHOW_DEVTOOLS_ACTION';
export const SET_EPISODES_ORDER_ACTION = 'SET_EPISODES_ORDER_ACTION';
export const SET_PLAYER_QUALITY_ACTION = 'SET_PLAYER_QUALITY_ACTION';
export const SET_HAS_MAXIMUM_ADS_ACTION = 'SET_HAS_MAXIMUM_ADS_ACTION';
export const SET_CONNECTION_HOST_ACTION = 'SET_CONNECTION_HOST_ACTION';
export const SET_HAS_AUTO_UPDATES_ACTION = 'SET_HAS_AUTO_UPDATES_ACTION';
export const SET_HAS_NOTIFICATIONS_ACTION = 'SET_HAS_NOTIFICATIONS_ACTION';
export const SET_SEARCH_IN_SETTINGS_ACTION = 'SET_SEARCH_IN_SETTINGS_ACTION';
export const SET_AUTO_UPDATES_TIMEOUT_ACTION = 'SET_AUTO_UPDATES_TIMEOUT_ACTION';
export const SET_VIDEO_BUFFER_SECONDS_ACTION = 'SET_VIDEO_BUFFER_SECONDS_ACTION';
export const SET_SETTINGS_ARE_VISIBLE_ACTION = 'SET_SETTINGS_ARE_VISIBLE_ACTION';
export const SET_AUTOPLAY_NEXT_EPISODE_ACTION = 'SET_AUTOPLAY_NEXT_EPISODE_ACTION';
export const SET_MANUAL_OPENING_SKIP_BUTTON_ACTION = 'SET_MANUAL_OPENING_SKIP_BUTTON_ACTION';
export const SET_MANUAL_OPENING_SKIP_SECONDS_ACTION = 'SET_MANUAL_OPENING_SKIP_SECONDS_ACTION';

export default {
    namespaced: true,
    state: {
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
    },

    mutations: {
        [SET_HAS_ADS_MUTATION]: (s, hasAds) => s.hasAds = hasAds === true,
        [SET_WELCOME_VIEW_MUTATION]: (s, welcomeView) => s.welcomeView = welcomeView,
        [SET_SHOW_DEVTOOLS_MUTATION]: (s, showDevtools) => s.showDevtools = showDevtools === true,
        [SET_PLAYER_QUALITY_MUTATION]: (s, playerQuality) => s.playerQuality = playerQuality,
        [SET_EPISODES_ORDER_MUTATION]: (s, episodesOrder) => s.episodesOrder = episodesOrder || 'asc',
        [SET_HAS_MAXIMUM_ADS_MUTATION]: (s, hasMaximumAds) => s.hasMaximumAds = hasMaximumAds === true,
        [SET_CONNECTION_HOST_MUTATION]: (s, connectionHost) => s.connectionHost = connectionHost,
        [SET_HAS_AUTO_UPDATES_MUTATION]: (s, hasAutoUpdates) => s.hasAutoUpdates = hasAutoUpdates === true,
        [SET_HAS_NOTIFICATIONS_MUTATION]: (s, hasNotifications) => s.hasNotifications = hasNotifications === true,
        [SET_SEARCH_IN_SETTINGS_MUTATION]: (s, searchInSettings) => s.searchInSettings = searchInSettings,
        [SET_AUTO_UPDATES_TIMEOUT_MUTATION]: (s, autoUpdatesTimeout) => s.autoUpdatesTimeout = autoUpdatesTimeout,
        [SET_VIDEO_BUFFER_SECONDS_MUTATION]: (s, videoBufferSeconds) => s.videoBufferSeconds = videoBufferSeconds || 300,
        [SET_SETTINGS_ARE_VISIBLE_MUTATION]: (s, settingsAreVisible) => s.settingsAreVisible = settingsAreVisible === true,
        [SET_AUTOPLAY_NEXT_EPISODE_MUTATION]: (s, autoplayNextEpisode) => s.autoplayNextEpisode = autoplayNextEpisode === true,
        [SET_MANUAL_OPENING_SKIP_BUTTON_MUTATION]: (s, manualOpeningSkipButton) => s.manualOpeningSkipButton = manualOpeningSkipButton === true,
        [SET_MANUAL_OPENING_SKIP_SECONDS_MUTATION]: (s, manualOpeningSkipSeconds) => s.manualOpeningSkipSeconds = manualOpeningSkipSeconds || 90,
    },

    actions: {
        [SET_HAS_ADS_ACTION]: ({commit}, hasAds) => commit(SET_HAS_ADS_MUTATION, hasAds),
        [SET_WELCOME_VIEW_ACTION]: ({commit}, welcomeView) => commit(SET_WELCOME_VIEW_MUTATION, welcomeView),
        [SET_SHOW_DEVTOOLS_ACTION]: ({commit}, showDevtools) => commit(SET_SHOW_DEVTOOLS_MUTATION, showDevtools),
        [SET_PLAYER_QUALITY_ACTION]: ({commit}, playerQuality) => commit(SET_PLAYER_QUALITY_MUTATION, playerQuality),
        [SET_EPISODES_ORDER_ACTION]: ({commit}, episodesOrder) => commit(SET_EPISODES_ORDER_MUTATION, episodesOrder),
        [SET_HAS_MAXIMUM_ADS_ACTION]: ({commit}, isMaximumAds) => commit(SET_HAS_MAXIMUM_ADS_MUTATION, isMaximumAds),
        [SET_CONNECTION_HOST_ACTION]: ({commit}, connectionHost) => commit(SET_CONNECTION_HOST_MUTATION, connectionHost),
        [SET_HAS_AUTO_UPDATES_ACTION]: ({commit}, updatesAreEnabled) => commit(SET_HAS_AUTO_UPDATES_MUTATION, updatesAreEnabled),
        [SET_HAS_NOTIFICATIONS_ACTION]: ({commit}, hasNotifications) => commit(SET_HAS_NOTIFICATIONS_MUTATION, hasNotifications),
        [SET_SEARCH_IN_SETTINGS_ACTION]: ({commit}, searchInSettings) => commit(SET_SEARCH_IN_SETTINGS_MUTATION, searchInSettings),
        [SET_AUTO_UPDATES_TIMEOUT_ACTION]: ({commit}, updatesTimeoutMinutes) => commit(SET_AUTO_UPDATES_TIMEOUT_MUTATION, updatesTimeoutMinutes),
        [SET_VIDEO_BUFFER_SECONDS_ACTION]: ({commit}, videoBufferSeconds) => commit(SET_VIDEO_BUFFER_SECONDS_MUTATION, videoBufferSeconds),
        [SET_SETTINGS_ARE_VISIBLE_ACTION]: ({commit}, settingsAreVisible) => commit(SET_SETTINGS_ARE_VISIBLE_MUTATION, settingsAreVisible),
        [SET_AUTOPLAY_NEXT_EPISODE_ACTION]: ({commit}, autoplayNextEpisode) => commit(SET_AUTOPLAY_NEXT_EPISODE_MUTATION, autoplayNextEpisode),
        [SET_MANUAL_OPENING_SKIP_BUTTON_ACTION]: ({commit}, manualOpeningSkipButton) => commit(SET_MANUAL_OPENING_SKIP_BUTTON_MUTATION, manualOpeningSkipButton),
        [SET_MANUAL_OPENING_SKIP_SECONDS_ACTION]: ({commit}, manualOpeningSkipSeconds) => commit(SET_MANUAL_OPENING_SKIP_SECONDS_MUTATION, manualOpeningSkipSeconds),
    }
}
