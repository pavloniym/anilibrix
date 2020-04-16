<template>
  <v-layout column fill-height>

    <v-toolbar class="shrink">
      <v-app-bar-nav-icon @click="backToSettingsCategories">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Профиль</v-toolbar-title>
    </v-toolbar>

    <v-layout v-if="session === null" fill-height column align-center justify-center>
      <v-icon size="80" color="grey darken-2">mdi-account</v-icon>
      <div class="grey--text text-center px-8 mt-2 mb-4">
        Похоже вы еще не представились. Пожалуйста, авторизуйтесь в приложении
      </div>
      <v-btn color="primary" @click="dialogs.authorization = true">Авторизоваться</v-btn>
    </v-layout>

    <!-- Authorization dialog -->
    <authorization-dialog
      v-if="dialogs.authorization"
      @close="dialogs.authorization = false">
    </authorization-dialog>

  </v-layout>
</template>

<script>
  import AuthorizationDialog from './dialogs/authorization'
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {
      AuthorizationDialog
    },
    data() {
      return {
        dialogs: {
          authorization: false
        }
      };
    },

    computed: {
      ...mapState('app/settings/profile', {_session: 'session'})
    },

    methods: {
      ...mapActions('app/settings', {_backToSettingsCategories: 'backToSettingsCategories'})
    }
  };
</script>
