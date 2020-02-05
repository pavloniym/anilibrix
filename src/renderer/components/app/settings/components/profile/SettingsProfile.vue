<template>
  <v-list dense>

    <!-- Profile -->
    <v-list-item link @click="authorize">
      <v-list-item-action>
        <v-icon size="20">mdi-account</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Профиль</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-list>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {

    data() {
      return {
        login: null,
        password: null
      };
    },

    methods: {
      ...mapActions('settings/profile', {
        _authorize: 'authorize'
      }),

      authorize() {
        this._authorize({
          login: this.login,
          password: this.password
        });
      }

    }
  };
</script>

<style scoped>

</style>
