<template>
  <v-layout v-if="is_ready && current_time && total_duration" align-end class="shrink duration font-weight-bold">
    {{time}} / {{duration}}
  </v-layout>
</template>

<script>


  import humanTime from "@/renderer/src/utils/strings/human-time";

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
        is_ready: false,
        current_time: 0,
        total_duration: 0,
      }
    },
    computed: {

      /**
       * Get total duration in human format
       *
       * @return string
       */
      duration() {
        return humanTime(this.total_duration);
      },

      /**
       * Get current time in human format
       *
       * @return {*}
       */
      time() {
        return humanTime(this.current_time);
      }
    },


    mounted() {
      this.$nextTick(() => {

        // Get duration on initial start
        this.player.on('progress', e => this.total_duration = this.$__get(e, 'detail.plyr.duration'));

        // Update current player position on time update
        // If now seek event is running
        this.player.on('timeupdate', () => this.current_time = this.player.currentTime);

        // Set loaded metadata ready state
        this.player.on('loadedmetadata', () => this.is_ready = true);
      })
    }

  }
</script>

<style scoped lang="scss">

  .duration {
    font-size: .8rem;
  }

</style>
