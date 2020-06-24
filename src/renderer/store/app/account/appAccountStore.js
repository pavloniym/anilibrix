import __get from 'lodash/get'
import {Main} from "@main/utils/windows";
import {v4 as uuid} from 'uuid'
import AnilibriaProxy from "@proxies/anilibria";

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
     * Set account id
     * Generate random uuid if not exists
     *
     * @param commit
     * @param state
     * @param uuid
     */
    setUserId: ({commit, state}) => {
      if (state.userId === null) {
        commit(SET_USER_ID, uuid());
      }
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
    setProfile: ({commit}, profile = null) => commit(SET_PROFILE, profile || {}),


    /**
     * Authorize with login and password
     * @param commit
     * @param login
     * @param password
     * @return {Promise<void>}
     */
    authorizeWithLoginAndPassword: async ({commit}, {login, password}) => {
      return await new AnilibriaProxy().login({login, password});
    },


    /**
     * Get profile data
     *
     * @return {Promise<*>}
     */
    getProfile: async ({commit}) => {
      try {

        // Create request to get profile data
        const profile = await new AnilibriaProxy().getProfile();

        // Get profile data from response
        // Get profile avatar
        const id = __get(profile, 'id');
        const login = __get(profile, 'login');
        const avatar = await new AnilibriaProxy().getImage({src: __get(profile, 'avatar')});

        // Set profile data
        commit(SET_PROFILE, {id, login, avatar});

      } catch (error) {

        // Reset session and profile on error
        commit(SET_SESSION, null);
        commit(SET_PROFILE, null);

        // Throw error
        throw error;
      }
    },


    /**
     * Logout user
     *
     * @param commit
     * @return {Promise<void>}
     */
    logout: async ({commit}) => {
      try {

        // Make logout request
        await new AnilibriaProxy().logout();

      } catch (error) {

        // Throw error
        throw error;

      } finally {

        // Clear session
        // Clear profile data
        // Even if logout error
        commit(SET_SESSION, null);
        commit(SET_PROFILE, null);

      }
    }

  }
}
