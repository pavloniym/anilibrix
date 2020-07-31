<template>
  <banner v-bind="{image}">
    <template v-slot:title>Ошибка при загрузке релизов</template>
    <template v-slot:text>
      <div>Возможно проблема связана с вашим соединением или API сервера</div>
      <div>Попробуйте изменить настройки соединения или попробуйте позже</div>
    </template>
    <template v-slot:actions>
      <v-btn @click="_getReleases">Повторить</v-btn>
    </template>
  </banner>
</template>

<script>

  // Components
  import Banner from "@components/app/ui/banner";

  // Utils
  import {mapActions} from 'vuex'

  // Images
  import LibriaTyan01 from '@assets/images/libria-tyan/LibriaTyan01.svg'

  export default {
    components: {
      Banner
    },
    data() {
      return {
        image: LibriaTyan01,
      }
    },
    methods: {
      ...mapActions('releases', {_getReleases: 'getReleases'}),
    }
  }
</script>
