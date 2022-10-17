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
    }),
    getters: {
        isAuthorized: state => state.sessionId !== null,
    },
    actions: {

        /**
         * Try to login
         *
         * @param login
         * @param password
         * @return {Promise<void>}
         */
        async login({login, password}) {

            // Reset account
            this.sessionId = await new AccountProxy().login({login, password});

            // Save login and password in encrypted storage
            //await saveToEncryptedStorage({key: 'user.login', value: login});
            //await saveToEncryptedStorage({key: 'user.password', value: password});

            // Fetch profile data from server
            await this.fetchProfile();
        },


        async logout() {
            if (this.sessionId !== null) {
                try {

                    this.isLoading = true;
                    await new AccountProxy().logout();

                } catch {

                    // Ignore errors

                } finally {
                    this.isLoading = false;
                    this.sessionId = null;
                    this.profile.id = null;
                    this.profile.login = null;
                    this.profile.avatar = null;
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
                    this._fetchProfileOfSession()
                        .catch(this._fetchProfileOfSession)
                        .catch(() => {
                            this.sessionId = null;
                            this.profile.id = null;
                            this.profile.login = null;
                            this.profile.avatar = null;
                        })
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
            const {data} = await new AccountProxy().getProfile();

            // Save profile details from response
            this.profile.id = data?.id;
            this.profile.login = data?.login;
            this.profile.avatar = data?.avatar;
        },


        /**
         * Fetch profile of encrypted credentials
         *
         * @return {Promise}
         */
        async _fetchProfileOfEncryptedCredentials() {

            // Fetch login and password from encrypted storage
            const login = null; //fetchFromEncryptedStorage('user.login')
            const password = null; //fetchFromEncryptedStorage('user.password')

            // Make login request with credentials from encrypted storage
            if (login !== null && password !== null) {
                return await this.login({login, password})
            }

            throw new Error;
        },
    }
})
