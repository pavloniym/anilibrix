<template>
  <v-card color="transparent" @click="$emit('click')">
    <v-layout align-start>
      <v-card width="160" height="240">
        <v-img width="160" height="240" :src="image"/>
      </v-card>
      <div>
        <v-card-title v-text="title"/>
        <v-card-subtitle v-if="subtitle" class="pb-0">{{subtitle}}</v-card-subtitle>
        <v-card-subtitle v-if="genres" class="pt-0">{{genres.join(' | ')}}</v-card-subtitle>
        <v-card-text>

          <v-chip label class="mb-1">{{year}}</v-chip>
          <v-chip label class="mb-1">{{type}}</v-chip>

          <!-- Description -->
          <div v-if="description" class="my-2 grey--text" :style="{maxHeight: '75px'}">
            <v-clamp max-height="75px">{{description}}</v-clamp>
          </div>

        </v-card-text>
      </div>
    </v-layout>
  </v-card>
</template>

<script>

  import __get from 'lodash/get'
  import VClamp from 'vue-clamp'

  const props = {
    poster: {
      type: Object,
      default: null
    },
    names: {
      type: Object,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    genres: {
      type: Array,
      default: null
    },
    year: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null,
    }
  };

  export default {
    props,
    components: {
      VClamp
    },
    computed: {

      /**
       * Get image
       *
       * @return {*}
       */
      image() {
        return __get(this.poster, 'image')
      },


      /**
       * Get title
       *
       * @return {string}
       */
      title() {
        return __get(this.names, 'ru');
      },


      /**
       * Get subtitle
       *
       * @return {string}
       */
      subtitle() {
        return __get(this.names, 'original')
      }
    }
  }

</script>
