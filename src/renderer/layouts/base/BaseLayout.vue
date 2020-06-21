<template>
  <v-layout column fill-height id="container" class="base-layout">
    <slot/>
  </v-layout>
</template>

<script>

  export default {
    name: "BaseLayout",
  }
</script>

<style lang="scss" scoped>

  .base-layout {
    top:40px;
    padding: 15px 5% 20px 5%;
    position: absolute;
    overflow-y: auto;
    width: 100%;
    bottom: 20px;
  }

</style>
