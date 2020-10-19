<template>
  <v-app-bar app color="#121212">

    <!-- Back button -->
    <v-btn icon @click="toBack">
      <v-icon large>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- Toolbar title -->
    <v-toolbar-title v-text="title" class="body-1 toolbar__title pl-0"/>

  </v-app-bar>
</template>

<script>



  export default {
    mixins: [

    ],

    computed: {

      /**
       * Get toolbar title
       * From route meta
       *
       * @return {*}
       */
      title() {
        return this.$__get(this.$route, 'meta.toolbar.title')
      }

    }
  }
</script>
<style lang="scss" scoped>

  .toolbar__title {
    left: 0;
    right: 0;
    width: 100%;
    padding: 0;
    z-index: -1;
    position: absolute;
    text-align: center;
  }

</style>
