<template>
  <v-layout v-if="is_loading || _release" column :class="{'py-6': !this.isMobile}">

    <!-- Release Card -->
    <card class="mb-2" :loading="is_loading" :release="_release"/>

    <!-- Release Tabs -->
    <v-tabs v-if="!is_loading" v-model="tab" class="shrink mb-6" background-color="transparent">
      <v-tab>Эпизоды</v-tab>
      <v-tab>Комментарии</v-tab>
    </v-tabs>

    <!-- Release Components -->
    <component
      v-if="component"
      v-on="component.events"
      v-bind="component.props"
      :is="component.is"
      :class="{'pb-6' : this.isMobile}">
    </component>

  </v-layout>
</template>

<script>

  // Components
  import Card from '@components/release/card'
  import Episodes from '@components/release/episodes'
  import Comments from '@components/release/comments'

  // Routes
  import {toVideo} from "@router/video/videoRoutes";

  // Utils
  import {mapState, mapActions} from 'vuex'

  // Mixin
  import {DeviceMixin} from "@mixins/app";

  const props = {
    release_id: {
      type: [String, Number],
      default: null
    },
  };

  export default {
    props,
    name: "Release.View",
    meta() {
      return {
        title: this._release
          ? `Релиз: ${this._release.names.ru} — ${this._release.names.original}`
          : `Anilibrix: загрузка релиза ${this.release_id}`
      }
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
        is_loading: false,
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
              release: this._release,
              episodes: this.episodes,
              is_loading: this.is_loading,
            },
            events: {'play:episode': episode => toVideo(this._release.id, episode.id)},
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


    mounted() {
      window.scrollTo(0, 0);
    },

    watch: {

      release_id: {
        immediate: true,
        async handler(release_id) {

          // Scroll to top
          const container = document.getElementById('container');
          if (container) container.scrollTo(0, 0);

          // Update if release data changed
          if (this._release === null || this._release.id !== parseInt(release_id)) {

            // Start loading
            this.is_loading = true;

            // Get release data
            await this._getRelease(release_id);

            // Reset loading state
            this.is_loading = false;

            // Hit visit
            this.$visit(this.$route.path, this.$metaInfo.title);
          }
        }
      }
    }
  }
</script>
