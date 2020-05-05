<template>
  <v-layout fill-height column align-center justify-center>

    <!-- Noise -->
    <blank-noise />

    <!-- Message -->
    <div class="text-center caption" :style="{zIndex: 1}">
      <div>{{text}}</div>
      <div>{{error}}</div>
      <v-btn text class="mt-5" @click="toReleases">Назад</v-btn>
    </div>

  </v-layout>
</template>

<script>

  import BlankNoise from './components/noise';

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

      /**
       * Go back
       *
       * @return void
       */
      toReleases() {
        this.$router.replace({
          name: 'releases'
        })
      },

    }

  }
</script>
