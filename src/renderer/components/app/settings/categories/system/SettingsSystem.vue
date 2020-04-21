<template>
  <div ref="settings">
    <v-card>
      <v-list dense>
        <template v-for="(item, k) in settings">
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
        _updates: s => s.updates.enabled,
        _timeout: s => s.updates.timeout
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
            value: this._updates ? 'Да' : 'Нет',
            action: () => this._setUpdates(!this._updates),
          },
          {
            title: 'Периодичность обновления релизов',
            value: this._timeout + ' мин',
            action: () => this.$refs['updatesTimeout'][0].showDialog(),
          },
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
      ...mapActions('app/settings/system', {_setUpdates: 'setUpdates'})
    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>