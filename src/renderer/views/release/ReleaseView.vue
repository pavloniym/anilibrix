<template>
  <v-layout v-if="loading || _release" column>

    <!-- Release Card -->
    <card v-bind="{loading}" class="mb-2" :release="_release"/>

    <!-- Release Tabs -->
    <v-tabs v-if="!loading" v-model="tab" class="shrink mb-4" background-color="transparent">
      <v-tab>Эпизоды</v-tab>
      <v-tab>Комментарии</v-tab>
    </v-tabs>

    <!-- Release Components -->
    <!-- Release Playlist -->
    <component v-if="component" v-on="component.events" v-bind="component.props" :is="component.is"/>

  </v-layout>
</template>

<script>

  import Card from '@components/release/card'
  import Playlist from '@components/release/playlist'
  import Comments from '@components/release/comments'

  import {toVideo} from "@utils/router/views";
  import {mapState} from 'vuex'

  const props = {
    releaseId: {
      type: [String, Number],
      default: null
    },
    releaseName: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    name: "Release.View",
    meta() {
      return {title: `Релиз [${this.releaseId}]: ${this.releaseName}`}
    },
    components: {
      Card,
      Playlist
    },

    data() {
      return {
        tab: 0,
        loading: false,
      }
    },

    computed: {
      ...mapState('release', {_release: s => s.data}),

      /**
       * Get release episodes
       *
       * @return {array}
       */
      episodes() {
        return this.$__get(this._release, 'episodes') || [];
      },


      /**
       * Get available components
       *
       * @return {array}
       */
      components() {
        return [
          {
            is: Playlist,
            props: {
              loading: this.loading,
              release: this._release,
              episodes: this.episodes,
            },
            events: {episode: $event => toVideo($event)},
          },
          {
            is: Comments,
            props: {release: this._release}
          }
        ]
      },


      /**
       * Get active component
       *
       * @return {*}
       */
      component() {
        return this.components[this.tab] || null;
      }

    },

    methods: {

      /**
       * Watch provided episode
       *
       * @param episode
       */
      toVideo(episode) {
        toVideo(this._release, episode);
      },

    },

    watch: {

      releaseId: {
        immediate: true,
        async handler(releaseId) {

          // Update if release data changed
          if (this._release === null || this._release.id !== parseInt(releaseId)) {

            // Get release data
            this.loading = true;
            await this.$store.dispatchPromise('release/getRelease', releaseId);
            this.loading = false;

          }
        }
      }
    }
  }
</script>
