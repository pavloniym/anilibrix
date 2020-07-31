<template>
  <banner v-bind="{image}">
    <template v-slot:title>Избранные релизы</template>
    <template v-slot:text>
      <div>Список ваших избранных релизов</div>
      <div>Для просмотра необходимо авторизоваться в приложении</div>
    </template>
    <template v-slot:actions>
      <v-btn @click="toLogin">Авторизоваться</v-btn>
    </template>
  </banner>
</template>

<script>

  // Components
  import Banner from "@components/app/ui/banner";

  // Utils
  import {toLogin} from "@utils/router/views";

  // Image
  import LibriaTyan02 from '@assets/images/libria-tyan/LibriaTyan02.svg'

  export default {
    components: {
      Banner
    },
    data() {
      return {
        image: LibriaTyan02,
      }
    },
    methods: {
      toLogin,
    }
  }

</script>
