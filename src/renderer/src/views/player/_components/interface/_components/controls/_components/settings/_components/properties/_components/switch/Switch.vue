<template>
    <v-list-item
        nav
        :style="{minHeight: '25px', height: '25px'}"
        @click.self="$emit('click')">
        <v-layout class="align-center justify-space-between">

            <!-- Title -->
            <v-list-item-title v-text="title" class="pr-4 fz-.75 text-unselect"/>

            <!-- Switch -->
            <v-switch
                inset
                hide-details
                class="switch"
                color="white"
                :modelValue="modelValue"
                @update:modelValue.self="$emit('click')">
            </v-switch>

        </v-layout>
    </v-list-item>
</template>

<script setup>

    const props = defineProps({
        title: {type: String, default: null},
        modelValue: {type: Boolean, default: null},
    })

</script>


<style scoped lang="scss">

    :deep(.switch) {
        --v-input-control-height: 15px !important;

        .v-switch__track {
            width: 34px;
            height: 14px;
        }

        .v-selection-control {
            justify-content: end;
        }

        .v-selection-control__input {
            --v-selection-control-size: 10px !important;
        }

        .v-selection-control__wrapper {
            height: auto;
        }

        .v-switch__thumb {
            width: 10px;
            height: 10px;
        }
    }


</style>
