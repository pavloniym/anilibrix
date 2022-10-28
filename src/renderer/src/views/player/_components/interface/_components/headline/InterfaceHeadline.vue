<template>
    <div class="d-flex align-end justify-space-between">

        <!-- Description -->
        <description/>

        <!-- Duration -->
        <!-- Skip opening -->
        <div class="d-flex flex-column align-end">
            <skip-opening class="mb-4"/>
            <duration/>
        </div>

    </div>
</template>

<script setup>

    import Duration from './_components/duration/HeadlineDuration'
    import Description from './_components/description/HeadlineDescription'
    import SkipOpening from './_components/skipOpening/HeadlineSkipOpening'

</script>
