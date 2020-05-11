<template>
  <v-menu bottom left>

    <template v-slot:activator="{ on }">
      <v-btn height="48" v-on="on">
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
            title: 'Пометить все серии как просмотренные',
            action: this.setWatchPackageData,
          },
          {
            title: 'Снять все отметки о просмотре',
            action: this.removeWatchPackageData,
          }
        ]
      }

    },


    methods: {
      ...mapActions('app/watch', {
        _setWatchPackageData: 'setWatchPackageData',
        _removeWatchPackageData: 'removeWatchPackageData'
      }),


      /**
       * Set watch package data
       *
       * @return {Promise<void>}
       */
      async setWatchPackageData() {
        this.loading = true;
        await this._setWatchPackageData({episodes: this.release.episodes || [], releaseId: this.release.id});
        this.loading = false;
      },


      /**
       * Remove watch package data
       *
       * @return {Promise<void>}
       */
      async removeWatchPackageData() {
        this.loading = true;
        await this._removeWatchPackageData({episodes: this.release.episodes || [], releaseId: this.release.id});
        this.loading = false;
      },



    }

  }
</script>
