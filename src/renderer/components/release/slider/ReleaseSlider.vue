<template>
  <v-layout align-center class="release__slider">

    <!-- Prev -->
    <div :style="{width: '5%'}" class="d-flex justify-start">
      <v-btn icon :disabled="value <= 0" @click="$emit('input', value - 1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <!-- Posters -->
    <v-slide-group
      center-active
      mandatory
      :value="value"
      :show-arrows="false"
      :style="{width: '90%'}"
      @change="$emit('input', $event)">

      <!-- Slider Item -->
      <v-slide-item v-for="release in items" :key="release.id" v-slot:default="{ active, toggle }">

        <!-- Default Card -->
        <v-card height="250" width="175" class="black" @click="toggle" :class="{primary: active}">

          <!-- Release Poster Image -->
          <v-img
            v-if="posters[release.id]"
            height="250"
            max-height="250"
            width="175"
            max-width="175"
            ratio="0.7"
            eager
            class="black"
            :key="`poster:${release.id}`"
            :class="{'elevation-16': active}"
            :src="posters[release.id]">
            <div v-if="!active" class="fill-height" :style="{background: 'black', opacity: .75}"></div>
          </v-img>

        </v-card>
      </v-slide-item>
    </v-slide-group>


    <!-- Next -->
    <div :style="{width: '5%'}" class="d-flex justify-end">
      <v-btn icon :disabled="value >= items.length - 1" @click="$emit('input', value + 1)">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

  </v-layout>
</template>

<script>

  const props = {
    value: {
      type: Number,
      default: null
    },
    items: {
      type: Array,
      default: null
    },
    posters: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
  }
</script>

<style scoped lang="scss">

  .release__slider {
    max-height: 250px;

    ::v-deep .v-slide-group {
      &__prev, &__next {
        display: none !important;
      }
    }
  }

</style>
