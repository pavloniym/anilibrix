<template>
  <v-layout column class="my-2">

    <!-- Search -->
    <search
      class="mb-2"
      :value="_search"
      :loading="_is_loading"
      @input="_setSearch">
    </search>

    <!-- Loader -->
    <!-- Releases -->
    <loader v-if="_is_loading"/>
    <releases v-else :items="_releases" @click="toRelease($event.id)"/>
  
  </v-layout>
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

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  export default {
    name: "Search.View",
    mixins: [DeviceMixin],
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
        _clearReleases: 'clearReleases',
        _searchReleases: 'searchReleases',
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
