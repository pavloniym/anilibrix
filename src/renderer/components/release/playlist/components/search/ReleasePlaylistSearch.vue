<template>
  <v-layout class="shrink">

    <!-- Search -->
    <v-btn min-width="30" @click="visible = true">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!--<v-expand-x-transition appear mode="out-in">-->
      <v-text-field
        v-if="visible"
        v-bind="{value}"
        solo
        dense
        autofocus
        hide-details
        append-icon="mdi-close"
        :style="{width: '200px', maxWidth: '200px'}"
        @click:append="visible = false"
        @input="$emit('input', $event)">
      </v-text-field>
    <!--</v-expand-x-transition>-->

  </v-layout>
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
    data() {
      return {
        visible: false,
      }
    },

    watch: {

      visible: {
        handler(visible) {
          if (visible === false) {
            this.$emit('input', null);
          }
        }
      }

    }
  }
</script>
