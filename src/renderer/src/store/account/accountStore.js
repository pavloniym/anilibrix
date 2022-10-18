import {defineStore} from 'pinia'

// Proxies
import AccountProxy from "@proxies/account/AccountProxy";

export const useAccountStore = defineStore('account', {
    state: () => ({
        profile: {
            id: null,
            login: null,
            avatar: null,
        },
        sessionId: null,
        isLoading: false,
        credentials: {
            login: null,
            password: null,
        },
    }),
    persist: true,
    getters: {
        isAuthorized: state => state.sessionId !== null,
    },
    actions: {

        /**
         * Try to login
         *
         * @param login
         * @param password
         * @return {Promise}
         */
        async login({login, password}) {

            // Reset account
            this.sessionId = await new AccountProxy().login({login, password});

            // Save login and password
            this.credentials.login = login;
            this.credentials.password = password;

            // Fetch profile data from server
            await this.fetchProfile();
        },


        /**
         * Try to logout
         *
         * @return {Promise}
         */
        async logout() {
            if (this.sessionId !== null) {
                try {
                    this.isLoading = true;
                    await new AccountProxy().logout();
                } catch {
                    // Ignore errors
                } finally {
                    await this._resetState();
                }
            }
        },


        /**
         * Fetch profile
         * Try to fetch from session
         * Try to fetch from saved credentials
         *
         * @return {Promise}
         */
        async fetchProfile() {
            if (this.sessionId !== null) {
                try {
                    this.isLoading = true;
                    await this._fetchProfileOfSession();
                } catch {
                    try {
                        await this._fetchProfileOfCredentials()
                    } catch {
                        await this._resetState();
                    }
                } finally {
                    this.isLoading = false;
                }
            }
        },


        /**
         * Fetch profile of session
         *
         * @return {Promise}
         */
        async _fetchProfileOfSession() {

            // Make request to get profile of user
            const response = await new AccountProxy().getProfile();

            // Save profile details from response
            this.profile.id = response?.data?.id;
            this.profile.login = response?.data?.login;
            this.profile.avatar = response?.data?.avatar;
        },


        /**
         * Fetch profile of encrypted credentials
         *
         * @return {Promise}
         */
        async _fetchProfileOfCredentials() {

            // Fetch login and password
            const login = this.credentials.login;
            const password = this.credentials.password;

            // Make login request with credentials
            if (login !== null && password !== null) {
                return await this.login({login, password})
            }

            throw new Error;
        },


        /**
         * Reset account state to default
         *
         * @return {Promise}
         * @private
         */
        async _resetState() {
            this.sessionId = null;
            this.profile.id = null;
            this.profile.login = null;
            this.profile.avatar = null;
            this.credentials.login = null;
            this.credentials.password = null;
        }
    }
})
