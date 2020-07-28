<template>
  <v-layout align-start>

    <v-skeleton-loader boilerplate type="image" width="160" height="240" />
    <v-layout column class="ma-4">
      <v-skeleton-loader boilerplate type="heading" width="400px" height="24px" />
      <v-skeleton-loader boilerplate type="text" class="mt-3" width="140"/>
      <v-skeleton-loader boilerplate type="text" class="mt-1" width="240"/>
      <v-layout class="mt-3">
        <v-skeleton-loader boilerplate type="button" width="65" class="mr-1"/>
        <v-skeleton-loader boilerplate type="button" width="160"/>
      </v-layout>
      <v-skeleton-loader boilerplate type="text@3" width="100%" class="mt-5"/>
    </v-layout>

  </v-layout>
</template>
