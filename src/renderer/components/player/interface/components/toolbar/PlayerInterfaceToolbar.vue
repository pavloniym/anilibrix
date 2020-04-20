<template>
  <div class="player__interface__toolbar">
    <app-tool-bar>

      <!-- Back button -->
      <v-btn icon slot="left" @click="$emit('back')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

    </app-tool-bar>
  </div>
</template>

<script>

  import {AppSystemBar, AppToolBar} from "@components/app/bars";

  export default {
    components: {
      AppSystemBar,
      AppToolBar
    }
  }
</script>
<style lang="scss" scoped>

  .player {
    &__interface {
      &__toolbar {
        width: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 15%, rgba(0, 0, 0, 0.7) 85%);
      }
    }
  }

</style>
