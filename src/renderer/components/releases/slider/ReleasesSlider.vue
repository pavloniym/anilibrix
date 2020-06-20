<template>
  <v-layout v-if="loading || releases.length > 0" align-center class="shrink release__slider">


    <!-- Prev -->
    <div :style="{width: '5%'}" class="d-flex justify-start">
      <v-btn icon :disabled="loading || value <= 0" @click="$emit('input', value - 1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>


    <!-- Posters -->
    <v-slide-group
      v-bind="{value}"
      mandatory
      center-active
      :style="{width: '90%'}"
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
              @dblclick="toEpisode(release)">
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
    <div :style="{width: '5%'}" class="d-flex justify-end">
      <v-btn icon :disabled="loading || value >= releases.length - 1" @click="$emit('input', value + 1)">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

  </v-layout>
</template>

<script>

  import __get from 'lodash/get'
  import {mapState} from 'vuex'

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
    },

    computed: {
      ...mapState('app', {
        _drawer: s => s.drawer,
        _is_searching: s => s.is_searching,
      }),
    },

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

        // Space or Enter event
        // Check that settings is closed and search string is not active
        if (code === 32 || code === 13) {
          if (this._drawer === false && this._is_searching === false) {
            this.toEpisode(this.releases[this.value]);
          }
        }
      },


      /**
       * Watch episode
       *
       * @param release
       */
      toEpisode(release) {
        this.$emit('watch', {
          release,
          episode: __get(release, ['episodes', 0]) || null
        });
      }

    },

    mounted() {

      // Listen keyboard events
      document.addEventListener('keydown', this.switchSlider, true);


    },

    destroyed() {

      // Remove scroll and keyboard listeners
      document.removeEventListener('keydown', this.switchSlider);
    }

  }
</script>

<style scoped lang="scss">

  .release {
    &__slider {

      ::v-deep .v-slide-group {
        &__prev, &__next {
          display: none !important;
        }
      }
    }
  }

</style>
