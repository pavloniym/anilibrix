<template>
  <div class="release">

    <!-- Toolbar -->
    <app-tool-bar no-update>
      <template v-slot:left>
        <v-btn icon @click="toReleases">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </app-tool-bar>

    <!-- Settings -->
    <app-settings/>


    <!-- Content -->
    <v-content class="px-4">
      <slot/>
    </v-content>

  </div>
</template>

<script>

  import {AppToolBar} from '@components/app/bars'
  import AppSettings from '@components/app/settings'

  export default {
    components: {
      AppToolBar,
      AppSettings,
    },

    methods: {

      /**
       * Go to releases page
       *
       * @return void
       */
      toReleases() {
        this.$router.push({
          name: 'releases'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  .release {
    top: 0;
    width: 100%;
    bottom: 0;
    position: absolute;
    padding-bottom: 32px;
    overflow-y: scroll;
  }


</style>
