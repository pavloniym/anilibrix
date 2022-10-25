<template>
    <v-list-item nav :style="{minHeight: '25px', height: '25px'}">
        <v-layout class="align-center">

            <!-- Icon -->
            <div :style="{width: '20px'}">
                <v-icon v-if="isSelected" v-bind="icon"/>
            </div>

            <!-- Title -->
            <v-list-item-title v-text="title" class="fz-.75" :class="[isSelected ? 'text-white': 'text-grey']"/>

        </v-layout>
    </v-list-item>
</template>

<script setup>

    const props = defineProps({
        icon: {type: Object, default: null},
        title: {type: String, default: null},
        isSelected: {type: Boolean, default: null},
    });


</script>
