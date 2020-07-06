<template>
  <v-layout class="shrink">

    <!-- Search -->
    <v-text-field
      solo
      clearable
      hide-details
      class="mr-2"
      placeholder="Поиск по избранным релизам ..."
      prepend-inner-icon="mdi-magnify"
      :value="search"
      @input="$emit('update:search', $event)">
    </v-text-field>

    <!-- Settings -->
    <v-btn height="48" @click="$emit('update:settings', !settings)">
      <v-icon>mdi-settings</v-icon>
    </v-btn>

  </v-layout>
</template>

<script>

  const props = {
    search: {
      type: String,
      default: null
    },
    settings: {
      type: Boolean,
      default: false,
    }
  };

  export default {
    props,

  }
</script>
