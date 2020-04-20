<template>
  <v-layout fill-height column>

    <app-tool-bar no-update flat color="dark">
      <template v-slot:left>

        <!-- Return to releases page -->
        <v-btn icon @click="toReleases">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

      </template>
    </app-tool-bar>
    <app-settings/>


    <!-- Content -->
    <v-content class="release px-4">
      <div class="release__poster mx-n4" :style="{backgroundImage: `url('${poster}')`}">
        <span></span>
      </div>
      <slot/>
    </v-content>

  </v-layout>
</template>

<script>

  import AppSettings from '@components/app/settings'
  import {AppSystemBar, AppToolBar} from '@components/app/bars'

  import {mapActions} from 'vuex'

  const props = {
    poster: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    components: {
      AppToolBar,
      AppSettings,
      AppSystemBar,
    },

    methods: {
      ...mapActions('release', ['clearRelease']),

      /**
       * Go to releases page
       * Clear release data
       *
       * @return void
       */
      toReleases() {

        // Go to releases
        this.$router.push({name: 'releases'});

        // Clear release data
        this.clearRelease();
      }
    }
  }
</script>

<style lang="scss" scoped>

  .release {
    position: relative;
    overflow-y: scroll;
    height: 100vh;

    &__poster {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.15;
      background-size: cover;
      background-position: center;
      pointer-events: none;
      -webkit-filter: grayscale(100%);

      > span {
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: rgb(0, 0, 0);
        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 30%, rgba(255, 255, 255, 0) 100%);
      }
    }

  }


</style>
