<template>
  <v-card color="transparent" @click="$emit('click')">
    <v-layout align-start>

      <v-card width="160" height="240" min-width="160" min-height="240" :style="{position: 'relative'}">
        <v-img width="160" height="240" :src="image"/>
        <v-progress-linear color="secondary" :value="progress" :style="{position: 'absolute', bottom: 0}"/>
      </v-card>

      <div>
        <v-card-title v-text="title"/>
        <v-card-subtitle v-if="subtitle"  v-text="subtitle" class="pb-0" />
        <v-card-subtitle v-if="genres" v-text="(genres || []).join(' | ')" class="pt-0" />

        <!-- Meta -->
        <!-- Description -->
        <v-card-text>
          <v-chip v-text="year" label class="mb-1"/>
          <v-chip v-text="type" label class="mb-1"/>
          <div v-if="description" class="my-2 grey--text" :style="{maxHeight: '75px'}">
            <v-clamp max-height="75px">{{description}}</v-clamp>
          </div>
        </v-card-text>
      </div>

    </v-layout>
  </v-card>
</template>

<script>

  import VClamp from 'vue-clamp'


  const props = {
    id: {
      type: Number,
      default: null
    },
    poster: {
      type: Object,
      default: null
    },
    names: {
      type: Object,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    genres: {
      type: Array,
      default: null
    },
    year: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null,
    },
    episodes: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    components: {
      VClamp
    },
    computed: {

      /**
       * Get image
       *
       * @return {*}
       */
      image() {
        return this.$__get(this.poster, 'image')
      },


      /**
       * Get title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.names, 'ru');
      },


      /**
       * Get subtitle
       *
       * @return {string}
       */
      subtitle() {
        return this.$__get(this.names, 'original')
      },


      /**
       * Get release watch progress
       *
       * @return {number}
       */
      progress() {
        const getReleaseProgress = this.$store.getters['app/watch/getReleaseProgress'];
        return getReleaseProgress({releaseId: this.id, totalEpisodesNumber: (this.episodes || []).length});
      }

    }
  }

</script>
