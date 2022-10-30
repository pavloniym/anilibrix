<template>
    <div class="d-flex flex-column justify-center h-100">
        <heading v-bind="{title, subtitle}" class="mb-6"/>
    </div>
</template>

<script setup>

    // Vue
    import {ref} from "vue";

    // Components
    import Heading from '@components/interface/heading/Heading'

    // State
    const title = ref('Избранные релизы');
    const subtitle = ref('Список ваших избранных релизов');


</script>
