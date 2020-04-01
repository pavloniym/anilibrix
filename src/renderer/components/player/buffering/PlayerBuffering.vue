<template>
  <v-layout column class="fill-height">

    <!-- Content -->
    <slot />

    <!-- Loader -->
    <v-fade-transition appear>
      <v-layout
        v-if="isReady && isBuffering"
        class="player__buffering"
        fill-height
        align-center
        justify-center>

        <v-progress-circular color="white" indeterminate size="64"/>

      </v-layout>
    </v-fade-transition>

  </v-layout>
</template>

<script>

  const props = {
    isReady: {
      type: Boolean,
      default: false
    },
    isBuffering: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
  }
</script>

<style scoped lang="scss">

  .player {
    &__buffering {
      z-index: 1;
      position: absolute;
      width: 100%;
    }
  }

</style>
