<template>
  <v-list nav dense>

    <!-- Profile -->
    <v-list-item link>
      <v-list-item-action>
        <v-icon size="20">mdi-account</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Профиль</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- Play -->
    <v-list-item link>
      <v-list-item-action>
        <v-icon size="20">mdi-play</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Воспроизведение</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- Notifications -->
    <v-list-item link>
      <v-list-item-action>
        <v-icon size="20">mdi-bell</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Уведомления</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <!-- Settings -->
    <v-list-item link>
      <v-list-item-action>
        <v-icon size="20">mdi-wrench</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Настройки</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


  </v-list>
</template>

<script>
  export default {
    name: 'SettingsCategories',
  };
</script>

<style scoped>

</style>
