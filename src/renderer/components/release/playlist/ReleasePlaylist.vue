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
        <v-list-item :key="k" @click="$emit('click', item)">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
            <v-list-item-subtitle v-text="item.jikan.title" />
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
      }
    },
    computed: {
      ...mapState('releases', {
        release: s => s.item.data,
        jikan: s => s.item.jikan,
      }),

      /**
       * Get playlist
       *
       * @return Array
       */
      playlist() {
        const episodes = __get(this.jikan, 'episodes', []);
        return __get(this.release, 'episodes', []).map(episode => {

          const jikan = (episodes || []).find(e => e.id === episode.id);
          return {
            ...episode,
            jikan: {
              title: __get(jikan, 'title'),
            }
          }
        });
      },


      /**
       * Create searchable entity
       *
       * @return Object
       */
      playlistSearchable() {
        return new Fuse(this.playlist, {
          shouldSort: true,
          tokenize: true,
          matchAllTokens: true,
          threshold: 0.35,
          location: 0,
          distance: 100,
          maxPatternLength: 128,
          minMatchCharLength: 1,
          keys: ['title']
        });
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

    }
  }
</script>
