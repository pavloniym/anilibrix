<template>
  <player-layout ref="container">

    <!-- Player is loading -->
    <player-loading v-bind="{isReady, release, episode}">

      <!-- Player is buffering -->
      <player-buffering v-bind="{isBuffering, isReady}">

        <!-- Player video container -->
        <player-video
          v-bind="{episode}"
          @is-ready="isReady = $event"
          @is-buffering="isBuffering = $event"
          @no-source="toNoSource">

          <!-- Player interface -->
          <template v-slot="{plyr, sources, source}">
            <player-interface
              v-bind="{plyr, sources, source, release, episode}"
              :container="$refs.container.$el"
              @back="goBack">
            </player-interface>
          </template>

        </player-video>
      </player-buffering>
    </player-loading>
  </player-layout>
</template>

<script>


  import PlayerLayout from '@layouts/player'
  import {
    PlayerVideo,
    PlayerLoading,
    PlayerBuffering,
    PlayerInterface,
  } from '@components/player'

  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      PlayerVideo,
      PlayerLayout,
      PlayerLoading,
      PlayerBuffering,
      PlayerInterface,
    },
    data() {
      return {
        isReady: false,
        isBuffering: false,
      }
    },
    computed: {
      ...mapState('player', {
        release: s => s.release,
        episode: s => s.episode,
      }),


    },

    methods: {
      ...mapActions('player', ['clear']),


      /**
       * Return to back
       *
       * @return void
       */
      goBack() {
        this.$router.back();
      },


      /**
       * Go to no-source view
       *
       * @return void
       */
      toNoSource() {
        this.$router.replace({
          name: 'player.no-source'
        })
      }

    },


    destroyed() {

      // Clear player data
      setTimeout(() => this.clear(), 500);
    },


  }
</script>
