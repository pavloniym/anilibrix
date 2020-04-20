<template>
  <v-layout class="shrink">

    <!-- Search -->
    <v-tooltip left>
      <template v-slot:activator="{on}">
        <v-btn v-on="on" icon @click="visible = !visible">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <span>Поиск релизов</span>
    </v-tooltip>

    <v-expand-x-transition appear mode="out-in">
      <v-autocomplete
        v-if="visible"
        v-model="release"
        solo
        autofocus
        no-filter
        hide-details
        hide-no-data
        return-object
        item-value="id"
        item-text="names.ru"
        :items="_items"
        :style="{width: '40vw', maxWidth: '40vw'}"
        :loading="_loading"
        :allow-overflow="false"
        :search-input.sync="search"
        @change="openRelease($event)">

        <template v-slot:item="{item}">
          <v-list-item-content :style="{width: '35vw', maxWidth: '35vw'}">
            <v-list-item-title v-text="item.names.ru"/>
            <v-list-item-subtitle v-text="item.names.original"/>
          </v-list-item-content>
        </template>

      </v-autocomplete>
    </v-expand-x-transition>

  </v-layout>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        visible: false,
        search: null,
        release: null,
      }
    },
    computed: {
      ...mapState('search', {
        _loading: s => s.loading,
        _items: s => s.data,
      }),
    },

    methods: {
      ...mapActions('search', ['getReleasesByName']),

      /**
       * Open release view
       *
       * @param release
       * @return void
       */
      openRelease(release) {
        this.$router.push({
          name: 'release',
          params: {
            releaseId: release.id,
            releaseTitle: release.names.ru,
          }
        })
      }

    },

    watch: {

      search: {
        handler(search) {
          if (search && search.length >= 3) {
            this.getReleasesByName(search);
          }
        }
      }
    }
  }
</script>
