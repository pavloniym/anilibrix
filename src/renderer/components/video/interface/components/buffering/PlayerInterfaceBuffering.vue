<template>
  <v-fade-transition appear>
    <v-layout
      v-if="isBuffering"
      class="player__buffering"
      fill-height
      align-center
      justify-center>

      <v-progress-circular color="white" indeterminate size="64"/>

    </v-layout>
  </v-fade-transition>
</template>

<script>

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        isBuffering: true,
      }
    },

    created() {

      // Handler buffering events
      this.player.on('waiting', () => this.isBuffering = true);
      this.player.on('emptied', () => this.isBuffering = true);
      this.player.on('stalled', () => this.isBuffering = true);
      this.player.on('playing', () => this.isBuffering = false);

    },
  }
</script>


<style scoped lang="scss">

  .player {
    &__buffering {
      top: 0;
      width: 100%;
      z-index: 1;
      position: absolute;
    }
  }

</style>
