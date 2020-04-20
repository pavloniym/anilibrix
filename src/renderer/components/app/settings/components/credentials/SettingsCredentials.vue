<template>
  <v-card class="mt-auto py-3" color="transparent" flat>
    <v-card-text class="caption">
      <div>Версия {{app.version}}</div>
      <div>Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра.</div>
      <div class="credentials__links">
        <span class="credentials__link" @click.prevent="openLink('https://anilibria.tv')">Анилибрия</span>
        <span class="credentials__link" @click.prevent="openLink('https://github.com/anilibria')">Исходный код</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

  import app from '@/../package'
  import {shell} from 'electron'

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
      }
    },

    methods: {

      /**
       * Open link in OS default browser
       *
       * @param link
       */
      openLink(link) {
        shell.openExternal(link);
      }


    }
  }
</script>


<style lang="scss" scoped>

  .credentials {
    &__link {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__links {
      display: flex;

      > span {
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

