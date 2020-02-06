<template>
  <v-dialog max-width="450px" :value="true" persistent>
    <v-card class="pa-6">
      <span class="headline">Авторизация</span>
      <form class="pt-4" @keyup.enter="authorize2">
        <v-layout column class="py-4">

          <div class="caption mb-4">
            <div>Введите учетные записи для авторизации на сайте anilibria.tv</div>
          </div>

          <v-text-field
            v-model="credentials.login"
            name="login"
            class="pb-2"
            label="E-mail или логин"
            outlined
            hide-details
            color="dark">
          </v-text-field>
          <v-text-field
            v-model="credentials.password"
            type="password"
            name="password"
            class="pb-2"
            label="Пароль"
            outlined
            hide-details
            color="dark">
          </v-text-field>
        </v-layout>
      </form>

      <!--<v-expand-transition>
        <v-alert v-if="error" v-text="error" border="top" color="red" dark class="caption"/>
      </v-expand-transition>
-->

      <!-- Actions -->
      <v-layout justify-end>
        <v-btn
          color="primary darken-1"
          :loading="processing"
          :disabled="processing"
          @click="authorize2">
          Авторизоваться
        </v-btn>
        <v-btn
          color="dark"
          class="mr-1"
          text
          :disabled="processing"
          @click="closeDialog">
          Закрыть
        </v-btn>
      </v-layout>

    </v-card>
  </v-dialog>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        processing: false,
        credentials: {
          login: null,
          password: null
        },
        error: null
      }
    },

    methods: {
      ...mapActions('settings/profile', {_authorize: 'authorize'}),

      /**
       * Close auth dialog
       *
       */
      closeDialog() {
        this.$emit('close');
      },

      /**
       * Authorize
       *
       */
      authorize2() {
        this.processing = true;
        this.error = null;

        console.log(this._authorize({...this.credentials}));

        /* this._authorize(this.credentials)
           .then(response => console.log(response))
           .finally(() => this.processing = false); */
      }

    },

    watch: {
      credentials: {
        deep: true,
        handler() {
          this.error = null
        }
      }
    }

  }
</script>
