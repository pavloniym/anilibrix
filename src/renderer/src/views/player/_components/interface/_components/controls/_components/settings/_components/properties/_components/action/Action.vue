<template>
    <div>
        <v-list-item nav :style="{minHeight: '25px', height: '25px'}" @click.self="$emit('click')">
            <v-list-item-title v-text="title" class="fz-.70 text-h6"/>
            <template v-slot:append>
                <v-list-item-action>
                    <v-list-item-subtitle v-text="subtitle" class="fz-.70 text-h6"/>
                </v-list-item-action>
            </template>
        </v-list-item>
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
