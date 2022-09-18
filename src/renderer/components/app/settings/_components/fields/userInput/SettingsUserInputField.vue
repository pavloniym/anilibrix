<template>
    <v-card>

        <!-- Header -->
        <v-card-text class="pb-0 caption">
            <div class="font-weight-bold">{{ title }}</div>
            <template v-for="(item, k) in subtitle">
                <div :key="k">{{ item }}</div>
            </template>
        </v-card-text>

        <!-- Input -->
        <v-card-text>
            <v-text-field v-bind="{value, ...inputProps}" outlined hide-details @input="inputHandler"/>
        </v-card-text>

        <!-- Description -->
        <v-card-text v-if="description" class="pt-0 caption">
            <template v-for="(item, k) in description">
                <div :key="k">{{ item }}</div>
            </template>
        </v-card-text>

    </v-card>
</template>

<script>

    const props = {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: Array,
            default: null
        },
        value: {
            type: [String, Number],
            default: null
        },
        inputProps: {
            type: Object,
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
    }

    export default {
        props,
    }
</script>
