<template>
    <v-card flat>
        <back-to :component="backToSection"/>
        <template v-for="key in keys">
            <component v-bind="key.props" :is="key.is"/>
        </template>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed, shallowRef} from "vue";

    // Components
    import BackTo from '../../_components/backTo/BackTo'
    import Action from "./../../_components/action/Action";

    // Sections
    import Contents from './../contents/Contents'

    // State
    const backToSection = shallowRef(Contents)

    // Computed
    const keys = computed(() => [
        {
            is: Action,
            props: {title: 'Воспроизведение / Пауза', subtitle: 'Space / K'},
        },
        {
            is: Action,
            props: {title: 'Вперед на 10 секунд', subtitle: '→'},
        },
        {
            is: Action,
            props: {title: 'Назад на 10 секунд', subtitle: '←'},
        },
        {
            is: Action,
            props: {title: 'Громче на 10%', subtitle: '↑'},
        },
        {
            is: Action,
            props: {title: 'Тише на 10%', subtitle: '↓'},
        },
        {
            is: Action,
            props: {title: 'Быстрее на .25x', subtitle: 'Shift + >'},
        },
        {
            is: Action,
            props: {title: 'Медленее на .25x', subtitle: 'Shift + <'},
        },
        {
            is: Action,
            props: {title: 'Отключить звук', subtitle: 'M'},
        },
        {
            is: Action,
            props: {title: 'Полноэкранный режим', subtitle: 'F'},
        },
        {
            is: Action,
            props: {title: 'Режим картинка в картинке (PIP)', subtitle: 'P'},
        },
    ])

</script>
