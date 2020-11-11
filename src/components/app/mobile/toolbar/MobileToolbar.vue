<template>
  <v-app-bar app :style="toolbarStyles">

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

  // Utils
  import safeAreaInsets from "safe-area-insets";

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
    mixins: [BackRouteMixin],
    computed: {

      /**
       * Get toolbar styles
       *
       * @return {*}
       */
      toolbarStyles() {
        return {
          paddingTop: safeAreaInsets.top + 'px',
        }
      },


    }
  }
</script>
