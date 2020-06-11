<template>
    <div v-show="visible" ref="button" class="playback__button">
      <v-icon size="35">{{icon}}</v-icon>
    </div>
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
        initialized: false,
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

        if(this.$refs.button) {
          this.$refs.button.style.animation = 'none';
          this.$refs.button.offsetHeight; /* trigger reflow */
          this.$refs.button.style.animation = null;
        }

        // Clear timeout
        // Hide button
        this.$nextTick(() => {
          if (this.handler) clearTimeout(this.handler);
          this.handler = setTimeout(() => this.visible = false, 600);
        })
      },
    },

    created() {

      // Catch player events to show button
      // Prevent from show play button on start -> use initialized state
      this.player.on('play', () => this.initialized ? this.showButton({icon: 'mdi-play'}) : null);


      // Catch player pause event
      // After first pause -> set initialized state
      this.player.on('pause', () => {
        this.initialized = true;
        this.showButton({icon: 'mdi-pause'})
      });
    }

  }
</script>
<style scoped lang="scss">

  .playback {
    &__button {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -35px;
      margin-top: -35px;
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
