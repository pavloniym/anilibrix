<template>
  <v-list-item :input-value="is_active" @click="$emit('click')">
    <v-icon v-text="icon" class="mr-2" color="grey"/>
    <v-list-item-content>
      <v-list-item-subtitle v-text="label"/>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  const props = {
    source: {
      type: Object,
      default: null
    },
    is_active: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get source type
       *
       * @return {*}
       */
      type() {
        return this.$__get(this.source, 'type');
      },

      /**
       * Get alias
       *
       * @return {*}
       */
      alias() {
        return this.$__get(this.source, 'alias');
      },


      /**
       * Get icon
       *
       * @return {string|null}
       */
      icon() {

        if (this.alias === 'sd') return 'mdi-standard-definition';
        if (this.alias === 'hd') return 'mdi-high-definition';
        if (this.alias === 'fhd') return 'mdi-high-definition';
        if (this.alias === 'upscale_2k') return 'mdi-ultra-high-definition';
        if (this.alias === 'upscale_4k') return 'mdi-ultra-high-definition';
        if (this.type === 'torrent') return 'mdi-alpha-t';

        return null;

      },


      /**
       * Get source label
       *
       * @return {string|*}
       */
      label() {
        return this.$__get(this.source, 'label');
      }


    }
  }
</script>
