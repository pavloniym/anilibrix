<template>
  <div class="release" :class="{'is-mac--fullscreen': _is_mac && _is_fullscreen}">

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
    <div class="px-4">
      <slot/>
    </div>

  </div>
</template>

<script>

  import AppToolBar from '@components/app/toolbar'
  import AppSettings from '@components/app/settings'

  import __get from 'lodash/get'
  import {mapState} from "vuex";

  export default {
    components: {
      AppToolBar,
      AppSettings,
    },

    computed: {
      ...mapState('app', {
        _is_mac: s => s.is_mac,
        _is_fullscreen: s => s.is_fullscreen,
      }),
    },

    methods: {

      /**
       * Go to releases page
       *
       * @return void
       */
      toBack() {

        const fromRoute = __get(this.$route, 'params.from') || null;
        const releaseRoute = {name: 'releases'};

        // Get back route
        // Get release id
        const route = fromRoute || releaseRoute;
        const fromReleaseId = __get(this.$route, 'params.releaseId');

        // Push router
        this.$router.push({...route, params: {...route.params, fromReleaseId}});
      }
    }
  }
</script>

<style lang="scss" scoped>

  .release {
    top: 40px;
    width: 100%;
    bottom: 0;
    position: absolute;
    padding-bottom: 32px;
    overflow-y: scroll;

    &.is-mac--fullscreen {
      top: 0;
    }
  }


</style>
