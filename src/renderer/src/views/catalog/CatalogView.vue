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
    const title = ref('Каталог релизов');
    const subtitle = ref('Вы можете выбрать жанры и года для более тонкой настройки списка релизов');


</script>
