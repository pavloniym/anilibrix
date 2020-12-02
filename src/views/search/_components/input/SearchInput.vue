<template>
  <v-text-field
    v-bind="{value, loading}"
    solo
    clearable
    hide-details
    class="shrink"
    placeholder="Введите название релиза ..."
    autocomplete="off"
    :autofocus="!this.isMobile"
    @input="$emit('input', $event)">
  </v-text-field>
</template>

<script>

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  const props = {
    value: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    mixins: [
      DeviceMixin
    ]

  }
</script>
