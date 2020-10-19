<template>
    <v-layout column class="pa-8 interface">
      <div class="mt-8">
        <v-skeleton-loader boilerplate type="text" width="230"/>
        <v-skeleton-loader boilerplate type="heading" width="140px" height="30px"/>
      </div>
      <div class="mt-6">
        <v-skeleton-loader boilerplate type="text" width="100%" height="3px"/>
      </div>
      <v-row no-gutters class="mt-4" justify="center" :style="{flex: 'none'}">
        <v-col align-self="center">
          <v-layout align-center justify-start>
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32" />
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32" />
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32" />
          </v-layout>
        </v-col>
        <v-col align-self="center">
          <v-layout align-center justify-center>
            <v-skeleton-loader boilerplate type="avatar" width="38" height="38" />
            <v-skeleton-loader boilerplate type="avatar" class="mx-3" height="90" width="90" />
            <v-skeleton-loader boilerplate type="avatar" width="38" height="38" />
          </v-layout>
        </v-col>
        <v-col align-self="center">
          <v-layout align-center justify-end>
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32" />
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32" />
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32"/>
            <v-skeleton-loader boilerplate type="avatar" class="mr-2" width="32" height="32"/>
          </v-layout>
        </v-col>
      </v-row>
    </v-layout>
</template>


<style lang="scss">

  .interface {
    width: 100%;
    bottom: 0;
    position: absolute;
    user-select: none;
  }

</style>
