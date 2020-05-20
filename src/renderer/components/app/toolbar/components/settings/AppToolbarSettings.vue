<template>
  <v-tooltip left>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" icon @click="_setDrawer(!_drawer)">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
    <span>Настройки приложения</span>
  </v-tooltip>
</template>

<script>

  import {mapActions, mapState} from "vuex";

  export default {
    computed: {
      ...mapState('app', {_drawer: 'drawer'}),
    },

    methods: {
      ...mapActions('app', {_setDrawer: 'setDrawer'}),
    }
  }
</script>
