// Mutations
const SET_HAS_ADS_MUTATION = 'SET_HAS_ADS_MUTATION';
const SET_SHOW_DEVTOOLS_MUTATION = 'SET_SHOW_DEVTOOLS_MUTATION';
const SET_HAS_MAXIMUM_ADS_MUTATION = 'SET_HAS_MAXIMUM_ADS_MUTATION';
const SET_CONNECTION_HOST_MUTATION = 'SET_CONNECTION_HOST_MUTATION';
const SET_HAS_AUTO_UPDATES_MUTATION = 'SET_HAS_AUTO_UPDATES_MUTATION';
const SET_HAS_NOTIFICATIONS_MUTATION = 'SET_HAS_NOTIFICATIONS_MUTATION';
const SET_AUTO_UPDATES_TIMEOUT_MUTATION = 'SET_AUTO_UPDATES_TIMEOUT_MUTATION';

// Actions
export const SET_HAS_ADS_ACTION = 'SET_HAS_ADS_ACTION';
export const SET_SHOW_DEVTOOLS_ACTION = 'SET_SHOW_DEVTOOLS_ACTION';
export const SET_HAS_MAXIMUM_ADS_ACTION = 'SET_HAS_MAXIMUM_ADS_ACTION';
export const SET_CONNECTION_HOST_ACTION = 'SET_CONNECTION_HOST_ACTION';
export const SET_HAS_AUTO_UPDATES_ACTION = 'SET_HAS_AUTO_UPDATES_ACTION';
export const SET_HAS_NOTIFICATIONS_ACTION = 'SET_HAS_NOTIFICATIONS_ACTION';
export const SET_AUTO_UPDATES_TIMEOUT_ACTION = 'SET_AUTO_UPDATES_TIMEOUT_ACTION';

export default {
    namespaced: true,
    state: {
        hasAds: true,
        showDevtools: false,
        hasMaximumAds: false,
        hasAutoUpdates: true,
        connectionHost: 'https://anilibrix.anilib.top',
        hasNotifications: true,
        autoUpdatesTimeout: 10,
    },

    mutations: {
        [SET_HAS_ADS_MUTATION]: (s, hasAds) => s.hasAds = hasAds === true,
        [SET_SHOW_DEVTOOLS_MUTATION]: (s, showDevtools) => s.showDevtools = showDevtools === true,
        [SET_HAS_MAXIMUM_ADS_MUTATION]: (s, hasMaximumAds) => s.hasMaximumAds = hasMaximumAds === true,
        [SET_CONNECTION_HOST_MUTATION]: (s, connectionHost) => s.connectionHost = connectionHost,
        [SET_HAS_AUTO_UPDATES_MUTATION]: (s, hasAutoUpdates) => s.hasAutoUpdates = hasAutoUpdates === true,
        [SET_HAS_NOTIFICATIONS_MUTATION]: (s, hasNotifications) => s.hasNotifications = hasNotifications === true,
        [SET_AUTO_UPDATES_TIMEOUT_MUTATION]: (s, autoUpdatesTimeout) => s.autoUpdatesTimeout = autoUpdatesTimeout,
    },

    actions: {
        [SET_HAS_ADS_ACTION]: ({commit}, hasAds) => commit(SET_HAS_ADS_MUTATION, hasAds),
        [SET_SHOW_DEVTOOLS_ACTION]: ({commit}, showDevtools) => commit(SET_SHOW_DEVTOOLS_MUTATION, showDevtools),
        [SET_HAS_MAXIMUM_ADS_ACTION]: ({commit}, isMaximumAds) => commit(SET_HAS_MAXIMUM_ADS_MUTATION, isMaximumAds),
        [SET_CONNECTION_HOST_ACTION]: ({commit}, connectionHost) => commit(SET_CONNECTION_HOST_MUTATION, connectionHost),
        [SET_HAS_AUTO_UPDATES_ACTION]: ({commit}, updatesAreEnabled) => commit(SET_HAS_AUTO_UPDATES_MUTATION, updatesAreEnabled),
        [SET_HAS_NOTIFICATIONS_ACTION]: ({commit}, hasNotifications) => commit(SET_HAS_NOTIFICATIONS_MUTATION, hasNotifications),
        [SET_AUTO_UPDATES_TIMEOUT_ACTION]: ({commit}, updatesTimeoutMinutes) => commit(SET_AUTO_UPDATES_TIMEOUT_MUTATION, updatesTimeoutMinutes),
    }
}
