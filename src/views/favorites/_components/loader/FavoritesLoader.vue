<template>
  <v-row dense>
    <template v-for="k in 18">
      <v-col cols="3" lg="2" :key="k">
        <v-img aspect-ratio=".7">
        <v-skeleton-loader boilerplate type="image" height="100%" width="100%"  />
        </v-img>
      </v-col>
    </template>
  </v-row>
</template>
