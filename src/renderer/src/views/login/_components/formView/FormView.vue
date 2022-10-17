<template>
    <v-layout full-height>
        <v-row align="center" justify="center">
            <v-col cols="9">
                <div>

                    <!-- Title -->
                    <div class="text-h6 font-weight-bold">{{ title }}</div>

                    <!-- Description -->
                    <div class="fz-.75 text-grey">
                        <div v-for="(line, k) in description" :key="k">{{ line }}</div>
                    </div>

                    <!-- Fields -->
                    <!-- Actions -->
                    <v-card flat width="100%" class="py-4" color="transparent">
                        <v-form autocomplete="off">
                            <slot name="fields"/>
                        </v-form>

                        <!-- Actions -->
                        <slot name="actions"/>
                    </v-card>
                </div>

                <!-- Append -->
                <slot name="append"/>

                <!-- Cookies -->
                <v-layout class="fz-.70 flex-column text-grey text-grey-darken-2">
                    <div>Мы использует файлы cookies для более комфортной работы пользователя.</div>
                    <div>Продолжая просмотр, Вы соглашаетесь с использованием файлов cookies</div>
                    <div class="mt-2">
                        Приложение локально сохраняет Ваши учетные данные для повторной авторизации.
                        Данные хранятся в шифрованном месте и не передаются по сети
                    </div>
                </v-layout>

            </v-col>
        </v-row>
    </v-layout>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Props
    const props = defineProps({
        title: {
            type: String,
            default: null
        },
        description: {
            type: [String, Array],
            default: null
        }
    })

    // Computed
    const description = computed(() => {
        if (Array.isArray(props.description)) return [...props.description];
        if (typeof props.description === 'string') return [props.description];
    });

</script>
