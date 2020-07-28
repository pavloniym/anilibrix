<template>
  <v-list-item :style="{width: '100%', maxWidth: '100%'}" @click="">

    <!-- Avatar -->
    <v-progress-circular
      size="46"
      class="mr-4"
      color="secondary"
      :value="progress">
      <v-layout justify-center align-center>
        <v-list-item-avatar size="40" class="ma-0">
          <v-img :src="poster"/>
        </v-list-item-avatar>
      </v-layout>
    </v-progress-circular>


    <!-- Content -->
    <!-- Title -->
    <!-- Episode -->
    <v-list-item-content>
      <v-list-item-title v-text="title" class="caption font-weight-bold text-truncate" :style="{lineHeight: 1}"/>
      <v-list-item-subtitle v-text="subtitle" class="caption" :style="{lineHeight: 1}"/>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon small color="grey" @click="">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </v-list-item-action>

  </v-list-item>
</template>

<script>

  const props = {
    file: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get file progress
       *
       * @return {*|number}
       */
      progress() {
        return this.$__get(this.file, 'progress') || 0;
      },


      /**
       * Get release poster
       *
       * @return {*|string}
       */
      poster() {
        return this.$__get(this.file, 'release.poster') || '';
      },


      /**
       * Get release title
       *
       * @return {*|null}
       */
      title() {
        return this.$__get(this.file, 'release.names.ru') || null;
      },


      /**
       * Get file subtitle
       *
       * @return {string}
       */
      subtitle() {

        const episode = this.$__get(this.file, 'episode.id') || null;
        const quality = this.$__get(this.file, 'source.label') || null;
        const progress = this.$__get(this.file, 'progress') || 0;

        return [`${progress.toFixed(2)}%`, episode ? `Эпизод: ${episode}` : null, quality ? `${quality}p` : null]
          .filter(item => item)
          .join(' • ')

      }

    }

  }
</script>
