<template>
  <main-layout>
    <v-carousel continuous hide-delimiters>
      <v-carousel-item
        v-for="release in _releases"
        transition="fade-transition"
        reverse-transition="fade-transition"
        :key="release.id">

        <v-layout column class="px-4">

          <!--<div>серия</div>-->
          <div class="display-2 font-weight-black">{{release.names.ru}}</div>
          <div class="subtitle-1 grey--text">{{release.names.original}}</div>
          <div class="body-2 grey--text">{{release.genres.join(' | ')}}</div>
          <div class="my-4 grey--text">{{release.description}}</div>

          <v-btn @click="watchRelease(release)">Смотреть</v-btn>

        </v-layout>

      </v-carousel-item>
    </v-carousel>
  </main-layout>
</template>

<script>
  import MainLayout from '@layouts/main'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'HomeView',
    components: {MainLayout},
    computed: {
      ...mapState('releases', {_releases: s => s.items || []})
    },

    methods: {
      ...mapActions('player', ['setTitleData', 'setStreamData']),

      watchRelease(release) {

        this.setTitleData({name: release.names.ru, episode: '1 серия'});
        this.setStreamData({...release.player.stream});

        this.$router.push({name: 'player.stream'});
      }

    }
  }
</script>

<style scoped>

</style>
