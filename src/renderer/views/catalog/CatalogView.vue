<template>
  <v-layout fill-height column>

    <!-- Header-->
    <v-card color="transparent">
      <v-card-title>Каталог релизов</v-card-title>
      <v-card-subtitle>Вы можете выбрать жанры и года для более тонкой настройки списка релизов</v-card-subtitle>
    </v-card>

    <!-- Filters -->
    <catalog-filters class="mx-1"/>

    <!-- Show Action -->
    <v-layout class="my-2 mb-6">
      <v-btn @click="showReleases">Показать</v-btn>
    </v-layout>

    <!-- Catalog items -->
    <template v-for="item in _items">
      <v-card class="mb-2" :key="item.id">
        <catalog-item v-bind="item" :id="item.id" @click="toRelease(item)"/>
      </v-card>
    </template>

    <!-- Loading -->
    <template v-if="_loading">
      <catalog-loader v-for="i in _perPage" class="mb-2" :key="i"/>
    </template>

    <!-- Load More -->
    <v-btn v-if="_items && _items.length > 0 && hasMoreItems" block text @click="loadReleases">Загрузить еще</v-btn>

  </v-layout>
</template>

<script>


  import CatalogItem from './components/item'
  import CatalogLayout from "@layouts/catalog";
  import CatalogLoader from './components/loader'
  import CatalogFilters from './components/filters'

  import __get from 'lodash/get'
  import {mapActions, mapState} from 'vuex'

  const props = {
    fromReleaseId: {
      type: [String, Number],
      default: null
    }
  };

  export default {
    props,
    name: "Catalog.View",
    meta: {
      title: 'Каталог'
    },
    components: {
      CatalogItem,
      CatalogLayout,
      CatalogLoader,
      CatalogFilters
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
       * @return {number}
       */
      hasMoreItems() {
        return __get(this._pagination, 'lastItems', 0) === this._perPage;
      },

    },

    methods: {
      ...mapActions('catalog', {
        _getCatalogItems: 'getCatalogItems',
        _setPaginationPage: 'setPaginationPage',
        _clearCatalogReleases: 'clearCatalogReleases',
      }),


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


      /**
       * Go to release
       *
       * @return void
       */
      toRelease(release) {
        this.$router.push({
          name: 'release',
          params: {
            from: this.$route,
            releaseId: release.id,
            releaseName: release.names.original
          }
        })
      }

    },

    created() {

      // Show releases on initial load
      if (this._is_initialized === false) this.showReleases();

    },

    mounted() {

      // Get release from
      if (this.fromReleaseId) {
        const releaseContainer = document.getElementById(this.fromReleaseId);

        // If div container is found
        // Scroll into view
        if (releaseContainer) {
          releaseContainer.scrollIntoView({block: "center"});
        }

      }
    }
  }
</script>
