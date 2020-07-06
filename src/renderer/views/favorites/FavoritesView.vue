<template>
  <v-layout column>

    <!-- Header-->
    <v-card flat color="transparent">
      <v-card-title>Избранные релизы</v-card-title>
      <v-card-subtitle>Список ваших избранных релизов</v-card-subtitle>
    </v-card>

    <!-- Toolbar -->
    <toolbar class="mb-2" :search.sync="search" :settings.sync="settings"/>

    <!-- Favorites Settings -->
    <v-expand-transition>
      <settings v-if="settings" class="mb-2"/>
    </v-expand-transition>


    <!-- Favorites loader -->
    <loader v-if="_loading"/>

    <!-- Favorites View -->
    <component
      v-else
      v-bind="{releases}"
      :is="view"
      @to:release="toRelease">
    </component>

  </v-layout>
</template>

<script>

  import FlowView from './views/flow'
  import YearsView from './views/years'

  import Loader from './components/loader'
  import Toolbar from './components/toolbar'
  import Settings from './components/settings'

  import {mapActions, mapState} from 'vuex'
  import Fuse from "fuse.js";

  export default {
    name: "Favorites.View",
    meta: {title: 'Избранное'},
    components: {
      Loader,
      Toolbar,
      Settings
    },
    data() {
      return {
        search: null,
        settings: false,
      }
    },
    computed: {
      ...mapState('favorites', {
        _items: s => s.items,
        _loading: s => s.loading,
        _settings: s => s.settings,
      }),


      /**
       * Get view
       *
       * @return {*}
       */
      view() {

        const group = this.$__get(this._settings, 'group');

        if (group === 'original') return FlowView;
        if (group === 'years') return YearsView;
      },


      /**
       * Create searchable entity
       *
       * @return {*}
       */
      releasesSearchable() {

        const options = {
          keys: ['names.ru', 'names.original'],
          tokenize: true,
          threshold: .2,
          shouldSort: true,
          matchAllTokens: true
        };

        return new Fuse(this._items, options);
      },


      /**
       * Get releases
       * Sort with provided type
       * Check seen releases
       * Check search
       *
       * @return {array}
       */
      releases() {

        const sort = this.$__get(this._settings, 'sort');
        const search = this.search;
        const show_seen = this.$__get(this._settings, 'show_seen') || false;

        // Create releases copy from store
        let releases = [...this._items || []];


        // Check sort type
        // Sort by title if sort type is 'title'
        if (sort === 'title') releases = releases.sort((a, b) => a.names.ru.localeCompare(b.names.ru))

        // Check search string
        // Apply search if search is provided
        if (search) releases = this.releasesSearchable.search(search);


        // Check if should show seen release
        // Check progress and show seen state
        releases = releases.filter(release => {

          const release_id = release.id;
          const total_episodes_number = (this.$__get(release, 'episodes') || []).length;
          const progress = this.$store.getters['app/watch/getReleaseProgress']({release_id, total_episodes_number});

          return progress < 100 || (progress === 100 && show_seen === true);
        });

        return releases;
      },


    },

    methods: {
      ...mapActions('favorites', {_getFavorites: 'getFavorites'}),


      /**
       * To release
       *
       * @param release
       */
      toRelease(release) {
        if (release) {

          const releaseId = this.$__get(release, 'id');
          const releaseName = this.$__get(release, 'names.original');

          this.$router.push({
            name: 'release',
            params: {releaseId, releaseName}
          });
        }
      }

    },

    created() {
      this._getFavorites();
    },

  }

</script>
