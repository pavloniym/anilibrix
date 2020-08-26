<template>
  <div>

    <!-- Search input -->
    <!-- Search Results -->
    <search-input v-model="search" class="mb-2" />
    <search-results v-bind="{items, loading}" @click="toRelease" />

  </div>
</template>

<script>

  // Components
  import SearchInput from './components/input'
  import SearchResults from "./components/results";

  // Utils
  import axios from "axios";
  import __debounce from "lodash/debounce";

  // Proxy
  import ReleaseProxy from "@proxies/release";
  import SearchTransformer from "@transformers/search";

  // Events
  import {sendError} from "@/events/error/errorsEvents";

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";


  export default {
    name: "Search",
    request: null,
    components: {
      SearchInput,
      SearchResults
    },
    data() {
      return {
        items: [],
        search: null,
        loading: false,
      }
    },


    methods: {
      ...{toRelease},

      /**
       * Get releases
       *
       * @param searchQuery
       */
      getReleases: __debounce(async function (search_query) {
        try {

          // Set loading state
          this.loading = true;

          // Cancel previous request if it was stored
          // Create new request token if exists
          if (this.$options.request) this.$options.request.cancel();
          this.$options.request = axios.CancelToken.source();

          // Get releases
          const response = await new ReleaseProxy().searchReleases(search_query, {cancelToken: this.$options.request.token});

          // Transform releases
          // Get posters src
          this.items = new SearchTransformer()
            .fetchCollection(response || [])
            .map(release => ({...release, poster: new ReleaseProxy().getReleasePosterPath(release.poster)}))

        } catch (error) {

          // Emit error
          // Throw error
          sendError('Произошла ошибка во время поиска релизов');
          throw error;


        } finally {
          this.loading = false;
        }
      }, 1000),
    },

    watch: {
      search: {
        async handler(search) {
          if (search && search.length > 2) {

            // Get releases
            this.getReleases(search);

            // Check if metrics is available
            // Hit metrics event
            if (this.$metrika) this.$metrika.hit(`/search?query=${search}`);

          } else {
            this.items = [];
          }
        }
      }
    }

  }
</script>
