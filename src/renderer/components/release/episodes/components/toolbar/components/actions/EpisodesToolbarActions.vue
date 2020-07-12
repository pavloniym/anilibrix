<template>
  <v-menu bottom left :attach="container">

    <template v-slot:activator="{ on }">
      <v-btn height="48" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list dense class="grey darken-4">
      <template v-for="(item, k) in actions">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <v-list-item :key="k" :disabled="loading" @click="item.action">

          <!-- Icon -->
          <v-icon class="mr-2">{{item.icon}}</v-icon>

          <!-- Item -->
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </template>
    </v-list>

  </v-menu>
</template>

<script>

  import {mapActions} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    },
  };

  export default {
    props,
    data() {
      return {
        loading: false,
        container: null,
      }
    },
    computed: {

      actions() {
        return [
          {
            icon: 'mdi-check',
            title: 'Отметить все серии как просмотренные',
            action: this.setWatched,
          },
          {
            icon: 'mdi-close',
            title: 'Снять все отметки о просмотре',
            action: this.removeWatched,
          }
        ]
      }

    },


    methods: {
      ...mapActions('app/watch', {
        _setWatchedEpisodes: 'setWatchedEpisodes',
        _removeWatchedEpisodes: 'removeWatchedEpisodes'
      }),


      /**
       * Set watch package data
       *
       * @return {Promise<void>}
       */
      async setWatched() {
        this.loading = true;

        const release_id = this.release.id;
        const episodes = this.release.episodes || [];
        const payload = {release_id, episodes};

        await this._setWatchedEpisodes(payload);

        this.loading = false;
      },


      /**
       * Remove watch package data
       *
       * @return {Promise<void>}
       */
      async removeWatched() {
        this.loading = true;

        const release_id = this.release.id;
        const episodes = this.release.episodes || [];
        const payload = {release_id, episodes};

        await this._removeWatchedEpisodes(payload);

        this.loading = false;
      },

    },

    mounted() {
      this.container = document.getElementById('playlist');
    }

  }
</script>
