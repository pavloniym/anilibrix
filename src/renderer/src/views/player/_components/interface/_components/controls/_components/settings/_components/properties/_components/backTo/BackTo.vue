<template>
    <div>
        <v-list-item nav link :style="{minHeight: '25px', height: '25px'}" @click="setSection(props?.component)">
            <div class="d-flex align-center">
                <v-icon icon="mdi-arrow-left" size="18" class="mr-2"/>
                <v-list-item-title class="fz-.70 font-weight-bold">Назад</v-list-item-title>
            </div>
        </v-list-item>
        <v-divider class="my-2"/>
    </div>
</template>

<script setup>

    const props = defineProps({
        component: {default: null}
    })

    // Vue
    import {inject} from "vue";

    // Inject
    const setSection = inject('setSection');


</script>
