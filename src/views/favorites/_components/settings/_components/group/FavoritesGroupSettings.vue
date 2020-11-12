<template>
  <v-card>

    <!-- Header -->
    <v-card-title>Группировка</v-card-title>
    <v-card-subtitle>Вы можете настроить способ группровки релизов</v-card-subtitle>
    <v-divider/>

    <v-select
      v-bind="{items}"
      solo
      flat
      hide-details
      class="pl-1"
      item-text="title"
      item-value="value"
      placeholder="Группировка"
      :value="_group"
      @input="setGroupSettings">
    </v-select>

  </v-card>
</template>

<script>

  // Store
  import {mapState, mapActions} from "vuex";
  import {SET_GROUP_SETTINGS_ACTION} from "@store/favorites/favoritesStore";

  export default {
    data() {
      return {
        items: [
          {title: 'Без группировки', value: 'original'},
          {title: 'По годам', value: 'years'},
        ]
      }
    },
    computed: {
      ...mapState('favorites', {_group: s => s.settings.group}),
    },
    methods: {
      ...mapActions('favorites', [SET_GROUP_SETTINGS_ACTION]),


      /**
       * Set group settings
       *
       * @param group_value
       * @return {void}
       */
      setGroupSettings(group_value) {
        this[SET_GROUP_SETTINGS_ACTION](group_value);
      }
    }
  }
</script>
