<template>
  <v-menu left bottom ref="menu" :attach="container">

    <template v-slot:activator="{ on }">
      <v-btn icon color="grey darken-2" @click.stop="on.click">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list dense class="grey darken-4">
      <template v-for="(item, k) in actions">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <v-list-item :key="k" :disabled="loading" @click.stop="item.action">

          <!-- Icon -->
          <v-icon class="mr-2" color="grey">{{item.icon}}</v-icon>

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
    episode: {
      type: Object,
      default: null
    },
    container: {
      type: HTMLDivElement,
      default: null,
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
            icon: 'mdi-check',
            title: 'Пометить серию как просмотренную',
            action: this.setWatchData,
          },
          {
            icon: 'mdi-close',
            title: 'Снять отметку о просмотре',
            action: this.removeWatchData,
          }
        ]
      }

    },


    methods: {
      ...mapActions('app/watch', {
        _setWatchData: 'setWatchData',
        _removeWatchData: 'removeWatchData'
      }),


      /**
       * Set watch package data
       *
       * @return {Promise<void>}
       */
      async setWatchData() {

        // Set watch data
        await this._setWatchData({releaseId: this.release.id, episodeId: this.episode.id, percentage: 100});

        // Deactivate menu
        this.$refs.menu.callDeactivate()
      },


      /**
       * Remove watch package data
       *
       * @return {Promise<void>}
       */
      async removeWatchData() {

        // Remove watch data
        await this._removeWatchData({releaseId: this.release.id, episodeId: this.episode.id});

        // Deactivate menu
        this.$refs.menu.callDeactivate()
      },
    }

  }
</script>
