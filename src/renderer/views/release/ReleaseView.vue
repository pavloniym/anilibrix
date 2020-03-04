<template>
  <release-layout>

    {{releaseId}}

  </release-layout>
</template>

<script>

  import ReleaseLayout from '@layouts/release'

  const props = {
    releaseId: {
      type: [String, Number],
      default: null
    }
  };

  export default {
    props,
    name: "ReleaseView",
    components: {
      ReleaseLayout
    }
  }
</script>
