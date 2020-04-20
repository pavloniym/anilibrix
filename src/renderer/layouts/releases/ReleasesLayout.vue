<template>
  <v-layout fill-height column>
    <app-tool-bar/>
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
    }
  }
</script>
