<template>
  <div class="catalog">

    <!-- Toolbar -->
    <app-tool-bar hide-update hide-catalog>
      <template v-slot:left>
        <v-btn icon @click="toReleases">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </app-tool-bar>

    <!-- Settings -->
    <app-settings/>

    <!-- Content -->
    <v-content class="px-4">
      <slot/>
    </v-content>

  </div>
</template>

<script>

  import AppToolBar from '@components/app/toolbar'
  import AppSettings from '@components/app/settings'

  export default {
    components: {
      AppToolBar,
      AppSettings,
    },

    methods: {

      /**
       * Go to releases page
       *
       * @return void
       */
      toReleases() {
        this.$router.push({
          name: 'releases'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  .catalog {
    top: 36px;
    width: 100%;
    bottom: 0;
    position: absolute;
    padding-bottom: 32px;
    overflow-y: scroll;
  }


</style>
