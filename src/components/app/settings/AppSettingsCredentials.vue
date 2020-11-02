<template>
  <v-card flat color="transparent" class="mt-auto py-3 credentials__data">
    <v-card-text class="caption">

      <!-- Version -->
      <!-- About -->
      <v-layout column>
        <div>Версия <b>{{app.version}}</b></div>
        <div v-if="isWeb">Сборка <b>{{app.build}}</b></div>
      </v-layout>

      <!-- Warning -->
      <div>Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра</div>

      <!-- Devtools -->
      <!-- Only on desktop version -->
      <v-layout v-if="isDesktop" class="with-divider">
        <a href="#" @click.prevent="showAbout">О приложении</a>
        <a href="#" @click.prevent="toggleDevtools">Инструменты отладки</a>
      </v-layout>

    </v-card-text>

  </v-card>
</template>

<script>

  // Package
  import app from '@/../package'

  // Mixins
  import {DeviceMixin} from '@mixins/app'

  // Store
  import {mapActions} from "vuex";

  // Resolvers
  import AppResolver from "@@/utils/resolvers/app";

  export default {
    mixins: [DeviceMixin],
    computed: {

      /**
       * Get application data
       *
       * @return object
       */
      app() {
        return {
          build: Math.round(new Date(document.lastModified).getTime() / 1000),
          version: app.version,
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
      },

    },

    methods: {
      ...mapActions('app/settings', {_setValue: 'setSettingsValue'}),

      /**
       * Show about panel
       *
       * @return void
       */
      showAbout() {
        AppResolver.showAbout();
      },


      /**
       * Toggle devtools
       *
       * @return {void}
       */
      toggleDevtools() {
        this._setValue({k: 'app.devtools', v: !this.$__get(this.$store, 'state.app.settings.app.devtools', false)});
      }


    }
  }
</script>


<style lang="scss" scoped>

  .credentials {
    &__data {

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
  }

</style>

