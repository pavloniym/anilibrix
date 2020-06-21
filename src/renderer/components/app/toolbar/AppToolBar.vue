<template>
  <v-app-bar flat color="transparent" class="toolbar">

    <slot name="left"/>

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
    <v-btn small text class="mr-1" height="38">
      <v-icon size="18" class="mr-2">mdi-star</v-icon>
      <span>Избранное</span>
    </v-btn>

    <!-- Search-->
    <search class="mr-4"/>

    <update/>
    <notifications/>
    <settings/>

  </v-app-bar>
</template>

<script>

  import Update from './components/update';
  import Search from './components/search';
  import Catalog from './components/catalog'
  import Settings from './components/settings'
  import Notifications from './components/notifications'

  export default {
    components: {
      Update,
      Search,
      Catalog,
      Settings,
      Notifications
    },

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
