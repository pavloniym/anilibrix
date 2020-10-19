<template>
  <v-card>

    <!-- Header -->
    <v-card-subtitle v-if="title" class="pb-0 font-weight-bold">{{title}}</v-card-subtitle>
    <v-card-text v-if="subtitle && subtitle.length > 0" class="mt-2 caption">
      <template v-for="(item, s) in subtitle">
        <div :key="s" :class="{'pt-2': s > 0}">{{item}}</div>
      </template>
    </v-card-text>

    <!-- Field -->
    <v-list-item dense class="py-0" @click="() => value = !value">

      <!-- Title -->
      <!-- Switch -->
      <v-list-item-title>{{label}}</v-list-item-title>
      <v-list-item-action class="mr-2">
        <v-switch :input-value="value" @input.stop="value = $event"/>
      </v-list-item-action>

    </v-list-item>

    <!-- Hint -->
    <v-card-text class="caption pt-1">
      <template v-for="(item, s) in hint">
        <div :key="s" :class="{'pt-2': s > 0}">{{item}}</div>
      </template>
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
    subtitle: {
      type: Array,
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
    hint: {
      type: Array,
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
            ? this._setValue({k: this.path, v: value})
            : null;
        }
      }
    },

    methods: {
      ...mapActions('app/settings', {_setValue: 'setSettingsValue'}),
    }

  }
</script>
