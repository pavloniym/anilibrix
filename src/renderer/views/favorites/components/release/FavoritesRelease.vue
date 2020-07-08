<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="grey darken-3 release-card" @click="$emit('click')">
      <v-img aspect-ratio=".7" :src="poster">

        <v-fade-transition mode="out-in">
          <div v-if="hover" class="release-card--reveal grey darken-4 pa-4">

            <!-- Title -->
            <!-- Description -->
            <div class="body-2 font-weight-bold mb-2">{{title}}</div>
            <v-clamp autoresize class="caption" max-height="80%" :style="{hyphens: 'auto'}">
              {{description}}
            </v-clamp>


            <!-- Release Progress -->
            <v-progress-linear class="release-card--progress mx-n4" height="25" color="secondary" :value="progress">
              <template v-slot>
                <div class="caption white--text font-weight-bold">{{watched}} из {{episodes.length}}</div>
              </template>
            </v-progress-linear>

          </div>
        </v-fade-transition>

        <!-- Release Progress -->
        <v-slide-y-reverse-transition>
          <v-progress-linear
            v-if="!hover"
            class="release-card--progress"
            color="secondary"
            :value="progress">
          </v-progress-linear>
        </v-slide-y-reverse-transition>

      </v-img>
    </v-card>
  </v-hover>
</template>

<script>

  import VClamp from 'vue-clamp'
  import pluralize from "@utils/strings/pluralize";

  const props = {
    release: {
      type: Object,
      default: null
    },
    showSeen: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    components: {
      VClamp
    },
    computed: {

      /**
       * Get release poster image
       *
       * @return {string}
       */
      poster() {
        return this.$__get(this.release, 'poster.image') || ''
      },


      /**
       * Get release title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.release, 'names.ru')
      },

      /**
       * Get episodes
       *
       * @return {array}
       */
      episodes() {
        return this.$__get(this.release, 'episodes') || [];
      },


      /**
       * Get description
       *
       * @return {string}
       */
      description() {
        return this.$__get(this.release, 'description')
      },


      /**
       * Get release watch progress
       *
       * @return {number}
       */
      progress() {

        const release_id = this.release.id;
        const total_episodes_number = this.episodes.length;

        return this.$store.getters['app/watch/getReleaseProgress']({release_id, total_episodes_number});
      },


      /**
       * Get watched episodes
       *
       * @return {*}
       */
      watched() {

        const release_id = this.release.id;
        const total_episodes_number = this.episodes.length;
        const payload = {release_id, total_episodes_number};

        // Get watched episodes
        // Convert to string with suffix
        const watched_episodes = this.$store.getters['app/watch/getReleaseWatchedEpisodes'](payload);
        return pluralize(watched_episodes.length, ['эпизод', 'эпизода', 'эпизодов'])

      }

    }

  }
</script>

<style scoped lang="scss">

  .release-card {
    position: relative;
    display: flex;

    &--reveal {
      bottom: 0;
      opacity: .9;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    &--progress {
      position: absolute;
      bottom: 0;
    }
  }

</style>
