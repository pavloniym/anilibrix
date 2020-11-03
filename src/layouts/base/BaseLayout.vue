<template>
  <v-layout column fill-height id="container" class="layout__base" :class="layoutClasses" :style="layoutStyles">

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
       * Get layout classes
       *
       * @return {*}
       */
      layoutClasses() {
        return {
          'is-web': this.isWeb,
          'is-mobile': this.isMobile,
          'is-on-black': this.isOnBlack,
        }
      },

      layoutStyles() {
        return {
          paddingTop: this.$vuetify.application.top + 'px',
          paddingBottom: (this.$vuetify.application.bottom + getComputedStyle(document.documentElement).getPropertyValue("--sab")) + 'px',
        }
      },


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
    },

    mounted() {
      console.log(this.$vuetify);
    }
  }
</script>

<style lang="scss" scoped>

  .layout__base {
    width: 100%;
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;

    &.is-on-black {
      background: black;
    }

    &.is-web {

    }

    &.is-mobile {
      overflow-y: auto !important;
    }


    &::-webkit-scrollbar-thumb {
      background-color: #353535;
    }

    &::-webkit-scrollbar {
      background-color: #1d1d1d;
    }
  }

</style>
