<template>
  <v-layout v-if="loading || _release" column :class="{'py-6': !isMobile}">

    <!-- Release Card -->
    <card v-bind="{loading}" class="mb-2" :release="_release"/>

    <!-- Release Tabs -->
    <v-tabs v-if="!loading" v-model="tab" class="shrink mb-6" background-color="transparent">
      <v-tab>Эпизоды</v-tab>
      <v-tab>Комментарии</v-tab>
    </v-tabs>

    <!-- Release Components -->
    <component
      v-if="component"
      v-on="component.events"
      v-bind="component.props"
      :is="component.is"
      :class="{'pb-6' : isMobile}">
    </component>

  </v-layout>
</template>

<script>

  // Components
  import Card from '@components/release/card'
  import Episodes from '@components/release/episodes'
  import Comments from '@components/release/comments'

  // Routes
  import {toVideo} from "@utils/router/views";

  // Utils
  import {mapState, mapActions} from 'vuex'

  // Mixin
  import {DeviceMixin} from "@mixins/app";

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
    mixins: [
      DeviceMixin
    ],
    components: {
      Card,
      Episodes,
      Comments
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
            is: Episodes,
            props: {
              loading: this.loading,
              release: this._release,
              episodes: this.episodes,
            },
            events: {episode: episode => toVideo(this._release, episode)},
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
      ...mapActions('release', {_getRelease: 'getRelease'}),
    },

    watch: {

      releaseId: {
        immediate: true,
        async handler(releaseId) {

          // Scroll to top
          document.getElementById('container').scrollTo(0, 0);

          // Update if release data changed
          if (this._release === null || this._release.id !== parseInt(releaseId)) {

            // Start loading
            // Get release data
            this.loading = true;
            await this._getRelease(releaseId);

            // Reset loading state
            this.loading = false;

          }
        }
      }
    }
  }
</script>
