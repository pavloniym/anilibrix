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
      :style="{width: '90%'}"
      :show-arrows="false"
      @change="$emit('input', $event)">

      <!-- Slider Item -->
      <v-slide-item v-slot:default="{ active, toggle }" v-for="(release, k) in releases" :key="k">

        <!-- Default Card -->
        <v-card
          width="175"
          class="black"
          height="250"
          :class="{primary: active}"
          @click="toggle"
          @dblclick="watchEpisode(release)">

          <!-- Release Poster Image -->
          <v-img
            v-if="posters[release.id]"
            eager
            ratio="0.7"
            class="black"
            width="175"
            height="250"
            max-width="175"
            max-height="250"
            :src="posters[release.id]"
            :key="`poster:${release.id}`"
            :class="{'elevation-16': active}">
            <div v-if="!active" class="fill-height" :style="{background: 'black', opacity: .75}"></div>
          </v-img>

        </v-card>
      </v-slide-item>
    </v-slide-group>


    <!-- Next -->
    <div :style="{width: '5%'}" class="d-flex justify-end">
      <v-btn icon :disabled="value >= releases.length - 1" @click="$emit('input', value + 1)">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

  </v-layout>
</template>

<script>

  import __get from 'lodash/get'

  const props = {
    value: {
      type: Number,
      default: null
    },
    releases: {
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
    methods: {


      /**
       * Move to next slide
       *
       * @return void
       */
      showNext() {
        if (this.value < this.releases.length - 1) {
          this.$emit('input', this.value + 1);
        }
      },


      /**
       * Move to previous slide
       *
       * @return void
       */
      showPrev() {
        if (this.value > 0) {
          this.$emit('input', this.value - 1);
        }
      },


      /**
       * Switch slider using keyboard
       *
       * @param e
       */
      switchSlider(e) {

        const code = e.which || e.keyCode;

        if (code === 37) this.showPrev(); // Left arrow
        if (code === 39) this.showNext(); // Right arrow
      },


      /**
       * Watch episode
       *
       * @param release
       */
      watchEpisode(release) {
        this.$emit('watch', {release, episode: __get(release, ['episodes', 0]) || null});
      }

    },

    mounted() {

      // Set scroll listener
      // Listen keyboard events
      // document.addEventListener('wheel', this.scrollSlider, true);
      document.addEventListener('keydown', this.switchSlider, true);


    },

    destroyed() {

      // Remove scroll and keyboard listeners
      // document.removeEventListener('wheel', this.scrollSlider);
      document.removeEventListener('keydown', this.switchSlider);
    }

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
