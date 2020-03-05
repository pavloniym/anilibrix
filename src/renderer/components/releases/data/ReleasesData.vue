<template>
  <v-layout class="release__data">
    <div :style="{width: '5%'}"></div>
    <div :style="{width: '90%'}">

      <div class="display-2 font-weight-black text-truncate">{{release.names.ru}}</div>
      <div class="subtitle-1">{{release.names.original}}</div>
      <div class="body-2">{{release.genres.join(' | ')}}</div>
      <v-chip label color="secondary" class="mt-2 subtitle-2 font-weight-black">{{release.episode.title}}</v-chip>
      <div class="my-2 grey--text lighten-1" :style="{maxHeight: '75px'}">
        <v-clamp max-height="75px">{{release.description}}</v-clamp>
      </div>

      <v-layout>
        <v-btn
          v-bind="{loading}"
          :disabled="loading"
          @click="watchRelease(release)">
          Смотреть
        </v-btn>
        <v-btn
          v-bind="{loading}"
          class="ml-1"
          :disabled="loading"
          @click="toRelease">
          Релиз
        </v-btn>
      </v-layout>

    </div>
    <div :style="{width: '5%'}"></div>
  </v-layout>
</template>

<script>

  import VClamp from 'vue-clamp'
  import {mapState} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {VClamp},
    data() {
      return {
        loading: false
      }
    },

    computed: {
      ...mapState('settings/player', ['type'])
    },

    methods: {

      /**
       * Watch release
       * Set player data:
       * -> release title and episode
       * -> stream data
       *
       * @param release
       */
      watchRelease(release) {
        this.loading = true;
        this.$store
          .dispatchPromise('player/setPlayerData', {release, type: this.type})
          .then(() => this.$router.push({name: 'player'}))
          .finally(() => this.loading = false);
      },


      /**
       * Go to release
       *
       * @return void
       */
      toRelease() {
        this.$router.push({
          name: 'release',
          params: {releaseId: this.release.id}
        })
      }

    },
  }

</script>

<style lang="scss" scoped>

  .release__data {
    max-height: 300px;
    user-select: none;
  }

</style>
