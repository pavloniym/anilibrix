<template>
  <v-bottom-navigation app min-height="80" color="grey darken-3" active-class="white--text">

    <template v-for="(view, k) in views">
      <v-btn text exact min-width="65" :to="view.to" :key="k">
        <span :style="{fontSize: '.6rem'}">{{view.title}}</span>
        <v-icon>{{view.icon}}</v-icon>
      </v-btn>
    </template>

  </v-bottom-navigation>
</template>

<script>

  // Routes
  import {CATALOG_ROUTE_NAME} from "@router/catalog/catalogRoutes";
  import {RELEASES_ROUTE_NAME} from "@router/releases/releasesRoutes";
  import {FAVORITES_ROUTE_NAME} from "@router/favorites/favoritesRoutes";
  import {APP_SETTINGS_ROUTE_NAME, APP_SEARCH_ROUTE_NAME} from "@router/app/appRoutes";

  export default {
    computed: {

      views() {
        return [
          {
            to: {name: RELEASES_ROUTE_NAME},
            icon: 'mdi-view-column',
            title: 'Релизы'
          },
          {
            to: {name: CATALOG_ROUTE_NAME},
            icon: 'mdi-folder-text-outline',
            title: 'Каталог'
          },
          {
            to: {name: FAVORITES_ROUTE_NAME},
            icon: 'mdi-star',
            title: 'Избранное'
          },
          {
            to: {name: APP_SEARCH_ROUTE_NAME},
            icon: 'mdi-magnify',
            title: 'Поиск'
          },
          {
            to: {name: APP_SETTINGS_ROUTE_NAME},
            icon: 'mdi-settings',
            title: 'Настройки'
          },
        ]
      }


    }
  }
</script>
