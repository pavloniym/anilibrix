<template>
    <div>
        <v-list-item nav link :style="{minHeight: '25px', height: '25px'}" @click="toggleMenu(false)">
            <div class="d-flex align-center">
                <v-icon icon="mdi-close" size="18" class="mr-2"/>
                <v-list-item-title class="fz-.70 font-weight-bold text-unselect">Закрыть</v-list-item-title>
            </div>
        </v-list-item>
        <v-divider class="my-2"/>
    </div>
</template>

<script setup>

    // Vue
    import {inject} from "vue";

    // Inject
    const toggleMenu = inject('toggleMenu');

</script>
