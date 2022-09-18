// Proxy
import AccountProxy from '@proxies/account';

// Utils
import {v4 as uuid} from 'uuid'

// Notifications
import {showAppError} from '@main/handlers/notifications/notificationsHandler';

// Encrypted storage
import {saveToEncryptedStorage, fetchFromEncryptedStorage, removeFromEncryptedStorage} from '@main/utils/storage/encryptedStorage'

// Mutations
export const SET_USER_ID_MUTATION = 'SET_USER_ID_MUTATION';
export const SET_SESSION_MUTATION = 'SET_SESSION_MUTATION';
export const SET_PROFILE_MUTATION = 'SET_PROFILE_MUTATION';
export const SET_PROFILE_IS_LOADING_MUTATION = 'SET_PROFILE_IS_LOADING_MUTATION';

// Actions
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const FETCH_PROFILE_ACTION = 'FETCH_PROFILE_ACTION';
export const FETCH_PROFILE_OF_SESSION_ACTION = 'FETCH_PROFILE_OF_SESSION_ACTION'
export const FETCH_PROFILE_OF_ENCRYPTED_CREDENTIALS_ACTION = 'FETCH_PROFILE_OF_ENCRYPTED_CREDENTIALS_ACTION';

export default {
    namespaced: true,
    state: {
        userId: null,
        session: null,
        profile: {
            id: null,
            login: null,
            avatar: null,
            isLoading: false,
        }
    },

    getters: {

        /**
         * Check if user is authorized
         *
         * @param s
         * @return {boolean}
         */
        isAuthorized: s => !!(s.session !== null && s.profile.id !== null)

    },

    mutations: {

        /**
         * Set user id
         *
         * @param s
         * @param uuid
         * @return {*}
         */
        [SET_SESSION_MUTATION]: (s, session) => s.session = session,

        /**
         * Set session
         *
         * @param s
         * @param session
         * @return {*}
         */
        [SET_USER_ID_MUTATION]: (s, userId = null) => s.userId = userId || uuid(),

        /**
         * Set profile data
         *
         * @param s
         * @param id
         * @param login
         * @param avatar
         */
        [SET_PROFILE_MUTATION]: (s, profile) => {
            s.profile.id = profile?.id || null;
            s.profile.login = profile?.login || null;
            s.profile.avatar = profile?.avatar || null;
        },


        /**
         * Set profile is loading mutation
         *
         * @param s
         * @param isLoading
         * @return {boolean}
         */
        [SET_PROFILE_IS_LOADING_MUTATION]: (s, isLoading = false) => s.profile.isLoading = isLoading === true,

    },

    actions: {

        /**
         * Try to authorize with provided credentials
         *
         * @param commit
         * @param dispatch
         * @param login
         * @param password
         * @return {Promise<void>}
         */
        [LOGIN_ACTION]: async ({commit, dispatch}, {login, password}) => {
            try {

                // Reset session and profile
                commit(SET_SESSION_MUTATION, null);
                commit(SET_PROFILE_MUTATION, null);

                // Try to authorize with provided credentials
                const session = await new AccountProxy().login({login, password});

                // Save login and password in encrypted storage
                await saveToEncryptedStorage({key: 'user.login', value: login});
                await saveToEncryptedStorage({key: 'user.password', value: password});

                // Set new session to store
                commit(SET_SESSION_MUTATION, session);

                // Fetch profile data from server
                await dispatch(FETCH_PROFILE_OF_SESSION_ACTION);

            } catch (error) {

                // Show app error
                showAppError(error);

                // Throw error
                throw error;
            }
        },


        /**
         * Logout user
         *
         * @param dispatch
         * @return {Promise<void>}
         */
        [LOGOUT_ACTION]: async ({commit}) => {
            try {

                await new AccountProxy().logout();

            } catch (error) {

                // Show app error
                // Throw error
                throw error;

            } finally {

                // Even if logout error
                // Reset session and profile
                commit(SET_SESSION_MUTATION, null);
                commit(SET_PROFILE_MUTATION, null);

                // Remove user credentials from encrypted storage
                removeFromEncryptedStorage('user.login')
                removeFromEncryptedStorage('user.password')

            }
        },


        /**
         * Fetch profile from server
         *
         * @param dispatch
         * @return {Promise<void>}
         */
        [FETCH_PROFILE_ACTION]: async ({state, commit, dispatch}) => {
            if (state?.session !== null) {
                try {

                    // Set profile is loading
                    commit(SET_PROFILE_IS_LOADING_MUTATION, true);

                    // Try to fetch profile from server
                    await dispatch(FETCH_PROFILE_OF_SESSION_ACTION);

                } catch (error) {

                    try {

                        // Try to fetch profile from server
                        await dispatch(FETCH_PROFILE_OF_ENCRYPTED_CREDENTIALS_ACTION);

                    } catch {

                        // Reset session and profile on error
                        // Reset session and profile
                        commit(SET_SESSION_MUTATION, null);
                        commit(SET_PROFILE_MUTATION, null);

                        // Throw error
                        throw error;
                    }

                } finally {

                    // Reset profile is loading
                    commit(SET_PROFILE_IS_LOADING_MUTATION, false);

                }
            }
        },


        /**
         * Get profile data of saved session after login
         *
         * @return {Promise<*>}
         */
        [FETCH_PROFILE_OF_SESSION_ACTION]: async ({commit}) => {

            // Create request to get profile data
            const profile = await new AccountProxy().getProfile();

            // Get profile data from response
            // Get profile avatar
            const id = profile?.id;
            const login = profile?.login;
            const avatar = new AccountProxy().getAvatarPath(profile?.avatar);

            // Set profile data
            commit(SET_PROFILE_MUTATION, {id, login, avatar})

        },


        /**
         * Fetch profile data of encrypted credentials
         *
         * @param commit
         * @param dispatch
         * @return {Promise<void>}
         */
        [FETCH_PROFILE_OF_ENCRYPTED_CREDENTIALS_ACTION]: async ({commit, dispatch}) => {

            // Fetch login and password from encrypted storage
            const login = fetchFromEncryptedStorage('user.login')
            const password = fetchFromEncryptedStorage('user.password')

            // Make login request with credentials from encrypted storage
            if (login !== null && password !== null) {
                await dispatch(LOGIN_ACTION, {login, password})

            } else {
                throw new Error;
            }
        }

    }
}
