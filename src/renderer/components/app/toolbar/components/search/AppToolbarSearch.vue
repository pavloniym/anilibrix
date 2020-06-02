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

    <v-expand-x-transition>
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
        item-value="id"
        item-text="names.ru"
        placeholder="Поиск релиза ..."
        :style="{width: '400px', maxWidth: '400px'}"
        :append-icon="null"
        :allow-overflow="false"
        :search-input.sync="search"
        @input="toRelease">

        <template v-slot:item="{item}">
          <v-list-item-content :style="{width: '350px', maxWidth: '350px'}">
            <v-list-item-title v-text="item.names.ru"/>
            <v-list-item-subtitle v-text="item.names.original"/>
          </v-list-item-content>
        </template>

      </v-autocomplete>
    </v-expand-x-transition>

  </v-layout>
</template>

<script>

  export default {
    data() {
      return {
        items: [],
        search: null,
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
        // Get releases from server
        this.loading = true;
        this.items = await this.$store.dispatchPromise('releases/searchReleases', searchQuery);

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
              releaseName: release.names.original,
            }
          });


          // Reset items
          this.visible = false;
          this.items = [];
        }
      }

    },

    watch: {

      search: {
        handler(search) {
          if (search && search.length >= 3) {

            // Get releases
            this.getReleases(search);

            // Hit yandex-metrika event
            this.$metrika.hit(`/search?query=${search}`);

          }
        }

      }
    }
  }
</script>
