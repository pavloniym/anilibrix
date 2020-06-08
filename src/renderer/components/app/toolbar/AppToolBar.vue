<template>
  <v-app-bar v-bind="{color, flat}" class="px-4 toolbar shrink">

    <slot name="left"/>

    <v-spacer/>

    <slot name="right"/>

    <catalog v-if="!hideCatalog"/>
    <search v-if="!hideSearch"/>
    <update v-if="!hideUpdate"/>
    <notifications v-if="!hideNotifications"/>
    <settings v-if="!hideSettings"/>

  </v-app-bar>
</template>

<script>

  import Update from './components/update';
  import Search from './components/search';
  import Catalog from './components/catalog'
  import Settings from './components/settings'
  import Notifications from './components/notifications'

  const props = {
    hideSearch: {
      type: Boolean,
      default: false
    },
    hideUpdate: {
      type: Boolean,
      default: false
    },
    hideSettings: {
      type: Boolean,
      default: false
    },
    hideCatalog: {
      type: Boolean,
      default: false
    },
    hideNotifications: {
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
    components: {
      Update,
      Search,
      Catalog,
      Settings,
      Notifications
    },

  }

</script>
