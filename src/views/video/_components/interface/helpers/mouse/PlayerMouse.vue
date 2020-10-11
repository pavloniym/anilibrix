<script>

  import {MouseHandlerMixin} from "@mixins/handlers";

  const props = {
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [MouseHandlerMixin],
    render: () => null,
    methods: {

      /**
       * Handle mouse scroll event
       *
       * @param e
       */
      handleMouseScroll(e) {

        let direction = null;

        if (e.deltaY < 0) direction = 'up';
        if (e.deltaY > 0) direction = 'down';

        this.setVolume(direction);
      },


      /**
       * Set volume
       *
       * @param direction
       */
      setVolume(direction) {

        const current_volume = this.player.volume;
        let updated_volume = current_volume;

        if (direction === 'up' && current_volume < 1) updated_volume = updated_volume + .1;
        if (direction === 'down' && current_volume > 0) updated_volume = updated_volume - .1;

        this.$emit('update:volume', updated_volume);
      }

    }
  }
</script>
