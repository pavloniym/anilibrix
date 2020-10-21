<template>
  <v-fade-transition appear>
    <div v-if="is_buffering" class="player__buffering">
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
        is_buffering: true,
      }
    },

    created() {

      // Handler buffering events
      this.player.on('waiting', () => this.is_buffering = true);
      this.player.on('emptied', () => this.is_buffering = true);
      this.player.on('stalled', () => this.is_buffering = true);

      // Reset buffering
      this.player.on('stop', () => this.is_buffering = false);
      this.player.on('error', () => this.is_buffering = false);
      this.player.on('playing', () => this.is_buffering = false);
      this.player.on('progress', () => this.is_buffering = this.player.loading)

    },
  }
</script>


<style scoped lang="scss">

  .player {
    &__buffering {
      top: 50%;
      left: 50%;
      width: 64px;
      height: 64px;
      position: absolute;
      margin-left: -32px;
      margin-top: -32px;
      pointer-events: none;
    }
  }

</style>
