<template>
  <div class="seek__timer secondary">
    {{time}}
  </div>
</template>

<script>

  // Utils
  import humanizeTime from "@utils/strings/human-time";

  const props = {
    value: {
      type: Number,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get time
       *
       * @return {*}
       */
      time() {
        return this.value ? humanizeTime(this.value) : null;
      }

    }
  }
</script>


<style scoped lang="scss">

  .seek__timer {
    width: 60px !important;
    height: 30px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .75rem;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }


</style>
