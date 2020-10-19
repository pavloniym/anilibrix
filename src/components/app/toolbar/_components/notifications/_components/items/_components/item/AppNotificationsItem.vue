<template>
  <v-list-item @click="$emit('click', {release_id: release.id, episode_id: episode.id})">

    <!-- Avatar -->
    <v-list-item-avatar>
      <v-img v-bind="{src}"/>
    </v-list-item-avatar>

    <!-- Content -->
    <v-list-item-content>
      <v-list-item-title v-text="name"/>
      <v-list-item-subtitle>Вышла {{episodeNumber}} серия</v-list-item-subtitle>
      <v-list-item-subtitle v-text="datetime" class="grey--text text--darken-2"/>
    </v-list-item-content>

  </v-list-item>
</template>

<script>

  const props = {
    notification: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get release
       *
       * @return {*}
       */
      release() {
        return this.$__get(this.notification, 'release');
      },


      /**
       * Get episode
       *
       * @return {*}
       */
      episode() {
        return this.$__get(this.notification, 'episode');
      },


      /**
       * Get release poster src
       *
       * @return {*}
       */
      src() {
        return this.$__get(this.release, 'poster');
      },


      /**
       * Get release name
       *
       * @return {*}
       */
      name() {
        return this.$__get(this.release, 'names.ru');
      },

      /**
       * Get episode number
       *
       * @return {*}
       */
      episodeNumber() {
        return this.$__get(this.episode, 'id');
      },

      /**
       * Get datetime
       *
       * @return {string}
       */
      datetime() {
        return this.$moment(this.notification.datetime).fromNow();
      }

    }
  }
</script>
