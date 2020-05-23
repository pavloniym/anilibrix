<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Настройки приложения</div>
      <div>
        В данном разделе вы можете настроить автоматическое обновление релизов,
        включить синхронизацию данных с облачным хранилищем и другие параметры приложения
      </div>
    </div>

    <v-card>
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

  import UpdatesTimeoutDialog from './dialogs/updates/timeout'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        isMounted: false,
      }
    },

    computed: {
      ...mapState('app/settings/system', {
        _firebase_sync: s => s.firebase.sync,
        _updates_enabled: s => s.updates.enabled,
        _updates_timeout: s => s.updates.timeout,
      }),


      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Автоматическое обновление релизов',
            value: this._updates_enabled ? 'Да' : 'Нет',
            action: () => this._setUpdates(!this._updates_enabled),
          },
          {
            title: 'Периодичность обновления релизов',
            value: this._updates_timeout + ' мин',
            action: () => this.$refs['updatesTimeout'][0].showDialog(),
          },
          {
            title: 'Синхронизировать данные с облаком',
            value: this._firebase_sync ? 'Да' : 'Нет',
            action: () => this._setFirebaseSync(!this._firebase_sync),
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
          {component: UpdatesTimeoutDialog, ref: 'updatesTimeout'},
        ]
      }

    },

    methods: {
      ...mapActions('app/settings/system', {
        _setUpdates: 'setUpdates',
        _setFirebaseSync: 'setFirebaseSync',
      })
    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>
