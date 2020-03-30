<template>
    <v-app-bar v-bind="{color, flat}" app class="px-2 toolbar shrink">

      <app-remote/>
      <slot name="left" />

      <v-spacer/>

      <slot name="right" />
      <app-releases-search v-if="noSearch === false"/>
      <app-releases-update v-if="noUpdate === false"/>

      <!-- Settings -->
      <v-btn icon @click="setDrawer(!drawer)">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

    </v-app-bar>
</template>

<script>

  import AppRemote from './components/remote'
  import AppReleasesUpdate from "./components/update";
  import AppReleasesSearch from "./components/search";

  import {mapActions, mapState} from 'vuex'

  const props = {
    noSearch: {
      type: Boolean,
      default: false
    },
    noUpdate: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'transparent'
    },
    flat: {
      type: Boolean,
      default: true
    }
  };

  export default {
    props,
    name: 'AppToolbar',
    components: {
      AppRemote,
      AppReleasesUpdate,
      AppReleasesSearch,
    },
    computed: {
      ...mapState('settings', ['drawer']),
    },

    methods: {
      ...mapActions('settings', ['setDrawer']),
    }
  }

</script>

<style scoped lang="scss">

  .toolbar {
    -webkit-app-region: drag !important;
  }

</style>
