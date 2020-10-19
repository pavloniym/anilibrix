<template>
  <v-card>

    <!-- Header -->
    <v-card-text class="pb-2 caption">{{title}}</v-card-text>

    <!-- Field -->
    <v-card-text>
      <v-text-field
        v-model="value"
        v-bind="{type, label, suffix, min}"
        outlined
        hide-details
        autocomplete="off">
      </v-text-field>
    </v-card-text>

  </v-card>
</template>

<script>

  // Store
  import {mapActions} from 'vuex';


  const props = {
    title: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    handler: {
      type: Function,
      default: null
    },
    min: {
      type: [String, Number],
      default: null
    }
  };

  export default {
    props,
    computed: {
      value: {

        /**
         * Get value
         *
         * @return {boolean}
         */
        get() {
          return this.path
            ? this.$__get(this.$store, `state.app.settings.${this.path}`, false)
            : null;
        },

        /**
         * Set value
         *
         * @param value
         * @return {void}
         */
        set(value) {
          this.path
            ? this._setValue({k: this.path, v: this.handler ? this.handler(value) : value})
            : null;
        }
      }
    },

    methods: {
      ...mapActions('app/settings', {_setValue: 'setSettingsValue'}),
    }

  }
</script>
