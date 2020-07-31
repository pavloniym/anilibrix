<template>
  <v-row justify="center" align="center">

    <!-- Image -->
    <v-col v-if="image" cols="12" sm="2" align-self="center" >
      <v-img class="image" contain :src="image" :max-height="imageHeight"/>
    </v-col>

    <!-- Data -->
    <v-col cols="12" sm="5" align-self="center">
      <v-card flat color="transparent">

        <!-- Title -->
        <v-card-title :class="{'justify-center': isMobile}">
          <slot name="title"/>
        </v-card-title>

        <!-- Text -->
        <v-card-text :class="{'text-center': isMobile}">
          <slot name="text"/>
        </v-card-text>

        <!-- Body -->
        <slot name="body"/>

        <!-- Actions -->
        <v-layout :justify-center="isMobile">
          <slot name="actions"/>
        </v-layout>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>

  import {MobileMixin} from "@mixins/app";

  const props = {
    image: {
      type: String,
      default: null
    },
    imageHeight: {
      type: String,
      default: '220'
    }
  };

  export default {
    props,
    mixins: [MobileMixin],
  }
</script>
