<template>
    <v-card>
        <v-divider v-if="hasDivider"/>
        <v-list-item dense @click="applyAction">

            <v-list-item-title v-text="finalTitle" class="fz-.70 font-weight-bold text-h6" :class="finalClasses"/>

            <template v-slot:append>
                <v-list-item-action>
                    <v-list-item-subtitle v-text="subtitle" class="fz-.70 text-h6"/>
                </v-list-item-action>
            </template>

        </v-list-item>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed, onDeactivated, ref, watch} from "vue";

    // Props
    const props = defineProps({
        title: {
            type: String,
            default: null
        },
        action: {
            type: Function,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        classes: {
            type: Array,
            default: null
        },
        hasDivider: {
            type: Boolean,
            default: false
        },
        hasConfirmation: {
            type: Boolean,
            default: false
        }
    });


    // Refs
    const showConfirmation = ref(false);
    const confirmationTimeout = ref(null);

    // Computed
    const finalTitle = computed(() => showConfirmation.value === true ? 'Нажмите для подтверждения' : props.title)
    const finalClasses = computed(() => [...(props.classes || []), showConfirmation.value ? 'text-red' : ''])


    // Actions
    const applyAction = $event => {
        props.hasConfirmation === true
            ? (showConfirmation.value === false ? showConfirmation.value = true : props?.action($event))
            : props?.action($event)
    }

    // Watch
    watch(showConfirmation, () => showConfirmation.value === true ? confirmationTimeout.value = setTimeout(() => showConfirmation.value = false, 5000) : null)

    // Hooks
    onDeactivated(() => clearTimeout(confirmationTimeout.value))

</script>
