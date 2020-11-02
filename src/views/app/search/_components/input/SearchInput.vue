<template>
  <v-text-field
    v-bind="{value}"
    solo
    autofocus
    clearable
    hide-details
    placeholder="Введите название релиза ..."
    autocomplete="off"
    @input="$emit('input', $event)">
  </v-text-field>
</template>

<script>

  const props = {
    value: {
      type: String,
      default: null
    }
  };

  export default {
    props,

  }
</script>
