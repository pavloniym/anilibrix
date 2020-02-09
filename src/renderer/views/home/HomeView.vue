<template>
  <main-layout>
    <v-layout column class="mx-4">


      <!-- Slider -->
      <v-layout align-center>

        <!-- Prev -->
        <div :style="{width: '5%'}" class="d-flex justify-start">
          <v-btn icon :disabled="index <= 0" @click="index--">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </div>

        <!-- Posters -->
        <v-slide-group v-model="index" center-active mandatory :show-arrows="false" :style="{width: '90%'}">

          <template v-slot:prev>
            <div v-show="false"></div>
          </template>

          <v-slide-item v-for="(release, k) in _releases" :key="k" v-slot:default="{ active, toggle }">
            <v-card height="250" width="175" @click="toggle" :class="{primary: active}">
              <v-img
                height="250"
                max-height="250"
                width="175"
                max-width="175"
                ratio="0.7"
                :src="release.poster.image">
              </v-img>
            </v-card>
          </v-slide-item>
        </v-slide-group>


        <!-- Next -->
        <div :style="{width: '5%'}" class="d-flex justify-end">
          <v-btn icon :disabled="index >= _releases.length - 1" @click="index++">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

      </v-layout>


      <!-- Release Info -->
      <v-layout class="my-4">
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
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'HomeView',
    components: {MainLayout},
    data() {
      return {
        index: 0
      }
    },
    computed: {
      ...mapState('releases', {_releases: s => s.items || []}),


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
