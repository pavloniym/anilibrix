<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="grey darken-3 release-card" @click="$emit('click')">
      <v-img aspect-ratio=".7" :src="poster">

        <v-fade-transition mode="out-in">
          <div v-if="hover" class="release-card--reveal grey darken-4 pa-4">

            <!-- Title -->
            <div class="body-2 font-weight-bold mb-2">{{title}}</div>

            <!-- Description -->
            <v-clamp autoresize class="caption" max-height="70%" :style="{hyphens: 'auto'}">
              {{description}}
            </v-clamp>

            <!-- Release Progress -->
            <release-progress
              v-bind="{release, episodes}"
              dense
              center
              color="secondary"
              class="release-card--progress mx-n4"
              height="25">
            </release-progress>

          </div>
        </v-fade-transition>

        <!-- Release Progress -->
        <release-progress
          v-if="!hover"
          v-bind="{release, episodes}"
          color="secondary"
          class="release-card--progress"
          height="5"
          :show-numbers="false">
        </release-progress>

      </v-img>
    </v-card>
  </v-hover>
</template>

<script>

  import VClamp from 'vue-clamp'
  import ReleaseProgress from '@components/release/progress'

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
      VClamp,
      ReleaseProgress
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
      bottom: 0;
      position: absolute;
      border-radius: 0;
    }
  }

</style>
