<template>
    <div>
        <v-list-item nav link :style="{minHeight: '25px', height: '25px'}" @click.self="$emit('click')">

            <!-- Prepend -->
            <template v-slot:prepend>
                <slot name="prepend" />
            </template>

            <!-- Title -->
            <v-list-item-title v-text="title" class="fz-.75 text-h6 text-unselect"/>

            <!-- Subtitle -->
            <template v-slot:append>
                <v-list-item-subtitle v-text="subtitle" class="fz-.70 text-h6 ml-8 text-unselect"/>
            </template>

        </v-list-item>

        <!-- Divider -->
        <v-divider v-if="hasDivider"/>
    </div>
</template>

<script setup>

    const props = defineProps({
        title: {type: String, default: null},
        subtitle: {type: String, default: null},
        hasDivider: {type: Boolean, default: false},
    })

</script>
