<template>

  <!-- Loading -->
  <v-overlay v-if="_loading" :value="true">
    <v-layout align-center>
      <v-progress-circular indeterminate size="78"/>

      <div class="ml-8 caption">
        <div v-if="releaseTitle" class="title">{{releaseTitle}}</div>
        <div class="caption">Загрузка данных по релизу ...</div>
        <div class="mt-4">
          <v-btn @click="toReleases">Назад</v-btn>
        </div>
      </div>

    </v-layout>
  </v-overlay>


  <!-- Release -->
  <release-layout v-else-if="_loading === false && _release" :poster="_poster">
    <release-card/>
    <release-playlist class="my-6"/>
  </release-layout>
</template>

<script>

  import ReleaseLayout from '@layouts/release'
  import {ReleaseCard, ReleasePlaylist} from '@components/release'
  import {mapState, mapActions} from 'vuex'

  const props = {
    releaseId: {
      type: [String, Number],
      default: null
    },
    releaseTitle: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    name: "Release",
    components: {
      ReleaseLayout,
      ReleaseCard,
      ReleasePlaylist,
    },

    computed: {
      ...mapState('release', {
        _poster: s => s.poster,
        _loading: s => s.loading,
        _release: s => s.data
      })
    },

    methods: {
      ...mapActions('release', ['getRelease']),


      /**
       * Go back to releases page
       *
       * @return void
       */
      toReleases() {
        this.$router.push({
          name: 'releases'
        });
      }

    },

    watch: {
      releaseId: {
        immediate: true,
        handler(releaseId) {

          // Update if release data changed
          if (this._release === null || this._release.id !== parseInt(releaseId)) {
            this.getRelease(releaseId);
          }
        }
      }
    }
  }
</script>
