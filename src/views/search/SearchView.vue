<template>
  <div>

    <!-- Search -->
    <search :value="_search" :loading="_is_loading" class="mb-2" @input="_setSearch"/>

    <!-- Loader -->
    <!-- Releases -->
    <loader v-if="_is_loading"/>
    <releases v-else :items="_releases" @click="toRelease($event.id)"/>

  </div>
</template>

<script>

  // Components
  import Search from './_components/input'
  import Loader from './_components/loader'
  import Releases from "./_components/releases";

  // Utils
  import __debounce from "lodash/debounce";

  // Store
  import {mapState, mapActions} from 'vuex'

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  export default {
    name: "Search.View",
    components: {
      Search,
      Loader,
      Releases
    },
    computed: {
      ...mapState('search', {
        _search: s => s.search,
        _releases: s => s.releases,
        _is_loading: s => s.is_loading
      })
    },


    methods: {
      ...{toRelease},
      ...mapActions('search', {
        _setSearch: 'setSearch',
        _searchReleases: 'searchReleases',
        _clearReleases: 'clearReleases'
      }),

      /**
       * Set search value to store
       *
       * @param search
       * @return {void}
       */
      setSearch(search) {
        this._setSearch(search)
      },


      /**
       * Search releases
       *
       * @return {void}
       */
      searchReleases: __debounce(function () {
        this._searchReleases(this._search)
      }, 1000),

    },

    watch: {
      _search: {
        async handler(search) {
          if (search && search.length > 2) {

            // Get releases
            this.searchReleases();

            // Hit metrics event
            this.$visit(`/search?query=${search}`, 'Поиск релиза');

          } else {

            // Clear releases
            this._clearReleases();
          }
        }
      }
    }

  }
</script>
