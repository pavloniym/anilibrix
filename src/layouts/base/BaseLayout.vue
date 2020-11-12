<template>
  <v-main>
    <v-layout column id="container" class="layout--container" :class="layoutClasses" :style="layoutStyles">

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
  </v-main>
</template>

<script>

  // Components
  import AppToolBar from "@components/app/toolbar";

  // Mobile
  import MobileToolbar from '@components/app/mobile/toolbar'
  import MobileNavigation from '@components/app/mobile/navigation'

  // Mixins
  import {DeviceMixin, PlatformMixin} from "@mixins/app";

  // Utils
  import safeAreaInsets from 'safe-area-insets'

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
          'px-8': !this.isMobile,
          'is-on-black': this.$__get(this.$route, 'meta.layout.is_on_black') === true
        }
      },


      /**
       * Get layout styles
       *
       * @return {*}
       */
      layoutStyles() {
        return {
          paddingTop: safeAreaInsets.top + 'px'
        }
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

  .layout--container {
    min-height: 100%;

    &.is-on-black {
      background: black;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #353535;
    }

    &::-webkit-scrollbar {
      background-color: #1d1d1d;
    }
  }

</style>
