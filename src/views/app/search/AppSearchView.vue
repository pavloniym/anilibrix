<template>
  <div class="ma-2">
    <search v-model="search" class="mb-2"/>
    <loader v-if="is_loading"/>
    <results v-else v-bind="{items}" @click="toRelease($event.id)"/>
  </div>
</template>

<script>

  // Components
  import Search from './_components/input'
  import Loader from './_components/loader'
  import Results from "./_components/results";

  // Utils
  import axios from "axios";
  import __debounce from "lodash/debounce";

  // Proxy + Transformer
  import ReleaseProxy from "@proxies/release";
  import SearchTransformer from "@transformers/search";

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  // Resolvers
  import ErrorResolver from "@@/utils/resolvers/error";

  export default {
    name: "App.Search.View",
    request: null,
    components: {
      Search,
      Loader,
      Results
    },
    data() {
      return {
        items: [],
        search: null,
        is_loading: false,
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
          this.is_loading = true;

          // Cancel previous request if it was stored
          // Create new request token if exists
          if (this.$options.request) this.$options.request.cancel();
          this.$options.request = axios.CancelToken.source();

          // Get releases
          // Transform releases
          const response = await new ReleaseProxy().searchReleases(search_query, {cancelToken: this.$options.request.token});
          this.items = new SearchTransformer().fetchCollection(response || [])


        } catch (error) {

          // Emit error
          // Throw error
          ErrorResolver.emitError('Произошла ошибка во время поиска релизов');
          throw error;

        } finally {
          this.is_loading = false;
        }
      }, 1000),
    },

    watch: {
      search: {
        async handler(search) {
          if (search && search.length > 2) {

            // Get releases
            this.getReleases(search);

            // Hit metrics event
            this.$visit(`/search?query=${search}`, 'Поиск релиза');

          } else {
            this.items = [];
          }
        }
      }
    }

  }
</script>
