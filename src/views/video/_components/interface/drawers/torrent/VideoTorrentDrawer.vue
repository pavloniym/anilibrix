<template>
  <drawer v-model="is_visible" absolute temporary width="400" z-index="100">

    <!-- Content -->
    <v-card>
      <v-card-title>Торрент</v-card-title>
      <v-card-subtitle>Данные по воспроизводимому торренту и соединению</v-card-subtitle>
      <v-list dense>
        <template v-for="(item, k) in items">
          <v-divider :key="`d:${k}`"/>
          <v-list-item :key="k">
            <v-list-item-content>
              <v-list-item-subtitle v-text="item.title"/>
              <v-list-item-title v-text="item.value" :class="item.classes"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-divider/>
    </v-card>

    <!-- Footer -->
    <template v-slot:footer>
      Небольшое количество сидеров и личеров может негативно сказаться на скорости загрузки и
      привести к буфферизации воспроизведения.
    </template>

  </drawer>
</template>

<script>

  // Components
  import Drawer from '@components/app/ui/drawer'

  // Resolver
  import TorrentsResolver from "@@/utils/resolvers/torrents";

  // Utils
  import prettyBytes from 'pretty-bytes'

  const props = {
    source: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    components: {
      Drawer
    },
    data() {
      return {
        file: {
          name: null,
          length: null,
          progress: null
        },
        speed: 0,
        seeding: 0,
        is_visible: false,
      }
    },

    computed: {

      /**
       * Get torrent data
       *
       * @return {*}
       */
      torrent() {
        return this.$__get(this.source, 'payload.torrent');
      },


      /**
       * Get torrent name
       *
       * @return {array}
       */
      items() {
        return [
          {
            title: 'Название торрента',
            value: this.$__get(this.torrent, 'name') || 'Нет данных',
            classes: ['white-space--pre-wrap']
          },
          {
            title: 'Дата создания торрента',
            value: this.$__get(this.torrent, 'datetime')
              ? new Date(this.$__get(this.torrent, 'datetime')).toLocaleString()
              : 'Нет данных',
          },
          {
            title: 'Количество сидеров',
            value: this.$__get(this.torrent, 'seeders') || 'Нет данных',
          },
          {
            title: 'Количество личеров',
            value: this.$__get(this.torrent, 'leechers') || 'Нет данных',
          },
          {
            title: 'Воспроизводимый файл',
            value: this.file.name || 'Нет данных',
            classes: ['white-space--pre-wrap']
          },
          {
            title: 'Размер файла',
            value: prettyBytes(this.file.length || 0) || 'Нет данных',
          },
          {
            title: 'Скорость загрузки',
            value: prettyBytes(parseFloat(this.speed.toFixed(2)), {bits: true}),
          },
          {
            title: 'Прогресс',
            value: `${((this.file.progress || 0) * 100).toFixed(2)}%`,
          }
        ].filter(item => item.value !== null)
      }

    },

    methods: {

      /**
       * Show torrent data
       *
       * @return void
       */
      show() {
        this.is_visible = true;
      }
    },

    created() {
      TorrentsResolver.catchTorrentProgressWatcher(({torrents_id, payload}) => {
        if (this.$__get(this.torrent, 'id') === torrents_id) {

          // Set download speed
          this.speed = this.$__get(payload, 'speed') || 0;
          this.seeding = this.$__get(payload, 'seeding') || 0;

          // Set file data
          this.file.name = this.$__get(payload, 'name');
          this.file.length = this.$__get(payload, 'length');
          this.file.progress = this.$__get(payload, 'progress');

        }
      });
    },


  }
</script>

<style lang="scss" scoped>

  .white-space--pre-wrap {
    white-space: pre-wrap;
  }

</style>
