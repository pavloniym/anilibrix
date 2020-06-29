<template>
  <v-layout
    column
    fill-height
    id="container"
    class="base-layout"
    :class="{'show-scroll': showScroll}">

    <!-- App Toolbar -->
    <!-- Content -->
    <app-tool-bar/>
    <slot/>

  </v-layout>
</template>

<script>

  import AppToolBar from "@components/app/toolbar";

  export default {
    name: "Layout.Base",
    components: {
      AppToolBar
    },
    computed: {

      /**
       * Check if should show scroll
       *
       * @return {*|boolean}
       */
      showScroll() {
        return this.$__get(this.$route, 'meta.layout.show_scroll') || false;
      },


    }
  }
</script>

<style lang="scss" scoped>

  .base-layout {
    top: 40px;
    padding: 15px 5% 30px 5%;
    position: absolute;
    overflow-y: overlay;
    width: 100%;
    height: calc(100vh - 40px);

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      background-color: transparent;
    }

    &.show-scroll {
      &::-webkit-scrollbar-thumb {
        background-color: #353535;
      }

      &::-webkit-scrollbar {
        background-color: #1d1d1d;
      }
    }
  }

</style>
