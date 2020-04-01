<template>
  <v-card color="transparent" :style="{opacity: .75}">

    <!-- Search -->
    <v-text-field
      v-model="search"
      solo
      clearable
      hide-details
      class="mb-2"
      prepend-inner-icon="mdi-magnify">
    </v-text-field>


    <!-- Playlist Items -->
    <v-list v-if="items.length > 0" dense dark>
      <template v-for="(item, k) in items">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <v-list-item :key="k" @click="watchEpisode(item)">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
            <v-list-item-subtitle v-if="item.mal" v-text="item.mal.title"/>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

  </v-card>
</template>

<script>

  import PlaylistSearch from './components/search'

  import Fuse from "fuse.js";
  import __get from 'lodash/get'
  import {mapState} from "vuex";

  export default {
    components: {
      PlaylistSearch
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
      ...mapState('release', {
        _release: s => s.data,
        _mal: s => s.mal,
      }),


      /**
       * Get playlist
       *
       * @return Array
       */
      playlist() {
        const malEpisodes = __get(this._mal, 'episodes') || [];
        return __get(this._release, 'episodes', [])
          .map(episode => {
            return {
              ...episode,
              mal: (malEpisodes || []).find(e => e.id === episode.id)
            }
          });
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
      items() {
        return this.search
          ? this.playlistSearchable.search(this.search)
          : this.playlist;
      }

    },


    methods: {


      /**
       * Watch episode
       *
       * @param episode
       */
      watchEpisode(episode) {
        this.$store
          .dispatchPromise('player/watch', {release: this._release, episode})
          .then(() => this.$router.push({name: 'player'}));
      },

    }
  }
</script>
