<template>
  <v-layout column align-center justify-center>

    <!-- Noise -->
    <blank-noise/>

    <!-- Message -->
    <div class="text-center caption" :style="{zIndex: 1}">
      <div>{{text}}</div>
      <div>{{error}}</div>
      <v-btn text class="mt-5" @click="toReleases">Назад</v-btn>
    </div>

  </v-layout>
</template>

<script>

  // Components
  import BlankNoise from './components/noise';

  // Routes
  import {toReleases} from "@router/releases/releasesRoutes";

  const props = {
    message: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    meta() {
      return {
        title: `Ошибка воспроизведения: ${this.text}`
      }
    },
    components: {
      BlankNoise
    },

    computed: {

      /**
       * Get blank message
       *
       * @return {string}
       */
      text() {
        return this.message || 'При загрузке эпизода произошла ошибка'
      }

    },

    methods: {
      ...{toReleases}
    },


    mounted() {
      this.$visit(this.$route.path, this.$metaInfo.title);
    }

  }
</script>
