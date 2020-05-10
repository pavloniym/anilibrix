<template>
  <v-layout fill-height align-center justify-center>
    <loader-logo class="app__loader"/>
  </v-layout>
</template>

<script>

  import LoaderLogo from './components/logo'

  export default {
    components: {
      LoaderLogo
    },
  }
</script>

<style lang="scss" scoped>

  .app {
    &__loader {
      height: 120px;
      width: 120px;
    }
  }

</style>
