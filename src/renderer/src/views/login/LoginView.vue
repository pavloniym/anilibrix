<template>
    <v-layout full-height>
        <v-row dense>

            <!-- Welcome Image -->
            <v-col cols="6">
                <welcome-image/>
            </v-col>

            <!-- Links -->
            <!-- Fields -->
            <!-- Cookies -->
            <v-col cols="6">
                <form-view v-bind="form" @keyup.enter.native="makeLoginRequest">

                    <!-- Fields -->
                    <template v-slot:fields>
                        <template v-for="(field, k) in fields" :key="k">
                            <v-text-field
                                v-on="field.events"
                                v-bind="field.props"
                                hide-details
                                class="mb-2"
                                variant="outlined">
                                <template v-slot:prepend-inner>
                                    <v-icon class="ml-1 mr-2" :icon="field.icon"/>
                                </template>
                            </v-text-field>
                        </template>
                    </template>

                    <!-- Actions -->
                    <template v-slot:actions>
                        <v-layout align-center>
                            <template v-for="(action, k) in actions" :key="k">
                                <v-btn
                                    v-on="action.events"
                                    v-bind="action.props"
                                    :is="action.is"
                                    :class="action.class"
                                    :style="action.style">
                                    <v-icon v-if="action.icon" :icon="action.icon"/>
                                    <div v-if="action.title">{{ action.title }}</div>
                                </v-btn>
                            </template>
                        </v-layout>
                    </template>

                </form-view>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script setup>

    // Vue
    import {computed, reactive, ref} from "vue";

    // Components
    import FormView from './_components/formView/FormView'
    import WelcomeImage from './_components/welcomeImage/WelcomeImage'

    // Vuelidate
    import {required} from '@vuelidate/validators'
    import {useVuelidate} from '@vuelidate/core'

    // Routes
    import {LATEST_RELEASES_ROUTE} from "@router/latestReleases/latestReleasesRoutes";

    // Composables
    import {useRouter} from 'vue-router'
    import {useAccountStore} from "@store/account/accountStore";
    import {useToastsEmitter} from "@composables/toasts/toastsEmitter";
    import {useFavoritesStore} from "@store/favorites/favoritesStore";

    // Bindings
    const router = useRouter();
    const toasts = useToastsEmitter();
    const account = useAccountStore();
    const favorites = useFavoritesStore();

    // State
    const login = ref(null);
    const password = ref(null);
    const isProcessing = ref(false);

    // Form state
    const form = reactive({
        title: 'Авторизация',
        description: 'Введите имя пользователя и пароль, чтобы войти в свою учетную запись',
    })

    // Validation
    const validation = useVuelidate(
        {login: {required}, password: {required}},
        {login, password}
    );


    // Computed form fields
    const fields = computed(() => [
        {
            icon: 'mdi-account',
            props: {
                name: 'login',
                label: 'Логин',
                color: 'secondary',
                disabled: isProcessing.value === true,
                modelValue: login.value,

            },
            events: {'update:modelValue': $event => login.value = $event}
        },
        {
            icon: 'mdi-key-variant',
            props: {
                type: 'password',
                name: 'current-password',
                label: 'Пароль',
                color: 'secondary',
                disabled: isProcessing.value === true,
                modelValue: password.value,
            },
            events: {'update:modelValue': $event => password.value = $event}
        },
    ]);


    // Computed actions
    const actions = computed(() => [
        {
            icon: 'mdi-arrow-left',
            class: ['bg-secondary'],
            style: {minWidth: '40px', width: '40px'},
            props: {
                to: {name: LATEST_RELEASES_ROUTE},
                loading: isProcessing.value === true,
            },
            events: {},
        },
        {
            title: 'Авторизация',
            class: {'ml-1': true, 'bg-secondary': validation.value?.$invalid === false},
            props: {
                loading: isProcessing.value === true,
                disabled: validation.value?.$invalid === true,
            },
            events: {click: () => makeLoginRequest()},
        }
    ])


    /**
     * Make login request to server
     *
     * @return {Promise}
     */
    const makeLoginRequest = async () => {
        if (validation?.value?.$invalid === false) {
            try {

                // Set loading state
                isProcessing.value = true;

                // Maker login request
                // Send provided login and password
                await account.login({login: login.value, password: password.value})

                // Fetch content
                await Promise.allSettled([
                    account.fetchProfile(),
                    favorites.fetchFavorites(),
                ]);

                // Push to releases route
                await router.replace({name: LATEST_RELEASES_ROUTE});

                // Emit success toast
                toasts.emitSuccess(['Вы успешно авторизовались', 'Добро пожаловать и приятного просмотра!'], {timeout: 2000});

            } catch (error) {

                // Show error toast
                toasts.emitError(['Не удается авторизоваться', 'Пожалуйста, проверьте правильность логина и пароля']);

            } finally {
                isProcessing.value = false;
            }
        }
    }

</script>
