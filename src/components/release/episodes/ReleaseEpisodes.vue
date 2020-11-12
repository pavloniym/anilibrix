<template>

  <!-- Loader -->
  <!-- Playlist -->
  <loader v-if="is_loading"/>
  <div v-else-if="is_loading === false && release" id="playlist">

    <!-- Release progress -->
    <!-- Toolbar -->
    <toolbar v-bind="{release}" class="mb-2" :search.sync="search"/>
    <release-progress v-if="show_progress" v-bind="{release, episodes}" class="mb-2" color="grey darken-3" height="48"/>


    <!-- Playlist Items -->
    <v-list v-if="playlist.length > 0" dense dark>
      <template v-for="(episode, k) in playlist">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <episode
          v-bind="{release, episode}"
          :key="episode.id"
          :is_playing="playing_episode_id === episode.id"
          @click="$emit('play:episode', episode)">
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

  // Store
  import {mapState} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episodes: {
      type: Array,
      default: null,
    },
    is_loading: {
      type: Boolean,
      default: false,
    },
    show_progress: {
      type: Boolean,
      default: false
    },
    playing_episode_id: {
      type: [String, Number],
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
      ...mapState('app/settings', {_episodes_sort: s => s.player.episodes.order}),

      /**
       * Get playlist
       *
       * @return {array}
       */
      playlist() {
        const episodes = this.search ? this.searchable.search(this.search) : this.episodes;
        return __orderBy(episodes || [], ['id'], [this._episodes_sort]);
      },

      /**
       * Create searchable entity
       *
       * @return {*}
       */
      searchable() {
        return new Fuse(this.episodes, {keys: ['title'], threshold: .2});
      },

    }
  }
</script>
