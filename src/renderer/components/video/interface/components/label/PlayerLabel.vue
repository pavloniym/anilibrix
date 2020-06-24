<template>
  <div v-show="visible" ref="button" class="playback__button">
    <v-icon v-if="icon" size="32">{{icon}}</v-icon>
    <span v-if="content" class="font-weight-bold">{{content}}</span>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  const props = {
    player: {
      type: Object,
      default: null
    },
    payload: {
      type: [String, Object],
      default: null
    },
    time: {
      type: Number,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        icon: null,
        content: null,
        handler: null,
        visible: false,

        initialized_play: false,
        initialized_speed: false,
      }
    },

    computed: {
      ...mapState('app/settings/player', {_speed: s => s.speed})
    },

    methods: {

      /**
       * Show button
       *
       * @param icon
       * @param content
       */
      showLabel({icon = null, content = null}) {

        // Show button
        this.icon = icon || null;
        this.content = content || null;
        this.visible = true;

        if (this.$refs.button) {
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


      /**
       * Play handler
       *
       * @return {void}
       */
      playHandler() {
        if(this.initialized_play) {
          this.showLabel({icon: 'mdi-play'});
        }
        this.initialized_play = true;
      },


      /**
       * Pause handler
       *
       * @return {void}
       */
      pauseHandler() {
        this.showLabel({icon: 'mdi-pause'})
      },


      /**
       * Seeking handler
       *
       * @return {void}
       */
      seekingHandler() {
        const forward = this.time < this.player.currentTime;
        const backward = this.time > this.player.currentTime;

        if (forward || backward) {
          let icon = null;
          if (forward) icon = 'mdi-fast-forward';
          if (backward) icon = 'mdi-rewind';
          if (icon) this.showLabel({icon})
        }
      },


      /**
       * Speed handler
       *
       * @return {void}
       */
      speedHandler() {
        if(this.initialized_speed) {
          this.showLabel({content: `${this._speed}x`});
        }
        this.initialized_speed = true;
      }

    },

    created() {

      // Catch player events to show button
      // Prevent from show play button on start -> use initialized state
      this.player.on('play', this.playHandler);

      // Catch player pause event
      // After first pause -> set initialized state
      this.player.on('pause', this.pauseHandler);

      // Seeking handler
      this.player.on('seeking', this.seekingHandler);

      // Speed handler
      this.player.on('ratechange', this.speedHandler)

    },

    watch: {
      payload: {
        deep: true,
        handler() {
          this.initialized = false;
        }
      }
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
      background: rgba(0, 0, 0, 0.30);
      border-radius: 50%;
      animation: playing .65s;
      pointer-events: none;

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
