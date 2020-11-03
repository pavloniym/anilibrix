<template>
  <v-layout column fill-height id="container" class="base-layout" :class="{isOnBlack, isWeb, isMobile}">

    <!-- Mobile  -->
    <template v-if="this.isMobile">
      <mobile-toolbar v-if="!toolbarIsHidden" :title="toolbarTitle" :hide-back="toolbarHideBack"/>
      <mobile-navigation/>
    </template>

    <!-- App Toolbar -->
    <!-- Content -->
    <template v-else>
      <app-tool-bar v-if="!toolbarIsHidden"/>
    </template>

    <!-- Content -->
    <slot/>

  </v-layout>
</template>

<script>

  // Components
  import AppToolBar from "@components/app/toolbar";

  // Mobile
  import MobileToolbar from '@components/app/mobile/toolbar'
  import MobileNavigation from '@components/app/mobile/navigation'

  // Mixins
  import {DeviceMixin, PlatformMixin} from "@mixins/app";

  export default {
    name: "Layout.Base",
    mixins: [
      DeviceMixin,
      PlatformMixin
    ],
    components: {
      AppToolBar,
      MobileToolbar,
      MobileNavigation
    },
    computed: {

      /**
       * Check if is on black background
       *
       * @return {*|boolean}
       */
      isOnBlack() {
        return this.$__get(this.$route, 'meta.layout.is_on_black') || false;
      },


      /**
       * Get toolbar title
       * From route meta
       *
       * @return {string|null}
       */
      toolbarTitle() {
        return this.$__get(this.$route, 'meta.layout.toolbar_title')
      },


      /**
       * Check if toolbar is hidden
       *
       * @return {boolean}
       */
      toolbarIsHidden() {
        return this.$__get(this.$route, 'meta.layout.toolbar_is_hidden') || false;
      },


      /**
       * Toolbar hide back
       *
       * @return {boolean|null}
       */
      toolbarHideBack() {
        return this.$__get(this.$route, 'meta.layout.toolbar_hide_back')
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
      bottom: 0;
      height: 100%;
      padding-top: 18px;
      padding-bottom: 18px;
    }

    &.isMobile {
      top: 56px;
      height: auto;
      bottom: calc(44px + 50px + env(safe-area-inset-bottom)) !important;
      padding: 0;
      overflow-y: auto !important;
    }
  }

</style>
