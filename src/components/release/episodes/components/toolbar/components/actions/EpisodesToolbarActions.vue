<template>
  <div>

    <!-- Activator Button -->
    <v-btn id="episodes__actions" height="48">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <!-- Menu -->
    <v-menu v-model="is_visible" bottom left activator="#episodes__actions" :attach="container">
      <v-list dense class="grey darken-4">
        <template v-for="(item, k) in actions">

          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" @click="item.action">
            <v-icon v-text="item.icon" class="mr-2"/>
            <v-list-item-title v-text="item.title"/>
          </v-list-item>

        </template>
      </v-list>
    </v-menu>

  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import {REMOVE_WATCHED_EPISODES_ACTION, SET_WATCHED_EPISODES_ACTION} from "@store/app/watch/appWatchStore";

  const props = {
    release: {
      type: Object,
      default: null
    },
  };

  export default {
    props,
    data() {
      return {
        container: null,
        is_visible: false,
      }
    },
    computed: {

      /**
       * Get available actions
       *
       * @return {array}
       */
      actions() {
        return [
          {
            icon: 'mdi-check',
            title: 'Отметить все серии как просмотренные',
            action: this.setWatchedEpisodes,
          },
          {
            icon: 'mdi-close',
            title: 'Снять все отметки о просмотре',
            action: this.removeWatchedEpisodes,
          }
        ]
      }

    },


    methods: {
      ...mapActions('app/watch', [SET_WATCHED_EPISODES_ACTION, REMOVE_WATCHED_EPISODES_ACTION]),


      /**
       * Set watch package data
       *
       * @return {Promise<void>}
       */
      async setWatchedEpisodes() {

        // Set watched
        await this[SET_WATCHED_EPISODES_ACTION]({
          episodes: this.release.episodes || [],
          release_id: this.release.id,
        });

        // Close menu
        this.is_visible = false;
      },


      /**
       * Remove watch package data
       *
       * @return {Promise<void>}
       */
      async removeWatchedEpisodes() {

        // Remove watched episodes
        await this[REMOVE_WATCHED_EPISODES_ACTION]({
          episodes: this.release.episodes || [],
          release_id: this.release.id,
        });

        // Close menu
        this.is_visible = false;
      },

    },

    mounted() {
      this.container = document.getElementById('playlist');
    }

  }
</script>
