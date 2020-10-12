<template>
  <v-list nav dense>

    <!-- Close -->
    <v-list-item @click="$emit('close')">
      <v-icon small class="mr-2">mdi-close</v-icon>
      <v-list-item-title v-text="'Закрыть'"/>
    </v-list-item>
    <v-divider class="my-2"/>

    <!-- Settings -->
    <template v-for="(item, k) in items">
      <v-list-item :key="k" @click="$emit('update:component', item.component)">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
        <v-list-item-action>
          <v-layout align-center>
            <v-list-item-subtitle v-text="item.subtitle" class="mr-2"/>
            <v-icon>mdi-chevron-right</v-icon>
          </v-layout>
        </v-list-item-action>
      </v-list-item>
    </template>

  </v-list>
</template>

<script>

  const props = {
    source: {
      type: Object,
      default: null
    },
    player: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        player_speed: 1,
      }
    },
    computed: {

      /**
       * Get settings items
       *
       * @return {array}
       */
      items() {
        return [
          {
            title: 'Качество',
            subtitle: this.source.label,
            component: 'quality',
          },
          {
            title: 'Скорость воспроизведения',
            subtitle: this.speedHuman,
            component: 'speed',
          },
        ]
      },


      /**
       * Get human speed
       *
       * @return {string}
       */
      speedHuman() {
        if (this.player_speed >= 2) return '2x';
        if (this.player_speed >= 1.75) return '1.75x';
        if (this.player_speed >= 1.50) return '1.5x';
        if (this.player_speed >= 1.25) return '1.25x';
        if (this.player_speed >= 1) return 'Обычная';
        if (this.player_speed >= 0.75) return '0.75x';
        if (this.player_speed >= 0.50) return '0.5x';
      }

    },

    mounted() {

      this.player_speed = this.player.speed;
      this.player.on('ratechange', () => this.player_speed = this.player.speed);

    }
  }
</script>
