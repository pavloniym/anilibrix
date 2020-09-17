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
    <v-btn v-bind="{loading}" :disabled="$v.$invalid" @click="authorize">Войти</v-btn>

  </v-layout>
</template>

<script>

  // Utils
  import {required} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'

  // Mixins
  import {DeviceMixin} from "@mixins/app";
  import {BackRouteMixin} from "@mixins/routes";
  import ErrorResolver from "@@/utils/resolvers/error";

  export default {
    name: "Account.Login.View",
    mixins: [
      DeviceMixin,
      BackRouteMixin
    ],
    data() {
      return {
        tab: 0,
        login: null,
        loading: false,
        password: null,
      }
    },

    validations: {
      login: {required},
      password: {required},
    },

    methods: {
      ...mapActions('favorites', {_getFavorites: 'getFavorites'}),
      ...mapActions('app/account', {_login: 'login', _setSession: 'setSession', _getProfile: 'getProfile'}),

      /**
       * Authorize
       *
       * @return {Promise<void>}
       */
      async authorize() {
        if (!this.$v.$invalid) {
          try {
            this.loading = true;

            // Make login request with provided credentials
            // Get profile data
            await this._login({login: this.login, password: this.password});
            await this._getProfile();
            // await this.$router.back();

            // Get user favorites
            this._getFavorites();

          } catch (error) {

            console.log(error);

            // Emit error
            ErrorResolver.emitError(error)

          } finally {
            this.loading = false;
          }
        }
      }
    }

  }
</script>
