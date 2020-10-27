<template>
  <v-text-field
    solo
    clearable
    hide-details
    background-color="#272727"
    prepend-inner-icon="mdi-magnify"
    :value="search"
    @input="$emit('update:search', $event)">
  </v-text-field>
</template>

<script>

  const props = {
    search: {
      type: String,
      default: null
    }
  };

  export default {
    props,
  }

</script>
