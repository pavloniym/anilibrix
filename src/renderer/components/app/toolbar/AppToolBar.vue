<template>
  <v-fade-transition appear>
    <v-app-bar v-if="!hideToolbar" flat color="transparent" class="toolbar shrink">

      <!-- Back button -->
      <!-- No idea how to make it nice in design -->
      <!--<v-btn
        class="mr-1"
        width="44"
        height="38"
        min-width="auto"
        :disabled="!$routerHistory.hasPrevious()"
        @click="$router.push($routerHistory.previous())" >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>-->


      <!-- Releases -->
      <v-btn small text exact class="mr-1" height="38" :to="{name: 'releases'}">
        <v-icon size="18" class="mr-2">mdi-view-column</v-icon>
        <span>Релизы</span>
      </v-btn>

      <!-- Catalog-->
      <v-btn small text exact class="mr-1" height="38" :to="{name: 'catalog'}">
        <v-icon size="18" class="mr-2">mdi-folder-text-outline</v-icon>
        <span>Каталог</span>
      </v-btn>

      <!-- Favorite -->
      <v-btn small text exact class="mr-4" height="38" :to="{name: 'favorites'}">
        <v-icon size="18" class="mr-2">mdi-star</v-icon>
        <span>Избранное</span>
      </v-btn>

      <!-- Search-->
      <search class="mr-4"/>

      <update/>
      <notifications/>
      <settings/>
      <account/>


    </v-app-bar>
  </v-fade-transition>
</template>

<script>

  import Update from './components/update'
  import Search from './components/search'
  import Account from './components/account'
  import Settings from './components/settings'
  import Notifications from './components/notifications'

  export default {
    components: {
      Update,
      Search,
      Account,
      Settings,
      Notifications
    },

    computed: {

      /**
       * Check if should hide toolbar
       *
       * @return {*|boolean}
       */
      hideToolbar() {
        return this.$__get(this.$route, 'meta.layout.hide_toolbar') || false;
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
