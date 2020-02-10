<template>
  <main-layout>
    <v-layout column justify-center fill-height class="mx-4">

      <!-- Slider -->
      <titles-slider v-model="index" :items="_releases" :posters="_posters" :style="{height: '250px'}"/>


      <!-- Release Info -->
      <v-layout class="my-4" v-if="release" :style="{height: '250px'}">
        <div :style="{width: '5%'}"></div>
        <div :style="{width: '90%'}">
          <div class="display-2 font-weight-black">{{release.names.ru}}</div>
          <div class="subtitle-1">{{release.names.original}}</div>
          <div class="body-2">{{release.genres.join(' | ')}}</div>
          <div class="my-4">{{release.description}}</div>
          <v-btn @click="watchRelease(release)">Смотреть</v-btn>
        </div>
        <div :style="{width: '5%'}"></div>
      </v-layout>

    </v-layout>
  </main-layout>
</template>

<script>

  import MainLayout from '@layouts/main'
  import TitlesSlider from '@components/titles-slider'

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'HomeView',
    components: {
      MainLayout,
      TitlesSlider,
    },
    data() {
      return {
        index: 0
      }
    },
    computed: {
      ...mapState('releases', {
        _releases: s => s.items || [],
        _posters: s => s.posters || {},
      }),


      /**
       * Get active release
       *
       * @return {*|null}
       */
      release() {
        return this._releases[this.index] || null;
      }

    },

    methods: {
      ...mapActions('player', ['setTitleData', 'setStreamData']),


      /**
       * Watch release
       *
       * @param release
       */
      watchRelease(release) {

        this.setTitleData({name: release.names.ru, episode: '1 серия'});
        this.setStreamData(release.player.stream);

        this.$router.push({name: 'player.stream'});
      }

    }
  }
</script>

<style scoped lang="scss">

  ::v-deep .v-slide-group {
    &__prev, &__next {
      display: none !important;
    }
  }

</style>
