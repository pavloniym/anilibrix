<template>
  <v-menu bottom left>

    <template v-slot:activator="{ on }">
      <v-btn icon @click.stop="on.click">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item v-for="(item, i) in actions" :key="i" :disabled="loading" @click="item.action">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        loading: false,
      }
    },
    computed: {

      actions() {
        return [
          {
            title: 'Пометить серию как просмотренную',
            action: this.setWatchData,
          },
          {
            title: 'Снять отметку о просмотре',
            action: this.removeWatchData,
          }
        ]
      }

    },


    methods: {
      ...mapActions('firebase/watch', {
        _setWatchData: 'setWatchData',
        _removeWatchData: 'removeWatchData'
      }),


      /**
       * Set watch package data
       *
       * @return {Promise<void>}
       */
      async setWatchData() {
        this.loading = true;
        await this._setWatchData({releaseId: this.release.id, episodeId: this.episode.id, percentage: 100});
        this.loading = false;
      },


      /**
       * Remove watch package data
       *
       * @return {Promise<void>}
       */
      async removeWatchData() {
        this.loading = true;
        await this._removeWatchData({releaseId: this.release.id, episodeId: this.episode.id});
        this.loading = false;
      },



    }

  }
</script>
