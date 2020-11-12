<template>
  <v-row align="center" justify="center">
    <v-card flat color="transparent">

      <!-- Image -->
      <v-img height="240" contain :src="image"/>

      <!-- Description -->
      <v-card-text class="text-center">
        <div>Список ваших избранных релизов</div>
        <div>Для просмотра необходимо авторизоваться в приложении</div>
      </v-card-text>

      <v-layout justify-center>
        <v-btn @click="this.toLogin">Авторизоваться</v-btn>
      </v-layout>

    </v-card>
  </v-row>
</template>

<script>

  // Image
  import LibriaTyan02 from '@assets/images/libria-tyan/LibriaTyan02.svg'

  // Routes
  import {toLogin} from "@router/app/login/appLoginRoutes";

  export default {
    data() {
      return {
        image: LibriaTyan02,
      }
    },
    methods: {
      ...{toLogin}
    }
  }

</script>
