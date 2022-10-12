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
        <v-img :src="item.poster" />
      </v-list-item-avatar>
      <v-list-item-content :style="{maxWidth: $refs.search.$el.clientWidth + 'px'}">
        <v-list-item-title v-text="item.names.ru"/>
        <v-list-item-subtitle v-text="item.names.original"/>
      </v-list-item-content>
    </template>

  </v-autocomplete>
</template>

<script>

  import __debounce from 'lodash/debounce'
  import {toRelease} from "@/renderer/src/utils/router/views";
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
        handler(search) {
          if (search && search.length >= 3) {

            // Get releases
            this.getReleases(search);

            // Check if metrics is available
            // Hit metrics event
            if(this.$metrika) {
              this.$metrika.hit(`/search?query=${search}`);
            }

          } else {

            // Reset items
            this.items = [];
          }
        }

      }
    }
  }
</script>
