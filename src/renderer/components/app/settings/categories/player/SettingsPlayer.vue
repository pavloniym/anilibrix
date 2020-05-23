<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Настройки воспроизведения релизов</div>
      <div>
        В данном разделе вы можете настроить возможность смотреть релизы, используя торренты,
        а также другие настройки воспроизведения
      </div>
    </div>

    <v-card ref="card">
      <v-list dense>
        <template v-for="(item, k) in settings">
          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" @click="item.action">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
            <v-list-item-action class="text-right">
              <v-list-item-subtitle v-text="item.value"/>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <!-- Dialogs -->
    <template v-if="isMounted">
      <component
        v-for="(dialog,k) in dialogs"
        :is="dialog.component"
        :key="k"
        :ref="dialog.ref"
        :attach="$refs.settings">
      </component>
    </template>

  </div>
</template>

<script>

  import TorrentsDialog from "./dialogs/torrents";
  import {mapState, mapActions} from 'vuex'

  export default {

    data() {
      return {
        isMounted: false,
      }
    },

    computed: {
      ...mapState('app/settings/player', {
        _torrents: s => s.torrents,
        _autoplayNext: s => s.autoplayNext,
      }),

      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Воспроизводить торренты',
            value: this._torrents.process ? 'Да' : 'Нет',
            action: () => this.$refs.torrents[0].showDialog(),
          },
          {
            title: 'Автовоспроизведение следующего эпизода',
            value: this._autoplayNext ? 'Да' : 'Нет',
            action: () => this._setAutoplayNext(!this._autoplayNext),
          }
        ]
      },


      /**
       * Get dialogs
       *
       * @return Array
       */
      dialogs() {
        return [
          {component: TorrentsDialog, ref: 'torrents'},
        ]
      }
    },


    methods: {
      ...mapActions('app/settings/player', {
        _setAutoplayNext: 'setAutoplayNext'
      })

    },

    mounted() {
      this.isMounted = true;
    }
  }
</script>
