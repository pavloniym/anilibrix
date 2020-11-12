<template>

  <!-- Check if release is in favorite -->
  <!-- Remove release from favorites -->
  <v-btn
    v-if="isAuthorized"
    :color="isInFavorite ? 'secondary' : color"
    :loading="_is_loading"
    @click.stop="toggleFavorite(release)">

    <v-icon v-if="isInFavorite">mdi-star</v-icon>
    <v-icon v-else>mdi-star-outline</v-icon>

  </v-btn>
</template>

<script>

  // Store
  import {IS_AUTHORIZED_GETTER} from "@store/app/account/appAccountStore";
  import {IS_IN_FAVORITE_GETTER} from "@store/favorites/favoritesStore";
  import {mapState, mapGetters, mapActions} from 'vuex'
  import {ADD_TO_FAVORITES_ACTION, REMOVE_FROM_FAVORITES_ACTION} from "@store/favorites/favoritesStore";

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
      ...mapState('favorites', {_is_loading: s => s.is_loading}),
      ...mapGetters('favorites', [IS_IN_FAVORITE_GETTER]),
      ...mapGetters('app/account', [IS_AUTHORIZED_GETTER]),

      /**
       * Check if user is authorized
       *
       * @return {boolean}
       */
      isAuthorized() {
        return this[IS_AUTHORIZED_GETTER] === true;
      },


      /**
       * Check if provided release is in favorite
       *
       * @return {*}
       */
      isInFavorite() {
        return this[IS_IN_FAVORITE_GETTER](this.release);
      }

    },

    methods: {
      ...mapActions('favorites', [ADD_TO_FAVORITES_ACTION, REMOVE_FROM_FAVORITES_ACTION]),

      /**
       * Toggle favorite
       *
       * @param release
       * @return {void}
       */
      toggleFavorite(release) {
        this.isInFavorite
          ? this[REMOVE_FROM_FAVORITES_ACTION](release)
          : this[ADD_TO_FAVORITES_ACTION](release)
      },

    },
  }
</script>

