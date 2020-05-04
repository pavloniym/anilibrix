<template>
  <div>

    <!-- Search -->
    <playlist-toolbar class="mb-2" :search.sync="search"/>

    <!-- Playlist Items -->
    <v-list v-if="playlistSearched.length > 0" dense dark>
      <template v-for="(episode, k) in playlistSearched">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <playlist-item
          v-bind="{release, episode}"
          :key="episode.id"
          @click.native="$emit('episode', episode)">
        </playlist-item>
      </template>
    </v-list>

  </div>
</template>

<script>

  import PlaylistItem from './components/item'
  import PlaylistToolbar from './components/toolbar'

  import Fuse from "fuse.js";
  import __orderBy from 'lodash/orderBy'
  import {mapState} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episodes: {
      type: Array,
      default: null,
    }
  };

  export default {
    props,
    components: {
      PlaylistItem,
      PlaylistToolbar
    },
    data() {
      return {
        search: null,
        searchOptions: {
          shouldSort: true,
          tokenize: true,
          matchAllTokens: true,
          keys: ['title']
        },
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
        return new Fuse(this.playlist, this.searchOptions);
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
      }

    }
  }
</script>
