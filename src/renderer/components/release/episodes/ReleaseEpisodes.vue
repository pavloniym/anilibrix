<template>
  <v-layout>

    <!-- Prev -->
    <div :style="{width: '5%'}" class="d-flex justify-start">
      <v-btn
        icon
        :disabled="episode <= 0"
        @click="episode = episode - 1">

        <v-icon>mdi-arrow-left</v-icon>

      </v-btn>
    </div>


    <v-slide-group
      v-model="episode"
      :show-arrows="false"
      :style="{width: '90%'}">

      <v-slide-item
        v-for="(episode, k) in release.episodes"
        v-slot:default="{ active, toggle }"
        :key="k"
        @click.native="$emit('click', episode)">

        <v-card height="100" width="200" @click="">
          {{episode.title}}
        </v-card>

      </v-slide-item>
    </v-slide-group>


    <!-- Next -->
    <div :style="{width: '5%'}" class="d-flex justify-end">
      <v-btn
        icon
        :disabled="episode >= release.episodes.length - 1"
        @click="episode = episode + 1">

        <v-icon>mdi-arrow-right</v-icon>

      </v-btn>
    </div>

  </v-layout>
</template>

<script>

  const props = {
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        episode: 0
      }
    },
  }
</script>
