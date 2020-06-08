<template>
  <div class="release">

    <!-- Toolbar -->
    <app-tool-bar hide-update>
      <template v-slot:left>
        <v-btn icon @click="toBack">
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

  import __get from 'lodash/get'

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
      toBack() {

        const fromRoute = __get(this.$route, 'params.from');
        const releaseRoute = {name: 'releases'};

        this.$router.push(fromRoute ? fromRoute : releaseRoute);
      }
    }
  }
</script>

<style lang="scss" scoped>

  .release {
    top: 36px;
    width: 100%;
    bottom: 0;
    position: absolute;
    padding-bottom: 32px;
    overflow-y: scroll;
  }


</style>
