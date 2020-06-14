<template>
  <div class="catalog" :class="{'is-mac--fullscreen': _is_mac && _is_fullscreen}">

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
    top: 40px;
    width: 100%;
    bottom: 0;
    position: absolute;
    padding-bottom: 12px;
    overflow-y: scroll;

    &.is-mac--fullscreen {
      top: 0;
    }
  }


</style>
