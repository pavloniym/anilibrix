<template>
  <div v-if="caption && title" class="d-flex flex-column justify-end">
    <h4 class="pb-1">{{caption}}</h4>
    <h1>{{title}}</h1>
  </div>
</template>

<script>

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
       * Get episode caption
       *
       * @return {*}
       */
      caption() {
        return this.$__get(this.release, 'names.ru');
      },


      /**
       * Get episode title
       *
       * @return {*}
       */
      title() {
        return this.$__get(this.episode, 'title');
      },

    }
  }
</script>
