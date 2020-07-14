<template>
  <v-layout fill-height align-center justify-center>
    <v-layout align-start justify-center>
      <v-icon size="140" class="mr-4" color="grey">mdi-alert-circle-outline</v-icon>
      <v-card flat color="transparent">

        <v-card-title>Произошла ошибка при загрузке релизов</v-card-title>
        <v-card-text>
          <div>Возможно проблема связана с вашим соединением, с прокси-сервером или API сервера</div>
          <div>Попробуйте изменить настройки соединения или попробуйте позже</div>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="_getReleases">Повторить</v-btn>
        </v-card-actions>

      </v-card>
    </v-layout>
  </v-layout>
</template>

<script>

  import {mapActions} from 'vuex'

  export default {
    methods: {
      ...mapActions('releases', {_getReleases: 'getReleases'}),
    }
  }
</script>
