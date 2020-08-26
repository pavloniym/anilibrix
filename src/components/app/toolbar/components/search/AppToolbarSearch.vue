<template>
  <v-autocomplete
    v-bind="{items, loading}"
    solo
    dense
    no-filter
    hide-details
    hide-no-data
    return-object
    ref="search"
    item-value="id"
    item-text="names.ru"
    class="grey darken-2"
    placeholder="Поиск релиза ..."
    :append-icon="null"
    :search-input.sync="search"
    @blur="_setSearching(false)"
    @focus="_setSearching(true)"
    @input="toRelease">

    <template v-slot:item="{item}">
      <v-list-item-avatar>
        <v-img :src="item.poster"/>
      </v-list-item-avatar>
      <v-list-item-content :style="{maxWidth: $refs.search.$el.clientWidth + 'px'}">
        <v-list-item-title v-text="item.names.ru"/>
        <v-list-item-subtitle v-text="item.names.original"/>
      </v-list-item-content>
    </template>

  </v-autocomplete>
</template>

<script>

  // Utils
  import axios from "axios";
  import __debounce from 'lodash/debounce'
  import {mapActions} from 'vuex';

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  // Proxy
  import ReleaseProxy from "@proxies/release";
  import SearchTransformer from "@transformers/search";

  // Events
  import {sendError} from "@/events/error/errorsEvents";


  export default {
    request: null,
    data() {
      return {
        items: [],
        search: null,
        loading: false,
        visible: false,
      }
    },

    methods: {
      ...mapActions('app', {_setSearching: 'setSearching'}),

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


      /**
       * Open release view
       *
       * @param release
       * @return void
       */
      toRelease(release) {
        if (release) {

          // Reset input
          // Go to release page
          this.$refs.search.setValue(undefined);
          toRelease(release);

          // Reset items
          this.items = [];
          this.visible = false;
          this._setSearching(false);
        }
      }

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

            // Reset items
            this.items = [];
          }
        }

      }
    }
  }
</script>
