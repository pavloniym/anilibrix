<template>
    <div v-if="!isOutside" class="fz-.70 position d-flex align-center justify-center bg-secondary rounded">
        <div class=" font-weight-bold">{{ prettySeekingTime }}</div>
    </div>
</template>

<script setup>


    // Vue
    import {inject} from "vue";

    // Inject
    const isOutside = inject('isOutside');
    const seekingProgress = inject('seekingProgress');
    const prettySeekingTime = inject('prettySeekingTime')


</script>

<style scoped lang="scss">

    .position {
        top: -15px;
        left: calc(v-bind(seekingProgress) * 1%);
        width: 40px;
        height: 20px;
        position: absolute;
        margin-left: -20px;
    }

</style>
