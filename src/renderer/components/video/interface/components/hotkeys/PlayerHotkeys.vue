<script>

  import {mapActions, mapState} from "vuex";

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    render: () => null,

    computed: {
      ...mapState('app/settings/player', {_speed: s => s.speed}),
    },

    methods: {
      ...mapActions('app/settings/player', {_setSpeed: 'setSpeed'}),

      /**
       * Handle keyboard event
       *
       * @param e
       * @return void
       */
      handleKeyboardEvent(e) {
        if (e.which === 39 || e.which === 37) this.$emit('update:interface');
        if (e.which === 32) this.$emit('toggle:play');
        if (e.code === 'KeyF') this.$emit('toggle:fullscreen');
        if (e.which === 190 && e.shiftKey) this.setSpeed(0.25);
        if (e.which === 188 && e.shiftKey) this.setSpeed(-0.25);
      },



      /**
       * Set speed
       *
       * @param shift
       */
      setSpeed(shift) {
        const speed = this._speed + shift;
        if (speed >= 0.5 && speed <= 2) this._setSpeed(speed);
      }

    },

    mounted() {
      window.addEventListener('keydown', this.handleKeyboardEvent);
    },

    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeyboardEvent);
    }
  }
</script>
