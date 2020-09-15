<template>
  <banner>

    <!-- Header -->
    <!-- Text -->
    <template v-slot:title>Авторизация</template>
    <template v-slot:text>
      <div>Укажите данные, с которыми вы зарегистрировались на сайте Анилибрии</div>
      <div>Приложение не хранит ваши учетные данные ни в каком виде</div>
    </template>

    <template v-slot:body>
      <v-row dense align="center" class="mb-4" :class="{'px-4': isMobile}">
        <v-col cols="12">
          <v-text-field
            v-model="login"
            outlined
            hide-details
            name="login"
            placeholder="Логин или email">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            outlined
            hide-details
            type="password"
            name="password"
            placeholder="Пароль">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn v-bind="{loading}" block :disabled="$v.$invalid" @click="authorize">Войти</v-btn>
        </v-col>
      </v-row>
    </template>


  </banner>
</template>

<script>

  // Components
  import Banner from "@components/app/ui/banner";

  // Images
  import LibriaTyan03 from '@assets/images/libria-tyan/LibriaTyan03.svg'

  // Utils
  import {required} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'

  // Mixins
  import {DeviceMixin} from "@mixins/app";
  import {BackRouteMixin} from "@mixins/routes";

  export default {
    name: "Account.Login.View",
    mixins: [
      DeviceMixin,
      BackRouteMixin
    ],
    components: {
      Banner
    },
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

    computed: {

      /**
       * Check if form is valid
       *
       * @return {boolean}
       */
      isValid() {
        return !this.$v.$invdalid;
      }

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
        if (this.isValid) {
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
