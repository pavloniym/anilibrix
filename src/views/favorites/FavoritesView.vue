<template>

  <!-- Authorization -->
  <!-- Favorites -->
  <authorization v-if="!isAuthorized"/>
  <v-layout v-else column>

    <!-- Header -->
    <v-card flat color="transparent">
      <v-card-title v-text="header.title"/>
      <v-card-subtitle v-text="header.description"/>
    </v-card>

    <!-- Show user favorites -->
    <!-- Favorites Settings -->
    <v-expand-transition appear mode="out-in">
      <settings v-if="settings" class="mb-2"/>
    </v-expand-transition>

    <!-- Toolbar -->
    <toolbar
      class="mb-2"
      :loading="_is_loading"
      :search.sync="search"
      :settings.sync="settings"
      @reload="getFavorites">
    </toolbar>


    <!-- Favorites loader -->
    <!-- Favorites View -->
    <loader v-if="_is_loading" class="mb-2"/>
    <releases v-else v-bind="{items}" class="mb-2" />

  </v-layout>
</template>

<script>

  // Components
  import Loader from './_components/loader'
  import Toolbar from './_components/toolbar'
  import Settings from './_components/settings'
  import Releases from './_components/releases'
  import Authorization from './_components/authorization'

  // Utils
  import Fuse from "fuse.js";

  // Store
  import {IS_AUTHORIZED_GETTER} from "@store/app/account/appAccountStore";
  import {GET_FAVORITES_ACTION} from "@store/favorites/favoritesStore";
  import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
    name: "Favorites.View",
    components: {
      Loader,
      Toolbar,
      Settings,
      Releases,
      Authorization
    },
    meta() {
      return {title: 'Избранные релизы'}
    },
    data() {
      return {
        header: {
          title: 'Избранные релизы',
          description: 'Список ваших избранных релизов'
        },
        search: null,
        settings: false,
      }
    },
    computed: {
      ...mapState('favorites', {_items: s => s.items, _is_loading: s => s.is_loading, _settings: s => s.settings}),
      ...mapGetters('app/account', [IS_AUTHORIZED_GETTER]),


      /**
       * Get items
       *
       * @return {array}
       */
      items() {
        return this.search ? this.searchable.search(this.search) : this._items;
      },


      /**
       * Create searchable entity
       *
       * @return {*}
       */
      searchable() {
        return new Fuse(this._items, {keys: ['names.ru', 'names.original'], threshold: .2});
      },


      /**
       * Check if user is authorized
       *
       * @return {boolean}
       */
      isAuthorized() {
        return this[IS_AUTHORIZED_GETTER] === true;
      }
    },

    methods: {
      ...mapActions('favorites', [GET_FAVORITES_ACTION]),

      /**
       * Get favorites
       *
       * @return {void}
       */
      getFavorites() {
        this[GET_FAVORITES_ACTION]();
      }
    },

    mounted() {
      this.$visit(this.$route.path, this.$metaInfo.title);
    },

  }

</script>
