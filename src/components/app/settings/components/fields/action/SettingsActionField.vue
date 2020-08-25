<template>
  <v-card>
    <v-list-item dense @click="action">

      <!-- Title -->
      <v-list-item-content>
        <v-list-item-title v-text="label"/>
      </v-list-item-content>

      <!-- Subtitle -->
      <v-list-item-action class="text-right">
        <v-list-item-subtitle v-text="description"/>
      </v-list-item-action>

    </v-list-item>
  </v-card>
</template>

<script>

  const props = {
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    action: {
      type: Function,
      default: null
    }
  };

  export default {
    props,
  }
</script>
