<template>
    <div>
        {{ release }}
    </div>
</template>

<script setup>

    // Vue
    import {onBeforeMount, ref} from "vue";

    // Composables
    import {useReleasesProxy} from "@proxies/releases/releasesProxy";

    // Props
    const props = defineProps({
        releaseId: {default: null}
    });

    // Bindings
    const {fetchReleaseById} = useReleasesProxy()

    // State
    const release = ref(null);

    // Fetch release
    onBeforeMount(async () => release.value = await fetchReleaseById({releaseId: props?.releaseId}))

</script>
