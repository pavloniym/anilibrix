<template>
    <v-btn v-if="isAuthorized" v-bind="options" @click.stop="toggleFavorite">
        <v-icon :icon="isInFavorite ? 'mdi-star' : 'mdi-star-outline'"/>
    </v-btn>
</template>

<script setup>

    // Props
    import {computed} from "vue";

    const props = defineProps({
        release: {type: Object, default: null}
    })

    // Composables
    import {useAccountStore} from "@store/account/accountStore";

    // Bindings
    const account = useAccountStore();

    // Computed
    const isLoading = false;
    const isInFavorite = false;
    const isAuthorized = account.isAuthorized === true;

    const options = computed(() => ({
        width: 40,
        color: isInFavorite?.value ? 'secondary' : null,
        height: 30,
        loading: isLoading?.value === true,
        minWidth: 40,
    }));

    // Methods
    const toggleFavorite = () => isInFavorite?.value === true ? removeFromFavorites() : addToFavorites();
    const addToFavorites = () => null;
    const removeFromFavorites = () => null;

</script>
