<template>
    <template v-for="(item, k) in statistics" :key="k">
        <v-divider v-if="k > 0"/>
        <v-list-item class="py-3">
            <v-list-item-title v-text="item.value" class="fz-.75 font-weight-bold text-line-height-1.3"/>
            <v-list-item-subtitle v-text="item.title" class="fz-.70 text-grey text-line-height-1.3"/>
        </v-list-item>
    </template>
    <v-divider/>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Utils
    import plural from 'plural-ru'

    // Computed
    const inFavorites = computed(() => 0);
    const watchedEpisodes = computed(() => 0);
    const watchedDurationInHours = computed(() => 0);

    // Computed
    const statistics = computed(() => [
        {
            title: 'В избранном',
            value: plural(inFavorites.value, '%d релиз', ' %d релиза', '%d релизов')
        },
        {
            title: 'Просмотрено',
            value: plural(watchedEpisodes.value, '%d эпизод', ' %d эпизода', '%d эпизодов')
        },
        {
            title: 'Потрачено на просмотр',
            value: plural(watchedDurationInHours.value, '%d час', ' %d часа', '%d часов')
        }
    ]);


</script>

