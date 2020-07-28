<template>

  <!-- Favorites  -->
  <v-layout v-if="_isAuthorized" column>

    <!-- Header -->
    <v-card flat color="transparent">
      <v-card-title>Избранные релизы</v-card-title>
      <v-card-subtitle>Список ваших избранных релизов</v-card-subtitle>
    </v-card>


    <!-- Show user favorites -->
    <!-- Favorites Settings -->
    <v-expand-transition>
      <settings v-if="settings" class="mb-2"/>
    </v-expand-transition>


    <!-- Toolbar -->
    <toolbar
      class="mb-2"
      :loading="_loading"
      :search.sync="search"
      :settings.sync="settings"
      @reload="_getFavorites">
    </toolbar>


    <!-- Favorites loader -->
    <!-- Favorites View -->
    <loader v-if="_loading" class="my-2"/>
    <component v-else v-bind="{releases}" class="my-2" :is="view" @toRelease="toRelease"/>

  </v-layout>

  <!-- Authorization -->
  <authorization v-else/>
</template>

<script>

  import FlowView from './views/flow'
  import YearsView from './views/years'

  import Loader from './components/loader'
  import Toolbar from './components/toolbar'
  import Settings from './components/settings'
  import Authorization from './components/authorization'

  import Fuse from "fuse.js";
  import {toLogin, toRelease} from "@utils/router/views";
  import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
    name: "Favorites.View",
    meta: {title: 'Избранное'},
    components: {
      Loader,
      Toolbar,
      Settings,
      Authorization
    },
    data() {
      return {
        search: null,
        settings: false,
        l: false,
      }
    },
    computed: {
      ...mapGetters('app/account', {_isAuthorized: 'isAuthorized'}),
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
          threshold: .2,
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
        // Sort by release update datetime if sort type is 'updates'
        if (sort === 'title') releases = releases.sort((a, b) => a.names.ru.localeCompare(b.names.ru));
        if (sort === 'updates') releases = releases.sort((a, b) => b.datetime && a.datetime ? b.datetime.system - a.datetime.system : 0);

        // Check search string
        // Apply search if search is provided
        if (search) releases = this.releasesSearchable.search(search);


        // Check if should show seen release
        // Check progress and show seen state
        releases = releases.filter(release => {

          const release_id = release.id;
          const total_episodes_number = (this.$__get(release, 'episodes') || []).length;
          const payload = {release_id, total_episodes_number};

          const progress = this.$store.getters['app/watch/getReleaseProgress'](payload);
          return progress < 100 || (progress === 100 && show_seen === true);
        });

        return releases;
      },


    },

    methods: {
      ...mapActions('favorites', {_getFavorites: 'getFavorites'}),

      toLogin,
      toRelease,
    },

  }

</script>
