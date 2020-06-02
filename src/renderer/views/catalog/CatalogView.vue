<template>
  <catalog-layout>

    <!-- Header-->
    <v-card color="transparent">
      <v-card-title>Каталог релизов</v-card-title>
      <v-card-subtitle>Вы можете выберать жанры и года для более тонкой настройки списка релизов</v-card-subtitle>
    </v-card>

    <!-- Filters -->
    <catalog-filters
      class="mx-1"
      :sort.sync="filters.sort"
      :years.sync="filters.years"
      :genres.sync="filters.genres">
    </catalog-filters>

    <!-- Show Action -->
    <v-layout class="my-2 mb-6">
      <v-btn @click="showReleases">Показать</v-btn>
    </v-layout>

    <!-- Catalog items -->
    <template v-for="item in _items">
      <v-card class="mb-2" :key="item.id">
        <catalog-item v-bind="item" @click="toRelease(item)"/>
      </v-card>
    </template>

    <!-- Loading -->
    <template v-if="_loading">
      <catalog-loader v-for="i in 15" class="mb-2" :key="i"/>
    </template>

    <!-- Load More -->
    <v-btn v-if="page >= 1 && lastItems > 0" block text @click="loadReleases">
      <span>Загрузить еще</span>
    </v-btn>

  </catalog-layout>
</template>

<script>


  import CatalogItem from './components/item'
  import CatalogLayout from "@layouts/catalog";
  import CatalogLoader from './components/loader'
  import CatalogFilters from './components/filters'

  import __get from 'lodash/get'
  import {mapActions, mapState} from 'vuex'

  export default {
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
    data() {
      return {
        page: 0,
        perPage: 15,
        filters: {
          sort: 1,
          years: [],
          genres: []
        }
      }
    },

    computed: {
      ...mapState('catalog', {
        _items: s => s.items.data,
        _loading: s => s.items.loading,
        _pagination: s => s.items.pagination,
      }),


      /**
       * Get last items number from previous request
       * If 0 -> no items from server
       *
       * @return {number}
       */
      lastItems() {
        return __get(this._pagination, 'lastItems', 0)
      },

    },

    methods: {
      ...mapActions('catalog', {_getCatalogItems: 'getCatalogItems'}),

      /**
       * Show initial releases
       * Reset page
       * Reset store and get catalog items
       *
       * @return void
       */
      showReleases() {
        this.page = 1;
        this.getCatalogItems({reset: true});
      },


      /**
       * Load more releases
       *
       * @return void
       */
      loadReleases() {
        this.page = this.page + 1;
        this.getCatalogItems();
      },


      /**
       * Get catalog items request
       *
       * @param reset
       * @return void
       */
      getCatalogItems({reset = false} = {}) {
        this._getCatalogItems({
          reset,
          page: this.page,
          sort: this.filters.sort,
          years: this.filters.years,
          genres: this.filters.genres,
          perPage: this.perPage
        });
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
      this.showReleases();
    }
  }
</script>
