<template>
  <v-fade-transition appear>
    <v-layout class="player__buffering" fill-height align-center justify-center>
      <v-progress-circular color="white" indeterminate size="64"/>
    </v-layout>
  </v-fade-transition>
</template>

<style scoped lang="scss">

  .player {
    &__buffering {
      z-index: 1;
      position: absolute;
      width: 100%;
    }
  }

</style>
