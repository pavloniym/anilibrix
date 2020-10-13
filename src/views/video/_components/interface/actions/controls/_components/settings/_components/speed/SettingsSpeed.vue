<template>
  <v-menu
    v-click-outside="() => $emit('close')"
    top
    left
    min-width="180px"
    nudge-right="50"
    :value="true"
    :attach="attach()"
    :close-on-click="false"
    :close-on-content-click="false">

    <v-list nav dense class="video__settings__items">

      <!-- Back -->
      <v-list-item @click="$emit('back')">
        <v-icon small class="mr-2">mdi-chevron-left</v-icon>
        <v-list-item-title v-text="'Назад'"/>
      </v-list-item>
      <v-divider class="my-2"/>

      <template v-for="(s, k) in variants">
        <v-list-item :key="k" :input-value="s.value === active.value" @click="updateSpeed(s.value)">
          <v-list-item-subtitle v-text="s.label"/>
        </v-list-item>
      </template>
    </v-list>

  </v-menu>
</template>

<script>

  const props = {
    player: {
      type: Object,
      default: null
    },
    attach: {
      type: Function,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        speed: 1
      }
    },
    computed: {

      /**
       * Get speed variants
       *
       * @return {array}
       */
      variants() {
        return [
          {label: '2x', value: 2},
          {label: '1.75x', value: 1.75},
          {label: '1.5x', value: 1.50},
          {label: '1.25x', value: 1.25},
          {label: 'Обычная', value: 1},
          {label: '0.75x', value: 0.75},
          {label: '0.5x', value: 0.5},
        ]
      },


      /**
       * Get selected speed
       *
       * @return {{}}
       */
      active() {
        return this.variants.find(variant => variant.value === this.speed);
      }

    },


    methods: {

      /**
       * Update speed
       * Back to selector
       *
       * @param value
       * @return {void}
       */
      updateSpeed(value) {
        this.$emit('close');
        this.$emit('update:speed', value);
      }

    },

    created() {

      this.speed = this.player.speed;
      this.player.on('ratechange', () => this.speed = this.player.speed);

    },

  }
</script>



<style scoped lang="scss">

  .video__settings__items {
    .v-list-item {
      height: 32px;
      min-height: auto;
    }
  }
</style>
