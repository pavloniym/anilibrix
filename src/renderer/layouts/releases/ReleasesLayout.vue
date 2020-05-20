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

  import AppToolBar from '@components/app/toolbar'
  import AppSettings from '@components/app/settings'

  export default {
    components: {
      AppToolBar,
      AppSettings,
    }
  }
</script>
