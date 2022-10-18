<template></template>
<script setup>

    // Vue
    import {onBeforeMount, onDeactivated, ref} from "vue";

    // Components
    import Message from './_components/message/ToastMessage'

    // Toasts
    import {useToast, POSITION} from "vue-toastification";
    import {useToastsEmitter, SUCCESS_TOAST, ERROR_TOAST} from "@composables/toasts/toastsEmitter";

    // Toasts
    const toast = useToast();
    const toasts = useToastsEmitter();

    const globalOptions = ref({
        icon: false,
        timeout: 4000,
        position: POSITION.BOTTOM_RIGHT,
        draggable: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: false,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        showCloseButtonOnHover: false,
    });

    /**
     * Show error toast
     *
     * @param message
     * @param options
     */
    const showErrorToast = ({message, options}) => {
        toast(
            {props: {color: '#D32F2F', message: message}, component: Message},
            {...globalOptions.value, ...options},
        );
    }


    /**
     * Show success toast
     *
     * @param message
     * @param options
     */
    const showSuccessToast = ({message, options}) => {
        toast({props: {color: '#2E7D32', message: message}, component: Message},
            {...globalOptions.value, ...options},
        );
    };


    // On before mount
    onBeforeMount(() => toasts.catchEventOfType(ERROR_TOAST, showErrorToast));
    onBeforeMount(() => toasts.catchEventOfType(SUCCESS_TOAST, showSuccessToast));

    // On deactivated
    onDeactivated(() => toasts.unsubscribeEventOfType(ERROR_TOAST, showErrorToast));
    onDeactivated(() => toasts.unsubscribeEventOfType(SUCCESS_TOAST, showErrorToast))

</script>

<style lang="scss">

    .Vue-Toastification__toast {
        padding: 0 !important;
        min-height: auto !important;
        margin-right: 16px !important;
    }


    .Vue-Toastification__bounce-move {
        transition: all .1s !important;
    }

    .Vue-Toastification__bounce-enter-active {
        animation-name: fadeIn !important;
    }

    .Vue-Toastification__bounce-leave-active {
        animation-name: fadeOut !important;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }


</style>
