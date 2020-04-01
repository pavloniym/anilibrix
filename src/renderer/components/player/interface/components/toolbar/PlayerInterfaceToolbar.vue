<template>
  <app-toolbar
    no-update
    no-search
    no-drawer
    class="player__interface__toolbar">
  </app-toolbar>
</template>

<script>

  import AppToolbar from "@components/app/toolbar";

  export default {
    components: {
      AppToolbar
    }
  }
</script>
<style lang="scss" scoped>

  .player {
    &__interface {
      &__toolbar {
        background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 15%, rgba(0, 0, 0, 0.7) 85%);
      }
    }
  }

</style>
