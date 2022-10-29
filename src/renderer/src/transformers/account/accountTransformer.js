import {useSettingsStore} from "@store/settings/settingsStore";

export function useAccountTransformer() {

    // Bindings
    const {applyToConnectionHost} = useSettingsStore();

    /**
     * Fetch account
     *
     * @param account
     * @return {{id: *, avatar: *, login: *}}
     */
    const fetchAccount = (account) => {
        return {
            id: account?.id,
            login: account?.login,
            avatar: applyToConnectionHost(account?.avatar),
        }
    }

    return {
        fetchAccount
    }
}
