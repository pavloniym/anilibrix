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
        handler: null,
        is_buffering: true,
      }
    },

    created() {
      this.handler = setInterval(() => this.is_buffering = this.player.loading, 200)
    },

    destroyed() {
      if (this.handler) {
        clearInterval(this.handler);
      }
    }
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
