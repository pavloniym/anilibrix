<template>
  <v-navigation-drawer
    v-if="source.type === 'torrent'"
    v-model="visible"
    absolute
    temporary
    width="350"
    :style="{zIndex: 100}">

    <!-- System Bar Offset-->
    <app-system-bar-placeholder fixed/>

    <!-- Torrent Details -->
    <v-card :class="{'mt-9': !this.isMacOnFullscreen}">
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

    <!-- Notice -->
    <div class="caption grey--text px-4 mt-4">
      Малое количество сидеров и личеров может негативно сказаться на скорости загрузки и
      привести к буфферизации воспроизведения
    </div>

  </v-navigation-drawer>
</template>

<script>

  import AppSystemBarPlaceholder from '@components/app/systembar/placeholder'

  import prettyBytes from 'pretty-bytes'
  import {PlatformMixin} from '@mixins/app'
  // import {handleTorrentDownload} from "@main/handlers/torrents/torrentsHandler";

  const props = {
    source: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [PlatformMixin],
    components: {
      AppSystemBarPlaceholder
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
        visible: false,
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
       * @return {{title: string, value: *}[]}
       */
      items() {
        return [
          {
            title: 'Название торрента',
            value: this.$__get(this.torrent, 'name'),
            classes: ['white-space--pre-wrap']
          },
          {
            title: 'Дата создания торрента',
            value: this.$__get(this.torrent, 'datetime') ? new Date(this.$__get(this.torrent, 'datetime')).toLocaleString() : null,
          },
          {
            title: 'Количество сидеров',
            value: this.$__get(this.torrent, 'seeders'),
          },
          {
            title: 'Количество личеров',
            value: this.$__get(this.torrent, 'leechers'),
          },
          {
            title: 'Воспроизводимый файл',
            value: this.file.name,
            classes: ['white-space--pre-wrap']
          },
          {
            title: 'Размер файла',
            value: prettyBytes(this.file.length || 0),
          },
          {
            title: 'Скорость загрузки',
            value: prettyBytes(parseFloat(this.speed.toFixed(2)), {bits: true}),
          },
          {
            title: 'Скорость раздачи',
            value: prettyBytes(parseFloat(this.seeding.toFixed(2)), {bits: true}),
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
        this.visible = true
      }

    },

    created() {
      handleTorrentDownload(data => {
        if (this.torrent && this.torrent.id === data.torrent_id) {

          // Set download speed
          this.speed = data.speed || 0;
          this.seeding = data.seeding || 0;

          // Set file data
          this.file.name = data.name;
          this.file.length = data.length;
          this.file.progress = data.progress;

        }
      });
    }

  }
</script>

<style lang="scss" scoped>

  .white-space--pre-wrap {
    white-space: pre-wrap;
  }


</style>
