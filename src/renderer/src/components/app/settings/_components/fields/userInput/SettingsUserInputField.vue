<template>
    <v-card>

        <!-- Header -->
        <v-card-text class="pb-0">
            <div class="fz-.75 font-weight-bold text-h6">{{ title }}</div>
            <template v-for="(item, k) in subtitle" :key="k">
                <div class="fz-.70 text-grey text-line-height-1.5">{{ item }}</div>
            </template>
        </v-card-text>

        <!-- Input -->
        <v-card-text>
            <v-text-field
                v-bind="{modelValue, ...inputProps}"
                hide-details
                variant="outlined"
                @update:modelValue="inputHandler">
            </v-text-field>
        </v-card-text>

        <!-- Description -->
        <v-card-text v-if="description" class="pt-0">
            <template v-for="(item, k) in description" :key="k">
                <div class="fz-.70  text-grey text-line-height-1.5">{{ item }}</div>
            </template>
        </v-card-text>

    </v-card>
</template>

<script setup>

    const props = defineProps({
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: Array,
            default: null
        },
        inputProps: {
            type: Object,
            default: null
        },
        modelValue: {
            type: [String, Number],
            default: null
        },
        inputHandler: {
            type: Function,
            default: null
        },
        description: {
            type: Array,
            default: null
        }
    });

</script>
