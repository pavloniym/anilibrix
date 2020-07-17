<template>
  <v-layout align-center justify-center @keyup.enter="authorize">
    <v-card flat color="transparent">

      <v-card-title>Авторизация</v-card-title>
      <v-card-subtitle class="pb-0" v-text="'Укажите данные, с которыми вы зарегистрировались на сайте Анилибрии'"/>
      <v-card-subtitle class="pt-0" v-text="'Приложение не хранит ваши учетные данные ни в каком виде'"/>


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
  </v-layout>
</template>

<script>

  import {required} from 'vuelidate/lib/validators'
  import {BackViewMixin} from '@mixins/views'

  export default {
    name: "Account.Login.View",
    mixins: [BackViewMixin],
    data() {
      return {
        tab: 0,
        from: null,

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
            // Save account session
            const payload = {login: this.login, password: this.password};
            const session = await this.$store.dispatchPromise('app/account/login', payload);
            await this.$store.dispatchPromise('app/account/setSession', session);

            // Get profile data
            await this.$store.dispatchPromise('app/account/getProfile');
            await this.toBack();

            // Get user favorites
            this.$store.dispatchPromise('favorites/getFavorites');

          } finally {
            this.loading = false;
          }
        }
      }
    }

  }
</script>
