<template>
  <v-overlay v-if="visible" absolute opacity=".85">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>Кэш приложения</v-card-title>
        <v-card-subtitle class="pt-2 pb-0">Вы действительно хотите сбросить кеш и настройки приложения?</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-bind="{loading}" text color="red" @click="resetCache">Сбросить</v-btn>
          <v-btn v-bind="{loading}" text @click="visible = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script>

  const props = {
    attach: {
      type: HTMLDivElement,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        visible: false,
        loading: false,
      }
    },

    methods: {

      /**
       * Show dialog
       *
       * @return void
       */
      showDialog() {
        this.visible = true;
      },


      /**
       * Reset cache
       *
       * @return void
       */
      resetCache() {
        this.loading = true;
        this.$store.dispatch('RESET_STORE')
         // .then(() => null, // this.$electron.remote.getCurrentWindow().reload())
          .finally(() => this.loading = false)
      }
    }

  }
</script>
