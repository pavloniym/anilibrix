<template>
    <v-card>
        <v-divider v-if="hasDivider"/>
        <v-list-item dense @click="applyAction">
            <v-list-item-content>
                <v-list-item-title v-text="finalTitle" :class="finalClasses"/>
            </v-list-item-content>
            <v-list-item-action class="text-right">
                <v-list-item-subtitle v-text="subtitle"/>
            </v-list-item-action>
        </v-list-item>
    </v-card>
</template>

<script>

    const props = {
        title: {
            type: String,
            default: null
        },
        action: {
            type: Function,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        classes: {
            type: Array,
            default: null
        },
        hasDivider: {
            type: Boolean,
            default: false
        },
        hasConfirmation: {
            type: Boolean,
            default: false
        }
    }

    export default {
        props,
        data() {
            return {
                showConfirmation: false,
                confirmationTimeout: null,
            }
        },
        computed: {


            /**
             * Get final title
             *
             * @return {string}
             */
            finalTitle() {
                return this.showConfirmation
                    ? 'Нажмите для подтверждения'
                    : this.title
            },


            /**
             * Get final classes
             *
             * @return {array}
             */
            finalClasses() {
                return [...(this.classes || []), this.showConfirmation ? 'red--text' : ''];
            }


        },

        methods: {

            /**
             * Apply action
             *
             * @param $event
             * @return {void}
             */
            applyAction($event) {
                if (this.hasConfirmation === true) {

                    this.showConfirmation === false
                        ? this.showConfirmation = true
                        : this?.action($event)

                } else {
                    this?.action($event);
                }
            }

        },

        watch: {

            showConfirmation: {
                handler(showConfirmation) {
                    if (showConfirmation === true) {
                        this.confirmationTimeout = setTimeout(() => this.showConfirmation = false, 5000)
                    }
                }
            }

        },

        destroyed() {
            clearTimeout(this.confirmationTimeout);
        }
    }

</script>
