<template>
  <v-card>

    <!-- Header -->
    <v-card-title>Сортировка</v-card-title>
    <v-card-subtitle>Вы можете настроить способ сортировки релизов</v-card-subtitle>
    <v-divider/>

    <v-select
      v-bind="{items}"
      solo
      flat
      hide-details
      class="pl-1"
      item-text="title"
      item-value="value"
      placeholder="Сортировка"
      :value="_sort"
      @input="setSortSettings">
    </v-select>

  </v-card>
</template>

<script>

  // Store
  import {mapState, mapActions} from "vuex";
  import {SET_SORT_SETTINGS_ACTION} from "@store/favorites/favoritesStore";

  export default {
    data() {
      return {
        items: [
          {title: 'По названию', value: 'title'},
          {title: 'По дате добавления в избранное', value: 'original'},
          {title: 'По дате обновления релизов', value: 'updates'}
        ],
      }
    },
    computed: {
      ...mapState('favorites', {_sort: s => s.settings.sort}),
    },
    methods: {
      ...mapActions('favorites', [SET_SORT_SETTINGS_ACTION]),

      /**
       * Set sort settings
       *
       * @param sort_value
       * @return {void}
       */
      setSortSettings(sort_value) {
        this[SET_SORT_SETTINGS_ACTION](sort_value);
      }
    }


  }
</script>
