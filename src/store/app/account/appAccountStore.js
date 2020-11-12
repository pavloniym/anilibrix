// Proxy
import AccountProxy from "@proxies/account";

// Utils
import __get from 'lodash/get'
import {v4 as uuid} from 'uuid'

// Getters
export const IS_AUTHORIZED_GETTER = 'IS_AUTHORIZED_GETTER';

// Mutations
export const SET_SESSION_MUTATION = 'SET_SESSION';
export const SET_PROFILE_MUTATION = 'SET_PROFILE';
export const SET_USERS_ID_MUTATION = 'SET_USER_ID';

// Actions
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const GET_PROFILE_ACTION = 'GET_PROFILE_ACTION';
export const SET_USERS_ID_ACTION = 'SET_USER_ID_ACTION';

export default {
  namespaced: true,
  state: {
    session: null,
    profile: {
      id: null,
      login: null,
      avatar: null,
    },
    users_id: null
  },

  getters: {

    /**
     * Check if user is authorized
     *
     * @param s
     * @return {boolean}
     */
    [IS_AUTHORIZED_GETTER]: s => s.profile.id !== null,

  },

  mutations: {

    /**
     * Set users id
     *
     * @param s
     * @param uuid
     * @return {*}
     */
    [SET_USERS_ID_MUTATION]: (s, uuid) => s.users_id = uuid,

    /**
     * Set session
     *
     * @param s
     * @param session
     * @return {*}
     */
    [SET_SESSION_MUTATION]: (s, session) => s.session = session,


    /**
     * Set profile data
     *
     * @param s
     * @param id
     * @param login
     * @param avatar
     */
    [SET_PROFILE_MUTATION]: (s, profile) => {
      s.profile.id = __get(profile, 'id') || null;
      s.profile.login = __get(profile, 'login') || null;
      s.profile.avatar = __get(profile, 'avatar') || null;
    }

  },

  actions: {


    /**
     * Try to login with provided credentials
     *
     * @param dispatch
     * @param login
     * @param password
     * @return {Promise<void>}
     */
    [LOGIN_ACTION]: async ({commit}, {login, password}) => {

      // Reset session and profile
      commit(SET_SESSION_MUTATION, null);
      commit(SET_PROFILE_MUTATION, null);

      // Try to login with provided credentials
      // Get valid user session
      // Set session to store
      commit(SET_SESSION_MUTATION, await new AccountProxy().login({login, password}));

    },


    /**
     * Logout user
     *
     * @param dispatch
     * @return {Promise<void>}
     */
    [LOGOUT_ACTION]: async ({commit}) => {
      try {

        // Make logout request
        await new AccountProxy().logout();

      } catch (error) {

        // Throw error
        throw error;

      } finally {

        // Clear session
        // Clear profile data
        // Even if logout error
        // Reset session and profile
        commit(SET_SESSION_MUTATION, null);
        commit(SET_PROFILE_MUTATION, null);
      }
    },


    /**
     * Get profile data
     *
     * @return {Promise<*>}
     */
    [GET_PROFILE_ACTION]: async ({commit}) => {
      try {

        // Create request to get profile data
        const profile = await new AccountProxy().getProfile();

        // Get profile data from response
        // Get profile avatar
        const id = __get(profile, 'id');
        const login = __get(profile, 'login');
        const avatar = new AccountProxy().getAvatarPath(__get(profile, 'avatar'));

        // Set profile data
        commit(SET_PROFILE_MUTATION, {id, login, avatar});

      } catch (error) {

        // Reset session and profile on error
        // Reset session and profile
        commit(SET_SESSION_MUTATION, null);
        commit(SET_PROFILE_MUTATION, null);

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
    [SET_USERS_ID_ACTION]: ({commit, state}) => state.users_id === null ? commit(SET_USERS_ID_MUTATION, uuid()) : null,

  }
}
