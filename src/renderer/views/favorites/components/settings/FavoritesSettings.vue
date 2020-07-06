<template>
  <div>

    <!-- Seen -->
    <v-card class="mb-2">
      <v-list-item class="py-2" @click="_setSettingsShowSeen(!_show_seen)">
        <v-list-item-content>
          <v-list-item-title>Просмотренные релизы</v-list-item-title>
          <v-list-item-subtitle>Вы можете показать или скрыть уже просмотренные релизы</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch :input-value="_show_seen" @click="_setSettingsShowSeen"/>
        </v-list-item-action>
      </v-list-item>
    </v-card>


    <!-- Sort -->
    <v-card class="mb-2">
      <v-list-item class="py-2">
        <v-list-item-content>
          <v-list-item-title>Сортировка</v-list-item-title>
          <v-list-item-subtitle>Вы можете настроить способ сортировки релизов</v-list-item-subtitle>
          <v-select
            outlined
            hide-details
            class="mt-4"
            item-text="title"
            item-value="value"
            placeholder="Сортировка"
            :items="sort"
            :value="_sort"
            @input="_setSettingsSort">
          </v-select>
        </v-list-item-content>
      </v-list-item>
    </v-card>


    <!-- Group -->
    <v-card>
      <v-list-item class="py-2">
        <v-list-item-content>
          <v-list-item-title>Группировка</v-list-item-title>
          <v-list-item-subtitle>Вы можете настроить способ группровки релизов</v-list-item-subtitle>
          <v-select
            outlined
            hide-details
            class="mt-4"
            item-text="title"
            item-value="value"
            placeholder="Группировка"
            :items="group"
            :value="_group"
            @input="_setSettingsGroup">
          </v-select>
        </v-list-item-content>
      </v-list-item>
    </v-card>

  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        sort: [
          {title: 'По дате добавления в избранное', value: 'original'},
          {title: 'По названию', value: 'title'}
        ],
        group: [
          {title: 'Без группировки', value: 'original'},
          {title: 'По годам', value: 'years'},
        ]
      }
    },

    computed: {
      ...mapState('favorites', {
        _sort: s => s.settings.sort,
        _group: s => s.settings.group,
        _show_seen: s => s.settings.show_seen,
      })
    },

    methods: {

      ...mapActions('favorites', {
        _setSettingsSort: 'setSettingsSort',
        _setSettingsGroup: 'setSettingsGroup',
        _setSettingsShowSeen: 'setSettingsShowSeen',
      })


    }

  }
</script>
