<template>
  <v-autocomplete
    v-bind="{items}"
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
    :loading="is_loading"
    :append-icon="null"
    :search-input.sync="search"
    @blur="_setSearching(false)"
    @focus="_setSearching(true)"
    @input="toRelease">
    <template v-slot:item="{item}">

      <!-- Avatar -->
      <v-list-item-avatar>
        <v-img :src="item.poster"/>
      </v-list-item-avatar>

      <!-- Content -->
      <v-list-item-content>
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

  // Storage
  import {mapActions} from 'vuex';

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  // Proxy + Transformer
  import ReleaseProxy from "@proxies/release";
  import SearchTransformer from "@transformers/search";

  // Resolvers
  import ErrorResolver from "@@/utils/resolvers/error";


  export default {
    request: null,
    data() {
      return {
        items: [],
        search: null,
        visible: false,
        is_loading: false,
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
          toRelease(release.id);

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

            // Hit metrics event
            this.$visit(`/search?query=${search}`, 'Поиск релиза');

          } else {

            // Reset items
            this.items = [];
          }
        }

      }
    }
  }
</script>
