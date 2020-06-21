<template>
  <v-layout
    column
    fill-height
    id="container"
    class="base-layout"
    :class="{'hide-scroll': hideScroll}">
    <slot/>
  </v-layout>
</template>

<script>

  export default {
    name: "Layout.Base",
    computed: {

      /**
       * Check if should hide scroll
       *
       * @return {*|boolean}
       */
      hideScroll() {
        return this.$__get(this.$route, 'meta.layout.hide_scroll') || false;
      }


    }
  }
</script>

<style lang="scss" scoped>

  .base-layout {
    top: 40px;
    padding: 15px 5% 30px 5%;
    position: absolute;
    overflow-y: scroll;
    width: 100%;
    height: calc(100vh - 40px);

    &.hide-scroll {

      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      &::-webkit-scrollbar {
        background-color: transparent;
      }
    }

  }

</style>
