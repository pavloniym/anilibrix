<template>
  <v-row dense>
    <template v-for="k in 18">
      <v-col cols="2" :key="k">
        <v-skeleton-loader boilerplate type="image" height="230" />
      </v-col>
    </template>
  </v-row>
</template>
