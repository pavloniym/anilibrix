<template>
  <v-card
    class="black"
    width="14.5vw"
    height="34.5vh"
    min-width="175"
    min-height="250"
    :class="{primary: active}"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')">

    <v-img
      v-if="src"
      v-bind="{key, src}"
      eager
      height="100%"
      class="black"
      :class="{'elevation-16': active}">

      <div v-if="!active" class="fill-height" :style="{background: 'black', opacity: .75}"></div>

    </v-img>

  </v-card>
</template>

<script>

  const props = {
    release: {
      type: Object,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    computed: {


      /**
       * Get get
       *
       * @return {string}
       */
      key() {
        return `poster:${this.release ? this.release.id : null}`
      },


      /**
       * Get poster full src
       *
       * @return {string|null}
       */
      src() {
        return this.$__get(this.release, 'poster');
      }


    }
  }
</script>
