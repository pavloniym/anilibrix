<template>
  <v-layout align-center justify-end class="account__login" @keyup.enter="authorize">

    <!-- Image -->
    <div class="account__login__image" :style="{backgroundImage: `url(${zero_two})`}"></div>

    <v-card flat color="transparent">
      <v-card-title>Авторизация</v-card-title>
      <v-card-subtitle class="pb-0" v-text="'Укажите данные, с которыми вы зарегистрировались на сайте Анилибрии'"/>
      <v-card-subtitle class="pt-0" v-text="'Приложение не хранит ваши учетные данные ни в каком виде'"/>

      <!-- Tabs -->
      <!--<v-tabs v-model="tab" background-color="transparent">
        <v-tab>Учетные данные</v-tab>
        <v-tab>Сессия</v-tab>
      </v-tabs>-->

      <v-layout class="py-6 pt-2">

        <!-- Login / Email -->
        <!-- Password -->
        <template v-if="tab === 0">
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
        </template>

        <!-- Session -->
        <template v-if="tab === 1">
          <v-text-field
            v-model="session"
            outlined
            hide-details
            placeholder="Сессия"
            prepend-inner-icon="mdi-key-variant">
          </v-text-field>
        </template>

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


  import ZeroTwo from '@assets/images/account/zero-two.svg'
  import {requiredIf} from 'vuelidate/lib/validators'
  import {BackViewMixin} from '@mixins/views'

  const SESSION = 'session';
  const CREDENTIALS = 'credentials';

  export default {
    name: "Account.Login.View",
    mixins: [BackViewMixin],
    data() {
      return {
        tab: 0,
        from: null,

        login: null,
        session: null,
        loading: false,
        password: null,

        zero_two: ZeroTwo,
      }
    },

    validations: {
      login: {required: requiredIf(v => v.type === CREDENTIALS)},
      session: {required: requiredIf(v => v.type === SESSION)},
      password: {required: requiredIf(v => v.type === CREDENTIALS)},
    },

    computed: {

      /**
       * Get type
       *
       * @return {string|null}
       */
      type() {
        if (this.tab === 0) return CREDENTIALS;
        if (this.tab === 1) return SESSION;
        return null;
      }

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

            // If type is credentials
            // Try to authorized and set session
            if (this.type === CREDENTIALS) {

              // Reset session to avoid 'already authorized' error
              await this.$store.dispatchPromise('app/account/setSession', null);

              // Make request
              // Set session
              const payload = {login: this.login, password: this.password};
              const session = await this.$store.dispatchPromise('app/account/authorizeWithLoginAndPassword', payload);
              await this.$store.dispatchPromise('app/account/setSession', session);

            }

            // If type is session
            // Just set session to store
            if (this.type === SESSION) {
              await this.$store.dispatchPromise('app/account/setSession', this.session);
            }

            // Get profile data
            // Get user favorites
            await this.$store.dispatchPromise('app/account/getProfile');
            await this.$store.dispatchPromise('favorites/getFavorites');
            await this.toBack();

          } catch (error) {

            this.$toasted.error('Произошла ошибка при авторизации');
            this.$toasted.error(error && error.message ? error.message : null);

          } finally {
            this.loading = false;
          }
        }
      }

    },


  }
</script>

<style lang="scss" scoped>

  .account__login {
    &__image {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 70vh;
      left: 0;
      opacity: .8;
    }

    ::v-deep {
      .v-tab {
        text-transform: unset;
      }
    }

  }

</style>
