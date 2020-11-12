<template>
  <v-layout column>

    <!-- Authorization Card -->
    <v-card class="mb-2" @keyup.enter.native="authorize">

      <!-- Header -->
      <v-card-title>Авторизация</v-card-title>
      <v-card-subtitle>
        <div>Укажите данные, с которыми вы зарегистрировались на сайте Анилибрии</div>
        <div>Приложение не хранит и не передает ваши учетные данные ни в каком виде</div>
      </v-card-subtitle>
      <v-divider/>

      <!-- Fields -->
      <v-text-field
        v-model="login"
        solo
        flat
        hide-details
        name="login"
        class="pl-1"
        label="Логин или email">
      </v-text-field>
      <v-divider/>
      <v-text-field
        v-model="password"
        solo
        flat
        hide-details
        type="password"
        name="password"
        class="pl-1"
        label="Пароль">
      </v-text-field>
    </v-card>

    <!-- Actions -->
    <v-layout>
      <v-btn class="mr-2" :loading="is_loading" :disabled="this.$v.$invalid" @click="authorize">Войти</v-btn>
      <v-btn :loading="is_loading" @click="back">Назад</v-btn>
    </v-layout>


  </v-layout>
</template>

<script>

  // Validation
  import {required} from 'vuelidate/lib/validators'

  // Store
  import {mapActions} from 'vuex'
  import {GET_FAVORITES_ACTION} from "@store/favorites/favoritesStore";
  import {GET_PROFILE_ACTION, LOGIN_ACTION} from "@store/app/account/appAccountStore";

  // Mixins
  import {DeviceMixin} from "@mixins/app";
  import {BackRouteMixin} from "@mixins/routes";

  // Resolvers
  import ErrorResolver from "@@/utils/resolvers/error";

  // Routes
  import {toReleases} from "@router/releases/releasesRoutes";


  export default {
    name: "Account.Login.View",
    mixins: [
      DeviceMixin,
      BackRouteMixin
    ],
    data() {
      return {
        login: null,
        password: null,
        is_loading: false,
      }
    },

    validations: {
      login: {required},
      password: {required},
    },

    methods: {
      ...{toReleases},
      ...mapActions('favorites', [GET_FAVORITES_ACTION]),
      ...mapActions('app/account', [LOGIN_ACTION, GET_PROFILE_ACTION]),

      /**
       * Authorize
       *
       * @return {Promise<void>}
       */
      async authorize() {
        if (!this.$v.$invalid) {
          try {
            this.is_loading = true;

            // Make login request with provided credentials
            // Get profile data
            await this[LOGIN_ACTION]({login: this.login, password: this.password});
            await this[GET_PROFILE_ACTION]();

            // Go back
            // Get user favorites
            this.back();
            this[GET_FAVORITES_ACTION]();

          } catch (error) {

            // Emit error
            // Throw error
            ErrorResolver.emitError(error);
            throw error;

          } finally {
            this.is_loading = false;

          }
        }
      },


      /**
       * Go back
       *
       * @return {Promise<void>}
       */
      async back() {
        this.hasBack ? await this.toBack() : await toReleases();
      }

    }

  }
</script>
