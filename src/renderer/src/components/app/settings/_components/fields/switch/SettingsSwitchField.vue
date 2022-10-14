<template>
    <v-card>
        <v-list-item class="py-4" v-bind="{modelValue}" @click="inputHandler(!modelValue)">

            <!-- Title -->
            <v-list-item-title class="fz-.75 font-weight-bold text-h6">{{ title }}</v-list-item-title>

            <!-- Description -->
            <v-list-item-subtitle>
                <template v-for="(item, k) in description" :key="k">
                    <div class="fz-.70 text-line-height-1.5">{{ item }}</div>
                </template>
            </v-list-item-subtitle>

            <!-- Switch -->
            <template v-slot:append>
                <v-list-item-action>
                    <v-switch
                        inset
                        color="white"
                        density="compact"
                        :modelValue="modelValue"
                        @update:modeValue="inputHandler">
                    </v-switch>
                </v-list-item-action>
            </template>

        </v-list-item>
    </v-card>
</template>

<script setup>

    const props = defineProps({
        title: {
            type: String,
            default: null
        },
        modelValue: {
            type: Boolean,
            default: null
        },
        description: {
            type: Array,
            default: null
        },
        inputHandler: {
            type: Function,
            default: null
        }
    })

</script>
