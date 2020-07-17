<template>

  <!-- Loading -->
  <loader v-if="loading"/>

  <!-- Playlist -->
  <div v-else-if="loading === false && release" id="playlist">

    <!-- Release progress -->
    <!-- Toolbar -->
    <toolbar v-bind="{release}" class="mb-2" :search.sync="search"/>
    <release-progress v-bind="{release, episodes}" class="mb-2" color="grey darken-3" height="48"/>


    <!-- Playlist Items -->
    <v-list v-if="playlistSearched.length > 0" dense dark>
      <template v-for="(episode, k) in playlistSearched">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <episode
          v-bind="{release, episode}"
          :key="episode.id"
          :is-playing="playing && playing.id === episode.id"
          @click="$emit('episode', episode)">
        </episode>
      </template>
    </v-list>

  </div>
</template>

<script>

  // Episodes
  import Loader from './components/loader'
  import Episode from './components/episode'
  import Toolbar from './components/toolbar'

  // Release
  import ReleaseProgress from './../progress'

  // Utils
  import Fuse from "fuse.js";
  import __orderBy from 'lodash/orderBy'
  import {mapState} from 'vuex'

  const props = {
    loading: {
      type: Boolean,
      default: false,
    },
    release: {
      type: Object,
      default: null
    },
    episodes: {
      type: Array,
      default: null,
    },
    playing: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {
      Loader,
      Episode,
      Toolbar,
      ReleaseProgress,
    },

    data() {
      return {
        search: null,
      }
    },

    computed: {
      ...mapState('app/settings/player', {_sort: s => s.episodes.order}),

      /**
       * Get playlist
       *
       * @return Array
       */
      playlist() {
        return __orderBy(this.episodes || [], ['id'], [this._sort]);
      },


      /**
       * Create searchable entity
       *
       * @return Object
       */
      playlistSearchable() {
        return new Fuse(this.playlist, {keys: ['title']});
      },


      /**
       * Get playlist items
       *
       * @return {any}
       */
      playlistSearched() {
        return this.search
          ? this.playlistSearchable.search(this.search)
          : this.playlist;
      },


    }
  }
</script>
