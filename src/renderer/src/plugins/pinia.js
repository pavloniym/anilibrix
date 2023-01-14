import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'

// Create pinia state
const pinia = createPinia();

// Apply pinia plugins
pinia.use(createPersistedState())


export default pinia
