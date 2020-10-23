<template>
  <options
    v-bind="{attach}"
    is_close
    width="320"
    @back="$emit('back')"
    @close="$emit('close')">

    <template v-for="(item, k) in items">
      <v-list-item :key="k" @click.stop="$emit('update:component', item.component)">
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

  </options>
</template>

<script>

  // Components
  import Options from './../../_components/options'

  // Mixins
  import {DeviceMixin} from "@mixins/app";

  const props = {
    source: {
      type: Object,
      default: null
    },
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
    mixins: [DeviceMixin],
    components: {Options},
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
            visible: true,
            subtitle: this.source.label,
            component: 'quality',
          },
          {
            title: 'Скорость воспроизведения',
            visible: true,
            subtitle: this.speedHuman,
            component: 'speed',
          },
          {
            title: 'Показать горячие клавиши',
            visible: !this.isMobile,
            component: 'hotkeys',
          },
        ].filter(item => item.visible === true)
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

    created() {

      this.player_speed = this.player.speed;
      this.player.on('ratechange', () => this.player_speed = this.player.speed);

    }
  }
</script>
