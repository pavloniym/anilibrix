<template>
  <v-menu v-model="visible" left bottom ref="menu" close-on-click :attach="container">

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
  import {initDownload} from "@main/handlers/download/downloadHandlers";

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
        visible: false,
      }
    },
    computed: {

      actions() {
        return [
          {
            icon: 'mdi-check',
            title: 'Пометить серию как просмотренную',
            action: this.setWatchData,
            visible: true,
          },
          {
            icon: 'mdi-close',
            title: 'Снять отметку о просмотре',
            action: this.removeWatchData,
            visible: true,
          },
          {
            icon: 'mdi-download',
            title: 'Скачать эпизод в 1080p',
            action: () => this.downloadEpisode('fhd'),
            visible: !!this.getEpisodeFileUrlByAlias('fhd')
          },
          {
            icon: 'mdi-download',
            title: 'Скачать эпизод в 720p',
            action: () => this.downloadEpisode('hd'),
            visible: !!this.getEpisodeFileUrlByAlias('hd')
          },
          {
            icon: 'mdi-download',
            title: 'Скачать эпизод в 480p',
            action: () => this.downloadEpisode('sd'),
            visible: !!this.getEpisodeFileUrlByAlias('sd')
          }
        ].filter(item => item.visible)
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
        this.visible = false;
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
        this.visible = false;
      },


      /**
       * Get episode source by alias
       *
       * @param alias
       * @return {string|null}
       */
      getEpisodeFileUrlByAlias(alias) {
        const source = this.episode.sources.find(source => source.alias === alias);
        return this.$__get(source, 'payload.file') || null;
      },


      /**
       * Download episode
       *
       * @param alias
       */
      downloadEpisode(alias) {

        // Get episode url for provided alias
        const source = this.episode.sources.find(source => source.alias === alias);
        const url = this.getEpisodeFileUrlByAlias(alias);

        // Send download request
        initDownload(url, source, this.release, this.episode);

        // Deactivate menu
        this.visible = false;
      }

    }

  }
</script>
