<template>
  <v-card flat color="transparent">
    <loader v-if="loading"/>
    <v-layout v-else column>

      <!-- Avatar + Release main data -->
      <v-layout align-center class="my-4">

        <!-- Poster -->
        <v-avatar size="220" class="mx-4">
          <v-img :src="poster" aspect-ratio="1"/>
        </v-avatar>

        <!-- Title -->
        <!-- Original Name + Genres -->
        <!-- Meta -->
        <div>
          <v-card-title v-text="title" class="display-1 mb-2 font-weight-black" :style="{wordBreak: 'break-word'}"/>
          <v-card-subtitle v-text="original" class="pb-0"/>
          <v-card-subtitle v-text="genres" class="pt-0"/>
          <v-card-text>
            <v-chip v-text="year" label class="mb-1"/>
            <v-chip v-text="type" label class="mb-1"/>
          </v-card-text>
        </div>

      </v-layout>

      <!-- Description -->
      <v-card-text v-text="description" class="white--text"/>

    </v-layout>
  </v-card>
</template>

<script>

  import Loader from './components/loader'

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
    components: {
      Loader
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
        return this.$__get(this.release, 'poster.image')
      }

    }
  }
</script>
