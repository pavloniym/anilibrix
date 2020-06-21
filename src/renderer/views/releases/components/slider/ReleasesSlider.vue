<template>
  <v-layout v-if="loading || releases.length > 0" align-center class="shrink release__slider">

    <!-- Prev -->
    <v-layout class="controls controls--left">
      <v-btn icon :disabled="loading || value <= 0" @click="$emit('previous')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-layout>

    <!-- Posters -->
    <v-slide-group
      v-bind="{value}"
      mandatory
      center-active
      :show-arrows="false"
      @change="$emit('input', $event)">

      <!-- Loader -->
      <template v-if="loading">
        <v-layout class="shrink">
          <v-skeleton-loader
            v-for="i in 14"
            boilerplate
            type="image"
            :key="i"
            :width="width"
            :height="height"
            :min-width="minWidth"
            :min-height="minHeight">
          </v-skeleton-loader>
        </v-layout>
      </template>


      <!-- Slider Items -->
      <template v-else>
        <template v-for="(release, k) in releases">
          <v-slide-item v-slot:default="{ active, toggle }" :key="k">
            <v-card
              class="black"
              :width="width"
              :class="{primary: active}"
              :height="height"
              :min-width="minWidth"
              :min-height="minHeight"
              @click="toggle"
              @dblclick="$emit('toEpisode')">
              <v-img
                v-if="release && release.poster && release.poster.image"
                v-bind="{ratio}"
                eager
                class="black"
                width="100%"
                height="100%"
                :src="release.poster.image"
                :key="`poster:${release.id}`"
                :class="{'elevation-16': active}">
                <div v-if="!active" class="fill-height" :style="{background: 'black', opacity: .75}"></div>
              </v-img>
            </v-card>
          </v-slide-item>
        </template>
      </template>

    </v-slide-group>


    <!-- Next -->
    <div class="controls controls--right">
      <v-btn icon :disabled="loading || value >= releases.length - 1" @click="$emit('next')">
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
    releases: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: true,
    }
  };

  export default {
    props,
    data() {
      return {
        ratio: .7,
        width: '14.5vw',
        height: '34.5vh',
        minWidth: 175,
        minHeight: 250,
      }
    }
  }

</script>

<style scoped lang="scss">

  .release__slider {
    position: relative;

    .controls {
      position: absolute;

      &--left {
        left: 0;
        margin-left: -43px;
      }

      &--right {
        right: 0;
        margin-right: -43px;
      }
    }

    ::v-deep .v-slide-group {
      &__prev, &__next {
        display: none !important;
      }
    }
  }

</style>
