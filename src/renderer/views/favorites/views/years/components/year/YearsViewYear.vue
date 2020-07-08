<template>
  <v-card flat color="transparent">

    <!-- Year -->
    <v-card-title :style="{cursor: 'pointer'}" @click="collapsed = !collapsed">
      <span>{{year}}</span>
      <v-divider class="mx-6"/>
      <v-btn icon color="grey" @click.stop="collapsed = !collapsed">
        <v-icon>mdi-arrow-{{collapsed ? 'down' : 'up'}}</v-icon>
      </v-btn>
    </v-card-title>

    <!-- Subtitle -->
    <v-card-subtitle v-text="subtitle" class="pb-0"/>
    <v-card-subtitle v-text="genres" class="pt-0"/>


    <!-- Releases -->
    <v-expand-transition mode="out-in">
      <v-row v-if="!collapsed" dense>
        <template v-for="release in releases">
          <v-col cols="3" lg="2" :key="release.id">
            <release
              v-bind="{release}"
              @click="$emit('toRelease', release)">
            </release>
          </v-col>
        </template>
      </v-row>
    </v-expand-transition>

  </v-card>
</template>

<script>

  import Release from './../../../../components/release'

  import pluralize from "@utils/strings/pluralize";

  const props = {
    year: {
      type: String,
      default: null
    },
    releases: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
    components: {
      Release
    },
    data() {
      return {
        collapsed: false
      }
    },

    computed: {

      /**
       * Get subtitle string
       *
       * @return {string}
       */
      subtitle() {
        return [this.items, this.episodes].join(', ');
      },

      /**
       * Get releases number
       *
       * @return {string}
       */
      items() {
        return pluralize((this.releases || []).length, ['релиз', 'релиза', 'релизов']);
      },


      /**
       * Get episodes number
       *
       * @return {T | *}
       */
      episodes() {
        const episodes = (this.releases || [])
          .reduce((storage, release) => storage + (this.$__get(release, 'episodes') || []).length, 0);

        return pluralize(episodes, ['эпизод', 'эпизода', 'эпизодов']);

      },


      /**
       * Get genres
       *
       * @return {string}
       */
      genres() {
        const genres = (this.releases || [])
          .reduce((storage, release) => [...storage, ...(this.$__get(release, 'genres') || [])], []);

        return [...new Set(genres)]
          .sort((a, b) => a.localeCompare(b))
          .join(', ');
      }


    }

  }
</script>

