<template>
  <v-layout align-center justify-start>

    <!-- Releases -->
    <v-tooltip right>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon large @click="toReleases">
          <v-icon size="24">mdi-view-column</v-icon>
        </v-btn>
      </template>
      <span>К списку релизов</span>
    </v-tooltip>


    <!-- Release -->
    <v-tooltip right>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon large class="mx-2" @click="toRelease">
          <v-avatar size="24">
            <img :src="release.poster.image">
          </v-avatar>
        </v-btn>
      </template>
      <span>{{release.names.ru}}</span>
    </v-tooltip>


    <!-- Playlist -->
    <v-tooltip right>
      <template v-slot:activator="{on}">
        <v-btn
          v-on="on"
          icon
          large
          :class="playlist ? 'primary black--text' : null"
          @click="$emit('update:playlist', !playlist)">

          <v-icon size="24">mdi-playlist-play</v-icon>

        </v-btn>
      </template>
      <span>Плейлист</span>
    </v-tooltip>

  </v-layout>
</template>

<script>

  const props = {
    release: {
      type: Object,
      default: null
    },
    playlist: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    methods: {


      /**
       * Go to releases
       *
       * @return void
       */
      toReleases() {
        this.$router.push({
          name: 'releases'
        })
      },


      /**
       * Go to release
       *
       * @return void
       */
      toRelease() {
        this.$router.push({
          name: 'release',
          params: {
            releaseId: this.release.id,
          }
        })
      }

    }
  }
</script>
