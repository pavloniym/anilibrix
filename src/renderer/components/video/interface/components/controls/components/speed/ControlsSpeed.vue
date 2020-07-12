<template>
  <v-menu v-bind="{attach}" top nudge-left="60" nudge-top="45">

    <!-- Quality -->
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon large>
        <span class="caption font-weight-bold">{{active.label}}</span>
      </v-btn>
    </template>

    <!-- Qualities -->
    <v-list dense>
      <template v-for="(s, k) in variants">
        <v-list-item :key="k" :input-value="s.value === active.value" @click="$emit('click', s.value)">
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
      type: HTMLDivElement,
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
          {label: '1x', value: 1},
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

    created() {

      this.speed = this.player.speed;
      this.player.on('ratechange', () => this.speed = this.player.speed);

    }
  }
</script>
