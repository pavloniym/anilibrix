<template>
  <v-layout fill-height align-center justify-center>
    <div class="app__loader">
      <loader-logo />
    </div>
  </v-layout>
</template>

<script>

  import LoaderLogo from './components/logo'
  export default {
    components: {LoaderLogo},
  }
</script>

<style lang="scss" scoped>

  .app__loader {
    height: 80px;
    width: 80px;
  }

</style>
