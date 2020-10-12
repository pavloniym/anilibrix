<template>
  <v-tooltip right>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" icon large @click="toRelease(release.id)">
        <v-avatar size="24">
          <v-img v-bind="{src}"/>
        </v-avatar>
      </v-btn>
    </template>
    <span>{{title}}</span>
  </v-tooltip>
</template>

<script>

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  const props = {
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get release poster src
       *
       * @return {string}
       */
      src() {
        return this.$__get(this.release, 'poster');
      },

      /**
       * Get title
       *
       * @return {string}
       */
      title() {
        return this.$__get(this.release, 'names.ru');
      },

    },
    methods: {
      ...{toRelease}
    }
  }
</script>
