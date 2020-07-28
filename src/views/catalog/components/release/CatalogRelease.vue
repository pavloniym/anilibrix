<template>
  <v-card flat color="transparent" @click="$emit('click')">
    <v-layout align-start>

      <v-card width="160" height="240" min-width="160" min-height="240" :style="{position: 'relative'}">
        <v-img v-bind="{src}" width="160" height="240"/>
      </v-card>

      <div>
        <v-card-title v-text="title"/>
        <v-card-subtitle v-if="subtitle" v-text="subtitle" class="pb-0"/>
        <v-card-subtitle v-if="genres" v-text="genres" class="pt-0"/>

        <!-- Meta -->
        <v-card-text>
          <favorite v-bind="{release}"/>
          <v-chip v-text="year" label color="grey darken-4" :style="{height: '36px'}"/>
          <v-chip v-text="type" label color="grey darken-4" :style="{height: '36px'}"/>
        </v-card-text>

        <!-- Description -->
        <v-card-text v-if="description" class="pt-0 grey--text">
          <v-clamp max-height="85px">{{description}}</v-clamp>
        </v-card-text>
      </div>

    </v-layout>
  </v-card>
</template>

<script>

  import VClamp from 'vue-clamp'
  import Favorite from '@components/release/favorite'
  import RProgress from '@components/release/progress'

  const props = {
    release: {
      type: Object,
      default: null,
    },
  };

  export default {
    props,
    components: {
      VClamp,
      Favorite,
      RProgress,
    },
    computed: {

      /**
       * Get image
       *
       * @return {*}
       */
      src() {
        return this.$__get(this.release, 'poster')
      },


      /**
       * Get title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.release, 'names.ru');
      },


      /**
       * Get subtitle
       *
       * @return {string}
       */
      subtitle() {
        return this.$__get(this.release, 'names.original')
      },


      /**
       * Get release genres
       *
       * @return {string}
       */
      genres() {
        return (this.$__get(this.release, 'genres') || []).join(' | ');
      },


      /**
       * Get release year
       *
       * @return {*}
       */
      year() {
        return this.$__get(this.release, 'year');
      },

      /**
       * Get release type
       *
       * @return {*}
       */
      type() {
        return this.$__get(this.release, 'type');
      },


      /**
       * Get release description
       *
       * @return {*}
       */
      description() {
        return this.$__get(this.release, 'description');
      },


      /**
       * Get release episodes
       *
       * @return {*|*[]}
       */
      episodes() {
        return this.$__get(this.release, 'episodes') || [];
      }

    }
  }

</script>
