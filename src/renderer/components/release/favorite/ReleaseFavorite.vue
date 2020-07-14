<template>

  <!-- Check if release is in favorite -->
  <!-- Remove release from favorites -->
  <v-btn
    :color="isInFavorite ? 'secondary' : color"
    :loading="_loading"
    @click="isInFavorite ? _removeFromFavorites(release) : _addToFavorites(release)">

    <v-icon v-if="isInFavorite">mdi-star</v-icon>
    <v-icon v-else>mdi-star-outline</v-icon>

  </v-btn>
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

