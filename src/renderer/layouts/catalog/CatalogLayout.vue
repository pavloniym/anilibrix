<template>
  <v-layout fill-height column>

    <app-tool-bar no-catalog no-search no-update>
      <template v-slot:left>
        <v-btn icon @click="toReleases">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </app-tool-bar>

    <app-settings/>
    <v-content>
      <slot />
    </v-content>
  </v-layout>
</template>

<script>

  import AppSettings from '@components/app/settings'
  import {AppSystemBar, AppToolBar} from '@components/app/bars'

  export default {
    components: {
      AppToolBar,
      AppSettings,
      AppSystemBar,
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
