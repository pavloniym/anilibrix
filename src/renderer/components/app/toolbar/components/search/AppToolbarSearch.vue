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
    :allow-overflow="false"
    :search-input.sync="search"
    @focus="_setSearching(true)"
    @blur="_setSearching(false)"
    @input="toRelease">

    <template v-slot:item="{item}">
      <v-list-item-content>
        <v-list-item-title v-text="item.names.ru"/>
        <v-list-item-subtitle v-text="item.names.original"/>
      </v-list-item-content>
    </template>

  </v-autocomplete>
</template>

<script>

  import __debounce from 'lodash/debounce'
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        items: [],
        search: null,
        loading: false,
        visible: false,
      }
    },

    computed: {
      ...mapState('app', {_is_searching: 'is_searching'}),
    },

    methods: {
      ...mapActions('app', {_setSearching: 'setSearching'}),


      /**
       * Get releases
       *
       * @param searchQuery
       */
      getReleases: __debounce(async function(searchQuery) {

        // Set loading state
        // Get releases from server
        this.loading = true;
        this.items = await this.$store.dispatchPromise('releases/searchReleases', searchQuery);

        // Reset loading
        this.loading = false;

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
          this.items = [];
          this.visible = false;
          this._setSearching(false);
        }
      }

    },

    watch: {

      search: {
        handler(search) {
          if (search && search.length >= 3) {

            // Get releases
            this.getReleases(search);

            // Check if yandex-metrika is available
            // Hit yandex-metrika event
            if(this.$metrika) this.$metrika.hit(`/search?query=${search}`);

          } else {

            // Reset items
            this.items = [];
          }
        }

      }
    }
  }
</script>
