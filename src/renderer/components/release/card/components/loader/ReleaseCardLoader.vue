<template>
  <div class="ma-4">
    <v-layout align-center>
      <v-skeleton-loader boilerplate type="avatar" height="220" width="220" class="mr-8" />
      <v-layout column>

        <v-skeleton-loader boilerplate type="heading" height="40" width="70%"/>
        <v-skeleton-loader boilerplate type="text" width="140" class="mt-5"/>
        <v-skeleton-loader boilerplate type="text" width="260"/>

        <v-layout class="shrink mt-4">
          <v-skeleton-loader boilerplate type="button" width="65" class="mr-1"/>
          <v-skeleton-loader boilerplate type="button" width="65" class="mr-1"/>
          <v-skeleton-loader boilerplate type="button" width="160"/>
        </v-layout>

      </v-layout>
    </v-layout>
    <v-skeleton-loader boilerplate type="text@10" class="mt-6"/>
  </div>

</template>
