<template>
  <options
    v-bind="{attach}"
    is_close
    width="320"
    @back="$emit('back')"
    @close="$emit('close')">

    <template v-for="(item, k) in items">
      <v-list-item :key="k" @click="item.action">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
        <v-list-item-action>
          <v-layout align-center>
            <v-list-item-subtitle v-text="item.subtitle" class="mr-2"/>
            <v-icon v-if="item.hide_arrow !== true">mdi-chevron-right</v-icon>
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
    inject: ['$interface'],
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
            action: () => this.$emit('update:component', 'quality'),
            visible: true,
            subtitle: this.source.label,
          },
          {
            title: 'Скорость воспроизведения',
            action: () => this.$emit('update:component', 'speed'),
            visible: true,
            subtitle: this.speedHuman,
          },
          {
            title: 'Показать горячие клавиши',
            action: () => this.$emit('update:component', 'hotkeys'),
            visible: !this.isMobile,
          },
          {
            title: 'Торрент-сервер',
            action: () => {
              this.torrentDrawer ? this.torrentDrawer.show() : '';
              this.$emit('close');
            },
            visible: this.isTorrent,
            hide_arrow: true
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
      },


      /**
       * Check if source is torrent
       *
       * @return {boolean}
       */
      isTorrent() {
        return this.$__get(this.source, 'type') === 'torrent';
      },


      /**
       * Get torrent drawer ref from interface
       *
       * @return {*}
       */
      torrentDrawer() {
        return this.$__get(this.$interface, '$refs.torrent.0')
      }

    },

    created() {

      this.player_speed = this.player.speed;
      this.player.on('ratechange', () => this.player_speed = this.player.speed);

    }
  }
</script>
