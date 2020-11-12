<template>
  <div>

    <!-- Activator Icon -->
    <v-btn icon color="grey" :id="`episode__actions-${episode.id}`">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <!-- Menu -->
    <v-menu
      v-model="is_visible"
      top
      left
      close-on-click
      ref="menu"
      :attach="container"
      :activator="`#episode__actions-${episode.id}`">
      <v-list dense class="grey darken-4">
        <template v-for="(item, k) in actions">

          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" @click.stop="item.action">
            <v-icon v-text="item.icon" class="mr-2" color="grey"/>
            <v-list-item-title v-text="item.title"/>
          </v-list-item>

        </template>
      </v-list>
    </v-menu>

  </div>
</template>

<script>

  // Store
  import {mapActions} from 'vuex'
  import {REMOVE_WATCHED_EPISODE_ACTION, SET_WATCHED_EPISODE_ACTION} from "@store/app/watch/appWatchStore";

  const props = {
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    },
    container: {
      type: HTMLDivElement,
      default: null,
    }
  };

  export default {
    props,
    data() {
      return {
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
            title: 'Отметить серию как просмотренную',
            action: this.setWatchedEpisode,
            visible: true,
          },
          {
            icon: 'mdi-close',
            title: 'Снять отметку о просмотре',
            action: this.clearWatchedEpisode,
            visible: true,
          }
        ].filter(item => item.visible)
      }

    },


    methods: {
      ...mapActions('app/watch', [SET_WATCHED_EPISODE_ACTION, REMOVE_WATCHED_EPISODE_ACTION]),


      /**
       * Set episode watch data
       *
       * @return {Promise<void>}
       */
      async setWatchedEpisode() {

        // Set watched episode data
        await this[SET_WATCHED_EPISODE_ACTION]({
          percentage: 100,
          release_id: this.release.id,
          episode_id: this.episode.id,
        });

        // Deactivate menu
        this.is_visible = false;
      },


      /**
       * Clear watch package data
       *
       * @return {Promise<void>}
       */
      async clearWatchedEpisode() {

        // Remove watch data
        await this[REMOVE_WATCHED_EPISODE_ACTION]({
          release_id: this.release.id,
          episode_id: this.episode.id
        });

        // Deactivate menu
        this.is_visible = false;
      }
    }
  }
</script>
