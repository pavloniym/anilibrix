<template>
  <v-layout column>

    <!-- Header-->
    <v-card flat color="transparent">
      <v-card-title>Каталог релизов</v-card-title>
      <v-card-subtitle>Вы можете выбрать жанры и года для более тонкой настройки списка релизов</v-card-subtitle>
    </v-card>

    <!-- Catalog Filters -->
    <v-expand-transition>
      <filters v-if="settings" class="mb-2"/>
    </v-expand-transition>

    <!-- Toolbar -->
    <toolbar class="mb-2" :settings.sync="settings" @reload="showReleases"/>

    <!-- Catalog Loader -->
    <!-- Catalog Items -->
    <div class="my-2">
      <template v-for="release in _items">
        <release v-bind="{release}" class="mb-2" :ref="release.id" :key="release.id" @click="toRelease(release)"/>
      </template>
      <loader v-if="_loading" v-for="i in _perPage" class="mb-2" :key="i"/>
    </div>

    <!-- Load More -->
    <v-btn v-if="_items && _items.length > 0 && hasMoreItems" block text @click="loadReleases">Загрузить еще</v-btn>

  </v-layout>
</template>

<script>

  import Loader from './components/loader'
  import Toolbar from './components/toolbar'
  import Filters from './components/filters'
  import Release from './components/release'

  import {toRelease} from "@utils/router/views";
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "Catalog.View",
    meta: {title: 'Каталог'},
    components: {
      Loader,
      Toolbar,
      Filters,
      Release,
    },

    data() {
      return {
        settings: false,
      }
    },

    computed: {
      ...mapState('catalog', {
        _page: s => s.items.page,
        _items: s => s.items.data,
        _loading: s => s.items.loading,
        _perPage: s => s.items.perPage,
        _pagination: s => s.items.pagination,
        _is_initialized: s => s.is_initialized,
      }),


      /**
       * Check if last items from server is equals to pet page items
       * That means that there are more items on server
       *
       * @return {boolean}
       */
      hasMoreItems() {
        return this.$__get(this._pagination, 'lastItems', 0) === this._perPage;
      },

    },

    methods: {
      ...mapActions('catalog', {
        _getCatalogItems: 'getCatalogItems',
        _setPaginationPage: 'setPaginationPage',
        _clearCatalogReleases: 'clearCatalogReleases',
      }),


      /**
       * Go to release
       *
       * @return void
       */
      toRelease,

      /**
       * Show releases
       * Reset releases
       *
       */
      async showReleases() {
        await this._clearCatalogReleases();
        await this._setPaginationPage(1);
        await this._getCatalogItems();
      },


      /**
       * Load more releases from next page
       *
       * @return void
       */
      async loadReleases() {
        await this._setPaginationPage(this._page + 1);
        await this._getCatalogItems();
      },

    },

    created() {

      // Show releases on initial load
      if (this._is_initialized === false) this.showReleases();

    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from && from.name === 'release') {
          const fromReleaseId = vm.$__get(from, 'params.releaseId');
          const releaseContainer = vm.$refs[fromReleaseId];

          // If div container is found
          // Scroll into view
          if (releaseContainer && releaseContainer[0]) {
            releaseContainer[0].$el.scrollIntoView({block: "center"});
          }
        }
      })
    },

  }
</script>
