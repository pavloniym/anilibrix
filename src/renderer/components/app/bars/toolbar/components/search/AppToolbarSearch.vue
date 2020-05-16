<template>
  <v-layout class="shrink">

    <!-- Search -->
    <v-tooltip left>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon @click="visible = !visible">
          <v-icon>mdi-{{visible ? 'arrow-right' : 'magnify'}}</v-icon>
        </v-btn>
      </template>
      <span>Поиск релизов</span>
    </v-tooltip>

    <v-expand-x-transition appear mode="out-in">
      <v-autocomplete
        v-if="visible"
        v-bind="{items, loading}"
        solo
        autofocus
        no-filter
        hide-details
        hide-no-data
        return-object
        ref="search"
        class="mx-2"
        item-value="id"
        item-text="names.ru"
        :style="{width: '300px', maxWidth: '300px'}"
        :append-icon="null"
        :allow-overflow="false"
        :search-input.sync="search"
        @input="toRelease">

        <template v-slot:item="{item}">
          <v-list-item-content :style="{width: '250px', maxWidth: '250px'}">
            <v-list-item-title v-text="item.names.ru"/>
            <v-list-item-subtitle v-text="item.names.original"/>
          </v-list-item-content>
        </template>

      </v-autocomplete>
    </v-expand-x-transition>

  </v-layout>
</template>

<script>


  import axios from 'axios'
  import AnilibriaProxy from '@proxies/anilibria'

  export default {
    data() {
      return {
        items: [],
        search: null,
        request: null,
        loading: false,
        visible: false,
      }
    },

    methods: {


      /**
       * Get releases
       *
       * @param searchQuery
       * @return void
       */
      async getReleases(searchQuery) {

        // Set loading state
        this.loading = true;

        // Cancel previous request if it was stored
        if (this.request !== null) this.request.cancel();

        // Abort previous request if exists
        this.request = axios.CancelToken.source();

        // Get releases from server
        this.items = await this.$store.dispatchPromise('releases/searchReleases', {
          searchQuery,
          parameters: {
           // cancelToken: this.request.token
          }
        });

        // Reset loading
        this.loading = false;
      },


      /**
       * Open release view
       *
       * @param release
       * @return void
       */
      toRelease(release) {
        if (release) {

          // Reset input
          this.$refs.search.setValue(undefined);

          // Go to release page
          this.$router.push({
            name: 'release',
            params: {
              releaseId: release.id,
            }
          })
        }
      }

    },

    watch: {

      search: {
        handler(search) {
          if (search && search.length >= 3) this.getReleases(search);
        }

      }
    }
  }
</script>
