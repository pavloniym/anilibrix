<template>
  <v-layout fill-height align-center justify-center>
    <v-layout align-center justify-center>

      <v-col cols="12" sm="3" align-self="center">
        <v-img class="image" contain :src="image"/>
      </v-col>

      <v-col cols="12" sm="6" align-self="center">
        <v-card flat color="transparent">
          <v-card-title>Избранные релизы</v-card-title>
          <v-card-text>
            <div>Список ваших избранных релизов</div>
            <div>Для просмотра необходимо авторизоваться в приложении</div>
          </v-card-text>
          <v-layout>
            <v-btn @click="toLogin">Авторизоваться</v-btn>
          </v-layout>
        </v-card>
      </v-col>

    </v-layout>
  </v-layout>
</template>

<script>

  // Utils
  import {toLogin} from "@utils/router/views";

  // Image
  import LibriaTyan02 from '@assets/images/libria-tyan/LibriaTyan02.svg'

  export default {
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
