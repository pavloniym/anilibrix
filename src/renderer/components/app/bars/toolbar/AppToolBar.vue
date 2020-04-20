<template>
  <v-app-bar v-bind="{color, flat}" class="px-4 toolbar shrink">
    <slot name="left"/>
    <v-spacer/>
    <slot name="right"/>

    <!-- Release Search -->
    <app-toolbar-search v-if="!noSearch"/>

    <!-- Releases Update -->
    <app-toolbar-update v-if="!noUpdate"/>

    <!-- Settings -->
   <app-toolbar-settings v-if="!noSettings" />

  </v-app-bar>
</template>

<script>

  import AppToolbarUpdate from './components/update';
  import AppToolbarSearch from './components/search';
  import AppToolbarSettings from './components/settings'

  const props = {
    noSearch: {
      type: Boolean,
      default: false
    },
    noUpdate: {
      type: Boolean,
      default: false
    },
    noSettings: {
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
      AppToolbarUpdate,
      AppToolbarSearch,
      AppToolbarSettings
    },

  }

</script>
