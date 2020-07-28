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
          <v-switch :input-value="_notifications_system" @change="_setSystemNotifications"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2">
        <div class="caption">
          Если при загрузке последних релизов приложение обнаружит обновленный релиз,
          то оно покажет системное уведомление о новом эпизоде
        </div>
      </v-card-text>
    </v-card>


    <!-- Auto update -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setUpdates(!_updates_enabled)">
        <v-list-item-title>Автоматическое обновление релизов</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_updates_enabled" @change="_setUpdates"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        Приложение будет в фоне обновлять последние релизы, даже если оно свернуто
      </v-card-text>
    </v-card>
    <v-divider/>

    <!-- Update Timeouts -->
    <v-card>
      <v-card-text class="pb-2">
        <div class="caption">
          Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме
        </div>
      </v-card-text>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mb-2"
          type="number"
          label="Периодичность обновления релизов"
          suffix="мин"
          :value="_updates_timeout"
          @input="_setUpdatesTimeout($event ? parseInt($event) : 1)">
        </v-text-field>
      </v-card-text>
    </v-card>


    <!-- Ads -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setAds(!_ads)">
        <v-list-item-title>Показывать рекламу</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_ads" @change="_setAds"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        <div>Спасибо, что выбрали <b>Анилибрию!</b></div>
        <div>
          Мы понимаем, что реклама никому не нравится, но это бесплатный способ поддержать проект.
          Отключение рекламы - абсолютно бесплатно, но, если вы хотите поддержать нас, то оставьте рекламу включенной.
          Обещаем, что не будем сильно навязчивыми (✿◠‿◠)
        </div>
      </v-card-text>
    </v-card>

    <!-- Ads Maximum -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setAdsMaximum(!_ads_maximum)">
        <v-list-item-title>Показывать рекламу перед каждым эпизодом</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_ads_maximum" @change="_setAdsMaximum"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        <div>Максимальная поддержка проекта!</div>
        <div>Реклама будет показываться перед каждым просмотром любого эпизода</div>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {

    computed: {
      ...mapState('app/settings/system', {
        _ads: s => s.ads.enabled,
        _ads_maximum: s => s.ads.maximum,
        _updates_enabled: s => s.updates.enabled,
        _updates_timeout: s => s.updates.timeout,
        _notifications_system: s => s.notifications.system,
      })
    },

    methods: {
      ...mapActions('app/settings/system', {
        _setAds: 'setAds',
        _setUpdates: 'setUpdates',
        _setAdsMaximum: 'setAdsMaximum',
        _setUpdatesTimeout: 'setUpdatesTimeout',
        _setSystemNotifications: 'setSystemNotifications',
      }),

    },


  }
</script>
