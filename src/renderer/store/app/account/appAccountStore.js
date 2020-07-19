// Proxy
import AccountProxy from "@proxies/account";

// Utils
import __get from 'lodash/get'
import {v4 as uuid} from 'uuid'

// Handlers
import {showAppError} from "@main/handlers/notifications/notificationsHandler";

const SET_USER_ID = 'SET_USER_ID';
const SET_SESSION = 'SET_SESSION';
const SET_PROFILE = 'SET_PROFILE';

export default {
  namespaced: true,
  state: {
    userId: null,
    session: null,
    profile: {
      id: null,
      login: null,
      avatar: null,
    }
  },

  getters: {

    /**
     * Check if user is authorized
     *
     * @param s
     * @return {boolean}
     */
    isAuthorized: s => !!(s.session !== null && s.profile.id !== null),

  },

  mutations: {

    /**
     * Set user id
     *
     * @param s
     * @param uuid
     * @return {*}
     */
    [SET_USER_ID]: (s, uuid) => s.userId = uuid,

    /**
     * Set session
     *
     * @param s
     * @param session
     * @return {*}
     */
    [SET_SESSION]: (s, session) => s.session = session,


    /**
     * Set profile data
     *
     * @param s
     * @param id
     * @param login
     * @param avatar
     */
    [SET_PROFILE]: (s, profile) => {
      s.profile.id = __get(profile, 'id') || null;
      s.profile.login = __get(profile, 'login') || null;
      s.profile.avatar = __get(profile, 'avatar') || null;
    }

  },

  actions: {


    /**
     * Try to login with provided credentials
     *
     * @param commit
     * @param dispatch
     * @param login
     * @param password
     * @return {Promise<void>}
     */
    login: async ({commit, dispatch}, {login, password}) => {
      try {

        // Reset session and profile
        await dispatch('setSession', null);
        await dispatch('setProfile', null);

        // Try to login with provided credentials
        return await new AccountProxy().login({login, password});

      } catch (error) {

        // Show app error
        // Throw error
        showAppError(error);
        throw error;

      }
    },


    /**
     * Logout user
     *
     * @param dispatch
     * @return {Promise<void>}
     */
    logout: async ({dispatch}) => {
      try {

        await new AccountProxy().logout();

      } catch (error) {

        // Show app error
        // Throw error
        // showAppError('Произошла ошибка при деавторизации пользователя');
        throw error;

      } finally {

        // Clear session
        // Clear profile data
        // Even if logout error
        // Reset session and profile
        await dispatch('setSession', null);
        await dispatch('setProfile', null);

      }
    },


    /**
     * Get profile data
     *
     * @return {Promise<*>}
     */
    getProfile: async ({dispatch}) => {
      try {

        // Create request to get profile data
        const profile = await new AccountProxy().getProfile();

        // Get profile data from response
        // Get profile avatar
        const id = __get(profile, 'id');
        const login = __get(profile, 'login');
        const avatar = new AccountProxy().getAvatarPath(__get(profile, 'avatar'));

        // Set profile data
        await dispatch('setProfile', {id, login, avatar});

      } catch (error) {

        // Reset session and profile on error
        // Reset session and profile
        await dispatch('setSession', null);
        await dispatch('setProfile', null);

        // Throw error
        throw error;
      }
    },

    /**
     * Set account id
     * Generate random uuid if not exists
     *
     * @param commit
     * @param state
     * @param uuid
     */
    setUserId: ({commit, state}) => {
      if (state.userId === null) commit(SET_USER_ID, uuid());
    },


    /**
     * Set session value
     *
     * @param commit
     * @param session
     * @return {*}
     */
    setSession: ({commit}, session = null) => commit(SET_SESSION, session || null),


    /**
     * Set profile data
     *
     * @param commit
     * @param profile
     * @return {*}
     */
    setProfile: ({commit}, profile = null) => commit(SET_PROFILE, profile || {})

  }
}
