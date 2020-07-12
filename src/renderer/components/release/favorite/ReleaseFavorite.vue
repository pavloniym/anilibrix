<template>

  <!-- Release is in favorite -->
  <!-- Remove release from favorites -->
  <v-tooltip v-if="release && _isAuthorized && isInFavorite" v-bind="{...tooltipDirection}">
    <template v-slot:activator="{on}">
      <v-btn v-on="on" color="secondary" :loading="_loading" @click="_removeFromFavorites(release)">
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </template>
    <div :style="{height: '26px', lineHeight: '26px'}">Убрать из избранного</div>
  </v-tooltip>


  <!-- Release is not in favorite -->
  <!-- Add release to favorites -->
  <v-tooltip v-else-if="release && _isAuthorized && !isInFavorite" v-bind="{...tooltipDirection}">
    <template v-slot:activator="{on}">
      <v-btn v-on="on" v-bind="{color}" :loading="_loading" @click="_addToFavorites(release)">
        <v-icon>mdi-star-outline</v-icon>
      </v-btn>
    </template>
    <div :style="{height: '26px', lineHeight: '26px'}">Добавить в избранное</div>
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
    },
    tooltipPosition: {
      type: String,
      default: 'bottom'
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
      },


      /**
       * Calculate tooltip direction
       *
       * @return {*}
       */
      tooltipDirection() {
        return ['top', 'right', 'bottom', 'left']
          .reduce((storage, position) => ({...storage, [position]: this.tooltipPosition === position}), {});
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

