<template>
  <v-layout
    column
    fill-height
    id="container"
    class="base-layout"
    :class="{isOnBlack, isWeb}">

    <!-- App Toolbar -->
    <!-- Content -->
    <app-tool-bar/>
    <slot/>

  </v-layout>
</template>

<script>

  // Components
  import AppToolBar from "@components/app/toolbar";

  // Mixins
  import {DeviceMixin, PlatformMixin} from "@mixins/app";

  export default {
    name: "Layout.Base",
    mixins: [
      DeviceMixin,
      PlatformMixin
    ],
    components: {
      AppToolBar
    },
    computed: {

      /**
       * Check if is on black background
       *
       * @return {*|boolean}
       */
      isOnBlack() {
        return this.$__get(this.$route, 'meta.layout.is_on_black') || false;
      }


    }
  }
</script>

<style lang="scss" scoped>

  .base-layout {
    top: 40px;
    padding: 15px 5% 30px 5%;
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    height: calc(100vh - 40px);

    &::-webkit-scrollbar-thumb {
      background-color: #353535;
    }

    &::-webkit-scrollbar {
      background-color: #1d1d1d;
    }

    &.isOnBlack {
      background: black;
    }

    &.isWeb {
      top: 0;
      height: 100%;
      padding-top: 0;
    }
  }

</style>
