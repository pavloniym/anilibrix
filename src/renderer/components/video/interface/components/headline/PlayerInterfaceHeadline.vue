<template>
  <v-layout justify-space-between :style="{lineHeight: 1}">

    <div v-if="caption && title" class="d-flex flex-column justify-end">
      <h4 class="pb-1">{{caption}}</h4>
      <h1>{{title}}</h1>
    </div>

    <div
      v-if="isReady && currentTime > 0 && totalDuration > 0"
      class="d-flex align-self-end font-weight-bold"
      :style="{fontSize: '.8rem'}">

      {{time}} / {{duration}}

    </div>

  </v-layout>
</template>

<script>

  import __get from 'lodash/get'

  const props = {
    player: {
      type: Object,
      default: null
    },
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
    data() {
      return {
        isReady: false,
        currentTime: null,
        totalDuration: 0,
      }
    },

    computed: {

      /**
       * Get episode caption
       *
       * @return {*}
       */
      caption() {
        return __get(this.release, 'names.ru');
      },


      /**
       * Get episode title
       *
       * @return {*}
       */
      title() {
        return __get(this.episode, 'title');
      },


      /**
       * Get total duration in human format
       *
       * @return string
       */
      duration() {
        return this.convertTimeToHuman(this.totalDuration);
      },

      /**
       * Get current time in human format
       *
       * @return {*}
       */
      time() {
        return this.convertTimeToHuman(this.currentTime);
      }
    },

    methods: {

      /**
       * Convert seconds to human readable format
       *
       * @param secs
       * @return {string}
       */
      convertTimeToHuman(secs) {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
          .map(v => v < 10 ? '0' + v : v)
          .filter((v, i) => v !== '00' || i > 0)
          .join(':')
      },

    },

    mounted() {
      this.$nextTick(() => {

        // Get duration on initial start
        this.player.on('progress', e => this.totalDuration = __get(e, 'detail.plyr.duration'));

        // Update current player position on time update
        // If now seek event is running
        this.player.on('timeupdate', () => this.currentTime = this.player.currentTime);

        // Set loaded metadata ready state
        this.player.on('loadedmetadata', () => this.isReady = true);
      })
    }

  }

</script>
