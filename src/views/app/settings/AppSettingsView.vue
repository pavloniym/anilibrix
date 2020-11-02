<template>
  <div>
    <app-settings/>
    <app-settings-credentials class="py-4"/>
  </div>
</template>

<script>

  // Components
  import {AppSettings, AppSettingsCredentials} from '@components/app/settings'

  export default {
    components: {
      AppSettings,
      AppSettingsCredentials
    }
  }
</script>

<style scoped>

</style>
