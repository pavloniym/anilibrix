<template>
  <v-layout class="controls" :class="`controls--${direction}`">
    <v-btn icon :disabled="isDisabled" @click="$emit('click')">
      <v-icon>mdi-arrow-{{direction}}</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>

  const props = {
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: null
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    releases: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Calculate direction
       *
       * @return {string|null}
       */
      direction() {

        if (this.left) return 'left';
        if (this.right) return 'right';

        return null
      },


      /**
       * Check if control is disabled
       *
       * @return {boolean}
       */
      isDisabled() {

        const is_loading = this.loading;
        let is_extremum = false;

        if (this.left) is_extremum = this.value <= 0;
        if (this.right) is_extremum = this.value >= this.releases.length - 1;

        return is_loading || is_extremum;
      }


    }
  }
</script>

<style scoped lang="scss">

  .controls {
    position: absolute;

    &--left {
      left: 0;
      margin-left: -43px;
    }

    &--right {
      right: 0;
      margin-right: -43px;
    }
  }

</style>
