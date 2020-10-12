<template>
  <v-list dense>

    <!-- Close -->
    <v-list-item @click="$emit('back')">
      <v-icon small class="mr-2">mdi-chevron-left</v-icon>
      <v-list-item-title v-text="'Назад'"/>
    </v-list-item>
    <v-divider class="my-2"/>

    <!--<template v-for="(s, k) in sortedSources">
      <v-list-item
        :key="k"
        :input-value="s.alias === source.alias"
        @click="$emit('click', s)">

        <v-icon class="mr-2" color="grey">{{getSourceIcon(s)}}</v-icon>
        <v-list-item-content>
          <v-list-item-subtitle v-text="s.label"/>
        </v-list-item-content>

      </v-list-item>
    </template>-->

  </v-list>
</template>

<script>

  const props = {
    source: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    computed: {


      /**
       * Get sources from episode
       *
       * @return {array}
       */
      sources() {
        return this.$__get(this.episode, 'sources') || [];
      },


      /**
       * Get upscale sources
       *
       * @return {array}
       */
      upscaleSources() {
        return (this.sources || []).filter(item => item.type === 'upscale')
      },

      /**
       * Get server sources
       *
       * @return {array}
       */
      serverSources() {
        return (this.sources || []).filter(item => item.type === 'server')
      },

      /**
       * Get torrent sources
       *
       * @return {array}
       */
      torrentSources() {
        return (this.sources || []).filter(item => item.type === 'torrent')
      },


      /**
       * Get sorted sources
       *
       * @return {array}
       */
      sortedSources() {
        return [...this.upscaleSources, ...this.serverSources, ...this.torrentSources]
          .filter(item => item)
      }

    },

    methods: {

      /**
       * Get source icon
       *
       * @param source
       * @return {string|null}
       */
      getSourceIcon(source) {

        const type = this.$__get(source, 'type');
        const alias = this.$__get(source, 'alias');

        if (alias === 'sd') return 'mdi-standard-definition';
        if (alias === 'hd') return 'mdi-high-definition';
        if (alias === 'fhd') return 'mdi-high-definition';
        if (alias === '2k') return 'mdi-ultra-high-definition';
        if (alias === '4k') return 'mdi-ultra-high-definition';
        if (type === 'torrent') return 'mdi-alpha-t';

        return null;
      }

    },
  }
</script>
