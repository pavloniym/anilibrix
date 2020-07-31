<template>
  <v-card flat color="transparent">
    <loader v-if="loading"/>
    <v-layout v-else column>

      <!-- Avatar + Release main data -->
      <v-row no-gutters align="center" :class="{'mb-4': !isMobile}">

        <!-- Poster -->
        <v-col :cols="isMobile ? 12 : 3" :style="{maxWidth: isMobile ? '100%' : '240px'}">
          <v-avatar
            max-height="300"
            :class="{'rounded': isMobile}"
            :tile="isMobile"
            :size="isMobile ? '100%' : '220'">
            <v-img
              aspect-ratio="1"
              :src="poster"
              :position="isMobile ? 'top center' : 'center center'">
            </v-img>
          </v-avatar>
        </v-col>

        <!-- Title -->
        <!-- Original Name + Genres -->
        <!-- Meta -->
        <v-col :cols="isMobile ? 12 : 9">
          <div>

            <v-card-title
              v-text="title"
              class="text-h5 mb-2 font-weight-black"
              :style="{wordBreak: 'break-word'}">
            </v-card-title>

            <v-card-subtitle v-text="original" class="pb-0"/>
            <v-card-subtitle v-text="genres" class="pt-0"/>

            <v-card-text>
              <favorite v-bind="{release}" color="grey darken-3" class="mr-1"/>
              <v-chip v-if="year" v-text="year" label class="mr-1" color="grey darken-3" :style="{height: '36px'}"/>
              <v-chip v-if="type" v-text="type" label class="mr-1" color="grey darken-3" :style="{height: '36px'}"/>
            </v-card-text>

          </div>
        </v-col>

      </v-row>

      <!-- Description -->
      <v-card-text v-text="description" class="white--text"/>

    </v-layout>
  </v-card>
</template>

<script>

  // Components
  import Loader from './components/loader'
  import Favorite from './../favorite'

  // Mixins
  import {MobileMixin} from "@mixins/app";

  const props = {
    loading: {
      type: Boolean,
      default: false
    },
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    mixins: [
      MobileMixin
    ],
    components: {
      Loader,
      Favorite
    },
    computed: {

      /**
       * Get title
       *
       * @return {string|null}
       */
      title() {
        return this.$__get(this.release, 'names.ru')
      },

      /**
       * Get original title
       *
       * @return {string|null}
       */
      original() {
        return this.$__get(this.release, 'names.original')
      },


      /**
       * Get release genres
       *
       * @return {string}
       */
      genres() {
        return (this.$__get(this.release, 'genres') || []).join(' | ')
      },


      /**
       * Get year
       *
       * @return {string|number|null}
       */
      year() {
        return this.$__get(this.release, 'year');
      },


      /**
       * Get release type
       *
       * @return {string|null}
       */
      type() {
        return this.$__get(this.release, 'type')
      },


      /**
       * Get release description
       *
       * @return {*}
       */
      description() {
        return this.$__get(this.release, 'description')
      },


      /**
       * Get release poster
       *
       * @return {*}
       */
      poster() {
        return this.$__get(this.release, 'poster')
      }

    }
  }
</script>
