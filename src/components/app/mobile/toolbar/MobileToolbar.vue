<template>
  <v-app-bar app>

    <!-- Back button -->
    <v-btn v-if="!hideBack && this.hasBack" icon @click="this.toBack">
      <v-icon large>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- Toolbar title -->
    <v-toolbar-title v-text="title"/>

  </v-app-bar>
</template>

<script>

  // Mixins
  import {BackRouteMixin} from "@mixins/routes";

  const props = {
    title: {
      type: String,
      default: null
    },
    hideBack: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    mixins: [
      BackRouteMixin
    ]
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
