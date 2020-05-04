<template>
  <div :style="{width: '40px'}">

    <!-- Seen state -->
    <template v-if="isSeen">
      <v-btn icon>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </template>

    <!-- Progress state -->
    <template v-if="isInProgress">
      <v-progress-circular size="24" color="grey" :value="percentage" :rotate="-90"/>
    </template>
  </div>

</template>

<script>

  import __get from 'lodash/get'

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,

    computed: {

      /**
       * Get watch data
       * @return {*}
       */
      watchData() {
        return this.$store.getters['firebase/watch/getData']({
          releaseId: this.release ? this.release.id : null,
          episodeId: this.episode ? this.episode.id : null
        });
      },


      /**
       * Get episode watch percentage
       *
       * @return {number}
       */
      percentage() {
        return __get(this.watchData, 'percentage') || 0;
      },

      /**
       * Check if episode is seen
       *
       * @return {boolean}
       */
      isSeen() {
        return __get(this.watchData, 'isSeen') || false;
      },


      /**
       * Check if episode is in progress
       *
       * @return {boolean}
       */
      isInProgress() {
        return this.isSeen === false && this.percentage > 0;
      }

    }
  }
</script>
