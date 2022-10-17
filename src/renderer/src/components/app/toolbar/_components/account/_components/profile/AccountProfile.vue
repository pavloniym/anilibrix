<template>
    <div>

        <!-- Login -->
        <!-- Tooltip -->
        <template v-if="!_isAuthorized">
            <v-btn icon id="toolbar__login" @click="toLogin">
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-tooltip left key="login" activator="#toolbar__login">Авторизация</v-tooltip>
        </template>


        <!-- Profile -->
        <!-- Menu -->
        <template v-else>

            <v-btn icon id="toolbar__profile">
                <v-icon v-if="menu" key="expanded">mdi-account</v-icon>
                <v-avatar size="28" v-else>
                    <v-img :src="_profile.avatar"/>
                </v-avatar>
            </v-btn>

            <v-menu
                v-model="menu"
                bottom
                key="profile"
                activator="#toolbar__profile"
                min-width="100"
                nudge-left="70"
                nudge-bottom="40">

                <!-- User -->
                <v-list dense>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="_profile.avatar"/>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="_profile.login"/>
                            <v-list-item-subtitle>ID: {{ _profile.id }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider/>

                    <!-- Profile statistics -->
                    <template v-for="(item, k) in statistics">
                        <v-list-item :key="k">
                            <v-list-item-content>
                                <v-list-item-subtitle v-text="item.title"/>
                                <v-list-item-title v-text="item.value" class="font-weight-bold"/>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider :key="`d:${k}`"/>
                    </template>


                    <!-- Logout -->
                    <v-list-item @click="logout">
                        <v-list-item-subtitle>Выход</v-list-item-subtitle>
                    </v-list-item>
                </v-list>

            </v-menu>
        </template>

    </div>
</template>

<script>

    // Components


    // Utils
    import stringsPluralize from "@/renderer/src/utils/strings/pluralize/stringsPluralize";

    // Store
    import {mapGetters, mapState} from 'vuex'
    import {LOGOUT_ACTION, IS_AUTHORIZED_GETTER} from '@/renderer/src/store/app/account/appAccountStore'

    // Routes
    import {toLogin} from "@/renderer/src/utils/router/views";

    export default {
        data() {
            return {
                menu: false,
            }
        },
        computed: {
            ...mapState('app/watch', {_watch: s => s.items}),
            ...mapState('favorites', {_favorites: s => s.items}),
            ...mapState('app/account', {_profile: s => s.profile}),
            ...mapGetters('app/account', {_isAuthorized: IS_AUTHORIZED_GETTER}),


            /**
             * Get favorites length
             *
             * @return {number}
             */
            favorites() {
                return (this._favorites || []).length
            },


            /**
             * Get episodes
             *
             * @return {number}
             */
            episodes() {
                return Object.values(this._watch || {})
                    .filter(item => item.isSeen)
                    .length;
            },


            /**
             * Get hours
             *
             * @return {number}
             */
            hours() {
                const seconds = Object.values(this._watch || {})
                    .reduce((storage, episode) => storage + (episode.time || 0), 0);

                return Math.floor((seconds || 0) / 60 / 60);
            },


            /**
             * Get profile statistics
             *
             * @return {array}
             */
            statistics() {
                return [
                    {
                        title: 'В избранном',
                        value: this.favorites ? stringsPluralize(this.favorites, ['релиз', 'релиза', 'релизов']) : 'Нет данных',
                    },
                    {
                        title: 'Просмотрено',
                        value: this.episodes ? stringsPluralize(this.episodes, ['эпизод', 'эпизода', 'эпизодов']) : 'Нет данных',
                    },
                    {
                        title: 'Потрачено на просмотр',
                        value: this.hours > 0 ? stringsPluralize(this.hours, ['час', 'часа', 'часов']) : 'Нет данных',
                    }
                ]
            }


        },


        methods: {

            /**
             * Push to login screen
             * Check to avoid duplicate navigation error
             *
             * @return {void}
             */
            toLogin,


            /**
             * Logout
             * Ignore error
             *
             * @return {Promise<void>}
             */
            async logout() {
                try {

                    await this.$store.dispatchPromise('app/account/' + LOGOUT_ACTION);

                } finally {

                    // Close menu
                    this.menu = false;
                }
            },
        }

    }

</script>
