<template>
  <v-layout v-if="loading || releases.length > 0" align-center class="shrink release__slider">

    <!-- Prev -->
    <control v-bind="{loading, value, releases}" left @click="$emit('previous')"/>

    <!-- Posters -->
    <v-slide-group
      v-bind="{value}"
      mandatory
      center-active
      :show-arrows="false"
      @change="$emit('input', $event)">

      <!-- Loader -->
      <!-- Slider Items -->
      <loader v-if="loading"/>
      <template v-else>
        <template v-for="(release, k) in releases">
          <v-slide-item v-slot:default="{ active, toggle }" :key="k">
            <poster
              v-bind="{release, active}"
              @click="toggle"
              @dblclick="$emit('toVideo')">
            </poster>
          </v-slide-item>
        </template>
      </template>

    </v-slide-group>


    <!-- Next -->
    <control v-bind="{loading, value, releases}" right @click="$emit('next')"/>

  </v-layout>
</template>

<script>

  import Loader from './components/loader'
  import Poster from './components/poster'
  import Control from './components/control'

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
    components: {
      Loader,
      Poster,
      Control,
    }
  }

</script>

<style scoped lang="scss">

  .release__slider {
    position: relative;

    ::v-deep .v-slide-group {
      &__prev, &__next {
        display: none !important;
      }
    }
  }

</style>
