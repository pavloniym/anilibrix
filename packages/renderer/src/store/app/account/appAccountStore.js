import {defineStore} from 'pinia'

export const useAppAccountStore = defineStore('app.account', {
    state: () => ({
        session: null,
        profile: {
            id: null,
            login: null,
            avatar: null,
        },
        isLoading: false,
    }),
    getters: {
        isAuthorized: state => state.session !== null && state.profile?.id !== null,
    }
})
