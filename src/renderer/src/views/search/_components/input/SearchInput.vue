<template>
    <v-text-field v-model="search.searchInput" v-bind="options"/>
</template>

<script setup>

    // Utils
    import __debounce from "lodash/debounce";

    // Vue
    import {computed, watch} from "vue";

    // Store
    import {useSearchStore} from "@store/search/searchStore";

    // Store
    const search = useSearchStore();

    // Toasts
    import {useToastsEmitter} from "@composables/toasts/toastsEmitter";

    // Toasts
    const toasts = useToastsEmitter();

    // Computed
    const options = computed(() => ({
        variant: 'solo',
        loading: search.isLoading === true,
        clearable: true,
        autofocus: true,
        hideDetails: true,
        placeholder: 'Поиск ...',
        autocomplete: 'off',
    }))


    /**
     * Search releases
     *
     * @return {Promise}
     */
    const searchReleases = async () => {
        try {
            await search.searchReleases();
        } catch (e) {
            toasts.emitError(['Произошла ошибка поискового запроса на сервере', 'Попробуйте повторить Ваш запрос чуть позже ...']);
        }
    }


    // Watch
    watch(() => search.searchInput, __debounce(searchReleases, 500));

</script>
