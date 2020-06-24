<template>
  <v-fade-transition>

    <!-- Login -->
    <v-tooltip v-if="!_isAuthorized" left key="login">
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon @click="toLogin">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <span>Авторизация</span>
    </v-tooltip>

    <!-- Profile -->
    <v-menu
      v-else
      v-model="menu"
      bottom
      key="profile"
      min-width="100"
      nudge-left="70"
      nudge-bottom="40">

      <template v-slot:activator="{ on }">
        <v-btn v-on="on" v-bind="{loading}" icon>
          <v-fade-transition mode="out-in">
            <v-icon v-if="menu" key="expanded">mdi-chevron-down</v-icon>
            <v-avatar size="28" v-else>
              <v-img :src="_profile.avatar"/>
            </v-avatar>
          </v-fade-transition>
        </v-btn>
      </template>

      <!-- User -->
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="_profile.avatar"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="_profile.login"/>
            <v-list-item-subtitle>ID: {{_profile.id}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item @click="logout">
          <v-list-item-subtitle>Выход</v-list-item-subtitle>
        </v-list-item>
      </v-list>

    </v-menu>

  </v-fade-transition>
</template>

<script>

  import {mapGetters, mapState} from 'vuex'

  export default {
    data() {
      return {
        menu: false,
        loading: false,
        handler: null,
      }
    },
    computed: {
      ...mapState('app/account', {_profile: s => s.profile}),
      ...mapGetters('app/account', {_isAuthorized: 'isAuthorized'}),
    },


    methods: {

      /**
       * Push to login screen
       * Check to avoid duplicate navigation error
       *
       * @return {void}
       */
      toLogin() {
        if (this.$route.name !== 'account.login') {
          this.$router.push({name: 'account.login'})
        }
      },


      /**
       * Logout
       *
       * @return {Promise<void>}
       */
      async logout() {
        try {

          // Make logout request
          this.loading = true;
          await this.$store.dispatchPromise('app/account/logout');

        } catch (error) {

          // Show error
          this.$toasted.error('Произошла ошибка при деавторизации пользователя');

        } finally {

          // Close menu
          this.menu = false;
          this.loading = false;
        }
      },


      /**
       * Get profile data
       *
       * @return {Promise<void>}
       */
      async getProfile() {
        try {

          this.loading = true;
          await this.$store.dispatchPromise('app/account/getProfile');

        } catch (e) {

          //

        } finally {
          this.loading = false;
        }
      }
    },

    async mounted() {

      // Get profile data
      await this.getProfile();

      // Set profile data
      this.handler = setInterval(() => this.getProfile(), 1000 * 60 * 60 * 2);


    },

    beforeDestroy() {
      if (this.handler) {
        clearInterval(this.handler);
      }
    }
  }

</script>
