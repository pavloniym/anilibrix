import watch from './watch/appWatchStore'
import account from './account/appAccountStore'
import settings from './settings/appSettingsStore'

export default {
    namespaced: true,
    modules: {
        watch,
        account,
        settings
    },
}
