<template>
  <v-layout align-center justify-center class="playback">
    <div v-show="visible" ref="button" class="playback__button">
      <v-icon size="35">{{icon}}</v-icon>
    </div>
  </v-layout>
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
        icon: null,
        handler: null,
        visible: false,
      }
    },

    methods: {

      /**
       * Show button
       *
       * @param icon
       */
      showButton({icon}) {

        // Show button
        this.icon = icon || null;
        this.visible = true;

        this.$refs.button.style.animation = 'none';
        this.$refs.button.offsetHeight; /* trigger reflow */
        this.$refs.button.style.animation = null;

        this.$nextTick(() => {

          // Clear timeout
          if (this.handler) clearTimeout(this.handler);

          // Hide button
          this.handler = setTimeout(() => this.visible = false, 600);
        })
      },


      /**
       * Handle keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvent(e) {
        if (e.which === 32) {
          
          if (this.player.playing) this.showButton({icon: 'mdi-pause'});
          if (this.player.paused) this.showButton({icon: 'mdi-play'});

          this.player.togglePlay();
        }
      },

    },

    created() {

      // Set keyboard events
      document.addEventListener('keydown', this.handleKeyboardEvent);
    },


    beforeDestroy() {

      // Remove keyboard events
      document.removeEventListener('keydown', this.handleKeyboardEvent);
    }

  }
</script>
<style scoped lang="scss">

  .playback {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: playing .65s;

      @keyframes playing {
        from {
          transform: scale(1);
          opacity: 1;
        }

        to {
          transform: scale(1.7);
          opacity: 0
        }

      }
    }
  }


</style>
