<template>
  <v-card v-if="items && items.length > 0" elevation="12">

    <!-- Header -->
    <v-layout align-center class="px-4 py-2">
      <h5 class="grey--text">Последние уведомления за неделю</h5>
      <v-spacer/>
      <v-btn icon color="grey" @click.stop="$emit('notifications:clear')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-layout>
    <v-divider/>


    <!-- Notifications -->
    <v-list dense>
      <template v-for="(notification, k) in items">
        <v-divider v-if="k > 0" :key="`d:${k}`"/>
        <notification v-bind="{notification}" :key="k" @click="$emit('notifications:open', $event)"/>
      </template>
    </v-list>

  </v-card>
</template>

<script>

  // Components
  import Notification from './_components/item'

  const props = {
    items: {
      type: Array,
      default: null
    }
  };


  export default {
    props,
    components: {
      Notification
    }
  }
</script>
