<template>
  <v-app-bar v-bind="{color, flat}" class="px-4 toolbar shrink">

    <slot name="left"/>

    <v-spacer/>

    <slot name="right"/>

    <!-- Release Search -->
    <app-releases-search v-if="noSearch === false"/>

    <!-- Releases Update -->
    <app-releases-update v-if="noUpdate === false"/>

    <!-- Settings -->
    <v-btn v-if="noDrawer === false" icon @click="_setDrawer(!_drawer)">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>

  import AppReleasesUpdate from './components/update';
  import AppReleasesSearch from './components/search';

  import { mapActions, mapState } from 'vuex'

  const props = {
    noSearch: {
      type: Boolean,
      default: false
    },
    noUpdate: {
      type: Boolean,
      default: false
    },
    noDrawer: {
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
      AppReleasesUpdate,
      AppReleasesSearch,
    },
    computed: {
      ...mapState('app/settings', {_drawer: 'drawer'}),
    },

    methods: {
      ...mapActions('app/settings', {_setDrawer: 'setDrawer'}),
    }
  }

</script>
