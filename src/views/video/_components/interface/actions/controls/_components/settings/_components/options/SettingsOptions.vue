<template>
  <v-menu
    v-click-outside="() => close()"
    left
    :top="!this.isMobile"
    :value="true"
    :attach="attach()"
    :bottom="this.isMobile"
    :min-width="width"
    :close-on-click="false"
    :close-on-content-click="false">
    <v-list nav dense class="video__settings__items">

      <!-- Back -->
      <template v-if="is_back">
        <v-list-item @click="back">
          <v-icon small class="mr-2">mdi-chevron-left</v-icon>
          <v-list-item-title v-text="'Назад'"/>
        </v-list-item>
        <v-divider class="my-2"/>
      </template>

      <!-- Close -->
      <template v-if="is_close">
        <v-list-item @click="close">
          <v-icon small class="mr-2">mdi-close</v-icon>
          <v-list-item-title v-text="'Закрыть'"/>
        </v-list-item>
        <v-divider class="my-2"/>
      </template>

      <!-- Content -->
      <slot/>

    </v-list>
  </v-menu>
</template>

<script>


  import {DeviceMixin} from "@mixins/app";

  const props = {
    attach: {
      type: Function,
      default: null
    },
    width: {
      type: String,
      default: '200'
    },
    is_back: {
      type: Boolean,
      default: false
    },
    is_close: {
      type: Boolean,
      default: false
    }
  };

  export default {
    props,
    mixins: [DeviceMixin],
    methods: {

      /**
       * Close
       *
       * @return {void}
       */
      close() {
        this.$emit('close');
      },


      /**
       * Back
       *
       * @return {void}
       */
      back() {
        this.$emit('back');
      }

    }
  }
</script>

<style scoped lang="scss">

  .video__settings__items {
    ::v-deep {
      .v-list-item {
        height: 32px;
        min-height: auto;
      }
    }
  }
</style>
