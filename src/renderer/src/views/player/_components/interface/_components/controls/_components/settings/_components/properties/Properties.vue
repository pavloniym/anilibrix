<template>
    <v-btn v-bind="buttonOptions">
        <v-icon v-bind="iconOptions"/>
        <v-menu v-model="isVisible" v-bind="menuOptions"  nudge-top="200">
            <v-card flat class="pa-2" min-width="150px">
                <component v-if="section" :is="section" :key="section"/>
            </v-card>
        </v-menu>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed, provide, ref, shallowRef} from "vue";

    // Components
    import Contents from './_sections/contents/Contents'

    // State
    const section = shallowRef(Contents);
    const isVisible = ref(false);

    // Computed
    const buttonOptions = computed(() => ({
        flat: true,
        icon: true,
        color: 'transparent',
        width: 35,
        height: 35,
    }))

    // Computed
    const iconOptions = computed(() => ({
        icon: 'mdi-cog',
        size: 20,
    }));


    // Computed
    const menuOptions = computed(() => ({
        activator: 'parent',
        closeOnContentClick: false
    }));


    // Methods
    const toggleMenu = (state = false) => isVisible.value = state
    const setSection = (component = null) => section.value = component;

    // Provide
    provide('setSection', setSection);
    provide('toggleMenu', toggleMenu);

</script>
