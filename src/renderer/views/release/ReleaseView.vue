<template>

  <!-- Loading -->
  <v-overlay v-if="loading" :value="true">
    <v-layout column align-center>
      <v-progress-circular indeterminate size="64"/>
      <div class="my-5 caption text-center">
        <div v-if="releaseTitle" class="body-1 font-weight-bold">{{releaseTitle}}</div>
        <div>Загрузка данных по релизу</div>
        <div>Пожалуйста, подождите</div>
      </div>
      <v-btn text @click="toReleases">
        Назад
      </v-btn>
    </v-layout>
  </v-overlay>

  <!-- Release -->
  <release-layout v-else-if="loading === false && release" v-bind="{poster}">
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
        loading: s => s.loading,
        poster: s => s.poster,
        release: s => s.data,
        request: s => s.request,
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
          if (this.release === null || this.release.id !== parseInt(releaseId)) {
            this.getRelease(releaseId);
          }
        }
      }
    }
  }
</script>
