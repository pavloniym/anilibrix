<template>
  <v-layout column class="fill-height">

    <!-- Content -->
    <slot v-show="isReady"/>

    <!-- Loading -->
    <v-overlay v-show="isReady === false" :value="true" absolute>
      <v-layout column align-center>
        <v-progress-circular indeterminate size="64"/>
        <div class="my-5 caption text-center">
          <div v-if="release && release.names" class="body-1 font-weight-bold">{{release.names.ru}}</div>
          <div v-if="episode && episode.title" class="body-1 font-weight-bold">{{episode.title}}</div>
          <div>Загрузка серии ...</div>
          <div>Пожалуйста, подождите</div>
        </div>
        <v-btn text @click="goBack">
          Назад
        </v-btn>
      </v-layout>
    </v-overlay>

  </v-layout>
</template>

<script>

  const props = {
    isReady: {
      type: Boolean,
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
    methods: {

      /**
       * Go back
       *
       * @return void
       */
      goBack() {
        this.$router.back();
      }
    }
  }

</script>
