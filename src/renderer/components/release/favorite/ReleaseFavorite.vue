<template>

  <!-- Release is in favorite -->
  <!-- Remove release from favorites -->
  <v-tooltip v-if="_isAuthorized && isInFavorite" bottom>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" color="secondary" :loading="_loading" @click="_removeFromFavorites(release)">
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </template>
    <span>Убрать из избранного</span>
  </v-tooltip>

  <!-- Release is not in favorite -->
  <!-- Add release to favorites -->
  <v-tooltip v-else-if="_isAuthorized && !isInFavorite" bottom>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" v-bind="{color}" :loading="_loading" @click="_addToFavorites(release)">
        <v-icon>mdi-star-outline</v-icon>
      </v-btn>
    </template>
    <span>Добавить в избранное</span>
  </v-tooltip>

</template>

<script>

  import {mapState, mapGetters, mapActions} from 'vuex'

  const props = {
    release: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  };

  export default {
    props,
    computed: {
      ...mapState('favorites', {_loading: s => s.loading}),
      ...mapGetters('app/account', {_isAuthorized: 'isAuthorized'}),

      /**
       * Check if provided release is in favorite
       *
       * @return {*}
       */
      isInFavorite() {
        return this.$store.getters['favorites/isInFavorite'](this.release);
      }

    },

    methods: {
      ...mapActions('favorites', {
        _addToFavorites: 'addToFavorites',
        _removeFromFavorites: 'removeFromFavorites'
      })
    },
  }
</script>

