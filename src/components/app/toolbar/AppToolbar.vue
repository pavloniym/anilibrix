<template>
  <v-fade-transition appear>
    <v-app-bar flat color="transparent" class="toolbar shrink">

      <!-- Views -->
      <template v-for="(view, k) in views">
        <v-btn small text exact class="mr-1" height="38" :key="`v:${k}`" :class="{'ml-1': k > 0}" @click="view.action">
          <v-icon size="18" class="mr-2">{{view.icon}}</v-icon>
          <span>{{view.title}}</span>
        </v-btn>
      </template>

      <v-spacer/>

      <!-- Actions -->
      <template v-for="(action, k) in actions">
        <component :is="action.is" :key="`a:${k}`"/>
      </template>

    </v-app-bar>
  </v-fade-transition>
</template>

<script>

  // Components
  import Update from './_components/update'
  import Search from './_components/search'
  import Account from './_components/account'
  import Settings from './_components/settings'
  import Notifications from './_components/notifications'

  // Routes
  import {toCatalog} from "@router/catalog/catalogRoutes";
  import {toReleases} from "@router/releases/releasesRoutes";
  import {toFavorites} from "@router/favorites/favoritesRoutes";

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  export default {
    mixins: [
      DeviceMixin
    ],
    computed: {

      /**
       * Available views
       *
       * @return {array}
       */
      views() {
        return [
          {
            icon: 'mdi-view-column',
            title: 'Релизы',
            action: toReleases,
            visible: true,
          },
          {
            icon: 'mdi-folder-text-outline',
            title: 'Каталог',
            action: toCatalog,
            visible: true,
          },
          {
            icon: 'mdi-star',
            title: 'Избранное',
            action: toFavorites,
            visible: this.isDesktop,
          }
        ].filter(view => view.visible)
      },


      /**
       * Get actions
       *
       * @return {array}
       */
      actions() {
        return [
          {is: Search, visible: true},
          {is: Update, visible: true},
          {is: Notifications, visible: true},
          {is: Settings, visible: true},
          {is: Account, visible: this.isDesktop}
        ].filter(action => action.visible)
      }

    }
  }

</script>

<style lang="scss" scoped>

  .toolbar {
    ::v-deep {
      .v-toolbar__content {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

</style>
