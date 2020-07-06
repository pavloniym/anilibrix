<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="grey darken-3 release-card" @click="$emit('click')">
      <v-img aspect-ratio=".7" :src="poster">
        <v-fade-transition mode="out-in">
          <div v-if="hover" class="release-card--reveal grey darken-4 pa-4">

            <div class="body-2 font-weight-bold mb-2">{{title}}</div>


          </div>
        </v-fade-transition>
        <v-progress-linear class="release-card--progress" :value="progress" />
      </v-img>
    </v-card>
  </v-hover>

</template>

<script>

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
       * Get release watch progress
       *
       * @return {number}
       */
      progress() {

        const release_id = this.release.id;
        const total_episodes_number = this.episodes.length;

        return this.$store.getters['app/watch/getReleaseProgress']({release_id, total_episodes_number});
      }

    }

  }
</script>

<style scoped lang="scss">

  .release-card {
    position: relative;

    &--reveal {
      bottom: 0;
      opacity: .85;
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
