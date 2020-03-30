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
      <v-slide-item v-for="(release, k) in items" :key="k" v-slot:default="{ active, toggle }">

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
    methods: {


      /**
       * Move to next slide
       *
       * @return void
       */
      showNext() {
        if (this.value < this.items.length - 1) {
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
       * Scroll slider using scroll direction
       *
       * @param e
       */
      scrollSlider(e) {

        if (e.deltaY > 0 || e.deltaX > 0) this.showNext(); // Move to next
        if (e.deltaY < 0 || e.deltaX < 0) this.showPrev(); // Move to previous

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
      }

    },

    mounted() {

      // Set scroll listener
      // Listen keyboard events
      document.addEventListener('wheel', this.scrollSlider, true);
      document.addEventListener('keydown', this.switchSlider, true);


    },

    destroyed() {

      // Remove scroll and keyboard listeners
      document.removeEventListener('wheel', this.scrollSlider);
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
