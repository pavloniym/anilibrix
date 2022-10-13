<template>
    <v-card>

        <!-- Switch -->
        <v-list-item dense @click="inputHandler(!value)">
            <v-list-item-title>{{ title }}</v-list-item-title>
            <v-list-item-action class="mr-2">
                <v-switch :input-value="value" @change="inputHandler"/>
            </v-list-item-action>
        </v-list-item>


        <!-- Description -->
        <v-card-text v-if="description" class="pt-2 caption">
            <template v-for="(item, k) in description" :key="k">
                <div >{{ item }}</div>
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
        value: {
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
    }

    export default {
        props,
    }
</script>
