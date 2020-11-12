<template>
  <v-bottom-navigation app fixed color="grey darken-3" :style="navigationStyles">

    <template v-for="(view, k) in views">
      <v-btn text exact min-width="65" :ref="view.ref" :key="k" @click="toView(view)">
        <span :style="{fontSize: '.6rem'}">{{view.title}}</span>
        <v-icon>{{view.icon}}</v-icon>
      </v-btn>
    </template>

  </v-bottom-navigation>
</template>

<script>

  // Routes
  import {toSearch} from "@router/search/searchRoutes";
  import {toCatalog} from "@router/catalog/catalogRoutes";
  import {toReleases} from "@router/releases/releasesRoutes";
  import {toSettings} from "@router/app/settings/appSettingsRoutes";

  // Utils
  import safeAreaInsets from 'safe-area-insets'

  export default {
    computed: {

      /**
       * Get available mobile views
       *
       * @return {array}
       */
      views() {
        return [
          {
            ref: 'releases',
            icon: 'mdi-view-column',
            title: 'Релизы',
            action: toReleases,
          },
          {
            ref: 'catalog',
            icon: 'mdi-folder-text-outline',
            title: 'Каталог',
            action: toCatalog,
          },
          {
            ref: 'search',
            icon: 'mdi-magnify',
            title: 'Поиск',
            action: toSearch,
          },
          {
            ref: 'settings',
            icon: 'mdi-settings',
            title: 'Настройки',
            action: toSettings,
          },
        ]
      },

      /**
       * Get mobile navigation height
       *
       * @return {*}
       */
      navigationStyles() {
        return {
          minHeight: 56 + safeAreaInsets.bottom + 'px',
          paddingBottom: safeAreaInsets.bottom + 'px'
        }
      }

    },

    methods: {

      /**
       * Go to provided view
       *
       * @param view
       */
      toView(view) {

        // Go to view
        view.action();

        // Blur button
        this.$refs[view.ref][0].$el.blur();

      }
    }
  }
</script>
