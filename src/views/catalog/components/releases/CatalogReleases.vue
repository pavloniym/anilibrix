<template>
  <div v-if="items && items.length > 0">
    <template v-for="release in items">
      <release v-bind="{release}" class="mb-2" :ref="release.id" :key="release.id" @click="toRelease(release)"/>
    </template>
  </div>
</template>

<script>

  // Components
  import Release from './components/release'

  // Routes
  import {toRelease} from "@router/release/releaseRoutes";

  const props = {
    items: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    components: {Release},
    methods: {
      ...{toRelease}
    }
  }
</script>
