<template>
  <div>
    <template v-for="(setting, k) in settings">
      <component :is="setting" :key="k" :class="{'mt-2': k> 0}"/>
    </template>
  </div>
</template>

<script>

  // Components
  import Sort from './_components/sort'
  import Group from './_components/group'
  import SeenReleases from './_components/seen-releases'

  export default {
    computed: {

      /**
       * Get available settings
       *
       * @return {array}
       */
      settings() {
        return [
          SeenReleases,
          Sort,
          Group
        ]
      }
    },

  }
</script>
