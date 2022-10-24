<template></template>

<script setup>

    // Vue
    import {inject, watch} from "vue";

    // Composables
    import {onKeyStroke} from '@vueuse/core'
    import {useMagicKeys} from '@vueuse/core'
    import {useFullscreenWindow} from "@composables/app/fullscreen/appFullscreen";

    // Bindings
    const {space} = useMagicKeys()

    // Inject
    const player = inject('player');
    const increaseSpeed = inject('increaseSpeed');
    const decreaseSpeed = inject('decreaseSpeed');

    // Keyboard events
    onKeyStroke(['k', 'л'], _ => player?.value?.togglePlay())
    onKeyStroke(['ArrowLeft'], _ => player?.value?.rewind())
    onKeyStroke(['ArrowRight'], _ => player?.value?.forward())
    onKeyStroke(['ArrowUp'], _ => player?.value?.increaseVolume(.1))
    onKeyStroke(['ArrowDown'], _ => player?.value?.decreaseVolume(.1))
    onKeyStroke(['m', 'ь'], _ => player.value.muted = !player?.value?.muted)
    onKeyStroke(['f', 'а'], _ => useFullscreenWindow().toggleFullscreen())
    onKeyStroke(['p', 'з'], _ => player.value.pip = !player?.value?.pip)
    onKeyStroke(['>', 'Ю'], _ => increaseSpeed(.25))
    onKeyStroke(['<', 'Б'], _ => decreaseSpeed(.25))

    // Watch
    watch(space, isPressed => isPressed === true ? player?.value?.togglePlay() : null)

</script>
