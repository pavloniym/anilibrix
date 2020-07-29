<template>
  <v-layout fill-height align-center justify-center @keyup.enter="authorize">
    <v-row justify="center" align="center">

      <v-col cols="12" sm="3" align-self="center">
        <v-img class="image" contain :src="image"/>
      </v-col>

      <v-col cols="12" sm="6" align-self="center">
        <v-card flat color="transparent">
          <v-card-title>Авторизация</v-card-title>
          <v-card-text>
            <div>Укажите данные, с которыми вы зарегистрировались на сайте Анилибрии</div>
            <div>Приложение не хранит ваши учетные данные ни в каком виде</div>
          </v-card-text>

          <!-- Login / Email -->
          <!-- Password -->
          <v-layout class="py-6 pt-2">
            <v-text-field
              v-model="login"
              outlined
              hide-details
              class="mr-1"
              color="grey"
              placeholder="Email или логин"
              prepend-inner-icon="mdi-account">
            </v-text-field>
            <v-text-field
              v-model="password"
              outlined
              hide-details
              class="ml-1"
              type="password"
              placeholder="Пароль"
              prepend-inner-icon="mdi-lock">
            </v-text-field>
          </v-layout>

          <!-- Actions -->
          <v-layout>
            <v-btn v-bind="{loading}" class="mr-1" :disabled="$v.$invalid" @click="authorize">Авторизация</v-btn>
            <v-btn v-bind="{loading}" text @click="toBack">Назад</v-btn>
          </v-layout>

        </v-card>
      </v-col>

    </v-row>
  </v-layout>
</template>

<script>

  // Images
  import LibriaTyan03 from '@assets/images/libria-tyan/LibriaTyan03.svg'

  // Utils
  import {required} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'

  // Mixins
  import {BackRouteMixin} from "@mixins/routes";

  export default {
    name: "Account.Login.View",
    mixins: [BackRouteMixin],
    data() {
      return {
        tab: 0,
        from: null,
        login: null,
        image: LibriaTyan03,
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
      ...mapActions('app/account', {
        _login: 'login',
        _setSession: 'setSession',
        _getProfile: 'getProfile',
      }),

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
            await this.toBack();

            // Get user favorites
            this._getFavorites();

          } finally {
            this.loading = false;
          }
        }
      }
    }

  }
</script>
