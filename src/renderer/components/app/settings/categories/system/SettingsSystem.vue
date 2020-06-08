<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">Настройки приложения</div>
      <div>
        В данном разделе вы можете настроить автоматическое обновление релизов, системные уведомления
        и другие параметры приложения
      </div>
    </div>


    <!-- System Notifications -->
    <v-card>
      <v-list-item dense @click="_setSystemNotifications(!_notifications_system)">
        <v-list-item-title>Показывать системные уведомления</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_notifications_system" @change="_setSystemNotifications" />
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-divider />


    <!-- Auto update -->
    <v-card>
      <v-list-item dense @click="_setUpdates(!_updates_enabled)">
        <v-list-item-title>Автоматическое обновление релизов</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_updates_enabled" @change="_setUpdates" />
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-divider />

    <!-- Update Timeouts -->
    <v-card>
      <v-card-subtitle class="pb-0 font-weight-bold">Период обновлений</v-card-subtitle>
      <v-card-subtitle class="py-0 pb-2">
        Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
        outlined
        hide-details
        class="my-4"
        type="number"
        label="Периодичность обновления релизов"
        suffix="мин"
        :value="_updates_timeout"
        @input="_setUpdatesTimeout($event ? parseInt($event) : 1)">
        </v-text-field>
      </v-card-text>
    </v-card>


  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {

    computed: {
      ...mapState('app/settings/system', {
        _updates_enabled: s => s.updates.enabled,
        _updates_timeout: s => s.updates.timeout,
        _notifications_system: s => s.notifications.system,
      })
    },

    methods: {
      ...mapActions('app/settings/system', {
        _setUpdates: 'setUpdates',
        _setUpdatesTimeout: 'setUpdatesTimeout',
        _setSystemNotifications: 'setSystemNotifications',
      }),

    },


  }
</script>
