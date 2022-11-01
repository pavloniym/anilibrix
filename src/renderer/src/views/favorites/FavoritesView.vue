<template>
    <div class="d-flex flex-column justify-center h-100">

        <!-- Heading -->
        <!-- Toolbar -->
        <heading v-bind="{title, subtitle}" class="mb-3"/>
        <toolbar class="mb-3"/>

        <!-- View -->
        <template v-for="(view,k) in views" :key="k">
            <component :is="view.is"/>
        </template>

    </div>
</template>

<script setup>

    // Vue
    import {computed, ref} from "vue";

    // Components
    import Heading from '@components/interface/heading/Heading'
    import Toolbar from './_components/toolbar/FavoritesToolbar'

    // Views
    import Plain from './_views/plain/PlainView'

    // Composables
    import {useFavoritesStore} from "@store/favorites/favoritesStore";

    // Bindings
    const favorites = useFavoritesStore();

    // State
    const title = ref('Избранные релизы');
    const subtitle = ref('Список ваших избранных релизов');

    // Computed
    const views = computed(() =>
        [
            {
                is: Plain,
                isVisible: favorites?.filters?.viewType === 'plain'
            }
        ]
            .filter(view => view?.isVisible === true)
    )

</script>
