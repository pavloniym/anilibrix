<template>
  <v-fade-transition appear>
    <div v-if="isBuffering" class="player__buffering">
        <v-progress-circular color="white" indeterminate size="64"/>
    </div>
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
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -32px;
      margin-top: -32px;
    }
  }

</style>
