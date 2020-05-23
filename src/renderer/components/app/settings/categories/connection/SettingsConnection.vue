<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Настройки подключения</div>
      <div>
        Если вы испытываете проблемы с подключением или портал недоступен в Вашем регионе,
        то в данном разделе вы можете более тонко настроить способ подключения
      </div>
    </div>

    <v-card>
      <v-list dense>
        <template v-for="(item, k) in settings">
          <v-divider v-if="k > 0" :key="`d:${k}`" />
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

  import HostDialog from './dialogs/host'
  import ProxyDialog from './dialogs/proxy'

  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        proxies: {
          pac: 'PAC прокси',
          direct: 'Без прокси',
          custom: 'Собственный прокси сервер',
        },
        isMounted: false,
      }
    },

    computed: {
      ...mapState('app/settings/connection', {
        _host: s => s.host,
        _type: s => s.proxy.type || 'direct',
      }),


      /**
       * Get settings items
       *
       * @return array
       */
      settings() {
        return [
          {
            title: 'Точка доступа',
            value: this._host,
            action: () => this.$refs.host[0].showDialog(),
          },
          {
            title: 'Тип подключения',
            value: this.proxies[this._type],
            action: () => this.$refs.proxy[0].showDialog(),
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
          {component: HostDialog, ref: 'host'},
          {component: ProxyDialog, ref: 'proxy'},
        ]
      }

    },

    mounted() {
      this.isMounted = true;
    }

  }
</script>
