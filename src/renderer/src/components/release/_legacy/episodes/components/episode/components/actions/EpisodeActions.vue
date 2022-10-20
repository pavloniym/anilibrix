<template>
  <div>

    <v-btn icon color="grey darken-2" :id="`episode__actions-${episode.id}`">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-menu
      v-model="visible"
      left
      bottom
      close-on-click
      ref="menu"
      :attach="container"
      :activator="`#episode__actions-${episode.id}`">

      <v-list dense class="grey darken-4">
        <template v-for="(item, k) in actions">
          <v-divider v-if="k > 0" :key="`d:${k}`"/>
          <v-list-item :key="k" :disabled="loading" @click.stop="item.action">

            <!-- Icon -->
            <v-icon class="mr-2" color="grey">{{item.icon}}</v-icon>

            <!-- Item -->
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>
      </v-list>
    </v-menu>

  </div>
</template>

<script>

  import {mapActions} from 'vuex'

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
        loading: false,
        visible: false,
      }
    },
    computed: {

      actions() {
        return [
          {
            icon: 'mdi-check',
            title: 'Отметить серию как просмотренную',
            action: this.setWatched,
            visible: true,
          },
          {
            icon: 'mdi-close',
            title: 'Снять отметку о просмотре',
            action: this.removeWatched,
            visible: true,
          }
        ].filter(item => item.visible)
      }

    },


    methods: {
      ...mapActions('app/watch', {
        _setWatchedEpisode: 'setWatchedEpisode',
        _removeWatchedEpisode: 'removeWatchedEpisode'
      }),


      /**
       * Set episode watch data
       *
       * @return {Promise<void>}
       */
      async setWatched() {

        // Get data for watched episode action
        // Prepare payload
        const release_id = this.release.id;
        const episode_id = this.episode.id;
        const payload = {release_id, episode_id, percentage: 100};

        // Set watched episode data
        await this._setWatchedEpisode(payload);

        // Deactivate menu
        this.visible = false;
      },


      /**
       * Remove watch package data
       *
       * @return {Promise<void>}
       */
      async removeWatched() {

        // Remove watch data
        const release_id = this.release.id;
        const episode_id = this.episode.id;
        const payload = {release_id, episode_id};

        await this._removeWatchedEpisode(payload);

        // Deactivate menu
        this.visible = false;
      }


    }
  }
</script>
