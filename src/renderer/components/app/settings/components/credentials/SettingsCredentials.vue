<template>
  <v-card class="mt-auto py-3 credentials" color="transparent" flat>
    <v-card-text class="caption">
      <v-layout class="with-divider">
        <div>Версия {{app.version}}</div>
        <a href="#" @click.prevent="showAbout">О приложении</a>
      </v-layout>
      <div>Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра.</div>
    </v-card-text>
  </v-card>
</template>

<script>

  import app from '@/../package'
  import {shell, ipcRenderer as ipc} from 'electron'

  export default {
    computed: {

      /**
       * Get application data
       *
       * @return object
       */
      app() {
        return {
          version: app.version
        }
      },


      /**
       * Anilibria link
       *
       * @return {string}
       */
      anilibria() {
        return app.meta.links.anilibria
      },

      /**
       * Github link
       *
       * @return {string}
       */
      github() {
        return app.meta.links.github
      }
    },

    methods: {

      /**
       * Show about panel
       *
       * @return void
       */
      showAbout() {
        ipc.send('app:about')
      },

      /**
       * Open link in OS default browser
       *
       * @param link
       */
      toLink(link) {
        shell.openExternal(link);
      }


    }
  }
</script>


<style lang="scss" scoped>

  .credentials {
    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .with-divider {
      > * {
        &::after {
          content: "-";
          display: inline-block;
          padding: 0 3px;
          text-decoration: none;
        }

        &:last-child {
          &::after {
            content: none;
          }
        }
      }

    }
  }

</style>

