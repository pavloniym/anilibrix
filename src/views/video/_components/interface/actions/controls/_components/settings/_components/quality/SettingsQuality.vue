<template>
  <v-menu
    v-click-outside="() => $emit('close')"
    top
    left
    min-width="180px"
    nudge-right="50"
    :value="true"
    :attach="attach()"
    :close-on-click="false"
    :close-on-content-click="false">

    <v-list nav dense class="video__settings__items">

      <!-- Back -->
      <v-list-item @click="$emit('back')">
        <v-icon small class="mr-2">mdi-chevron-left</v-icon>
        <v-list-item-title v-text="'Назад'"/>
      </v-list-item>
      <v-divider class="my-2"/>

      <!-- Qualities -->
      <quality
        v-for="(s, k) in sources"
        :key="k"
        :source="s"
        :is_active="s.alias === source.alias"
        @click="$emit('update:quality', s.alias)">
      </quality>

    </v-list>
  </v-menu>
</template>

<script>

  // Components
  import Quality from './_components/quality'

  const props = {
    source: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    },
    attach: {
      type: Function,
      default: null
    }
  };

  export default {
    props,
    components: {
      Quality
    },
    computed: {


      /**
       * Get sorted sources
       *
       * @return {array}
       */
      sources() {
        return [...this.upscaleSources, ...this.serverSources, ...this.torrentSources]
          .filter(item => item)
      },


      /**
       * Get sources from episode
       *
       * @return {array}
       */
      episodeSources() {
        return this.$__get(this.episode, 'sources') || [];
      },

      /**
       * Get upscale sources
       *
       * @return {array}
       */
      upscaleSources() {
        return (this.episodeSources || []).filter(item => item.type === 'upscale')
      },

      /**
       * Get server sources
       *
       * @return {array}
       */
      serverSources() {
        return (this.episodeSources || []).filter(item => item.type === 'server')
      },


      /**
       * Get torrent sources
       *
       * @return {array}
       */
      torrentSources() {
        return (this.episodeSources || []).filter(item => item.type === 'torrent')
      }

    },

    methods: {


      getLabel() {

      }

    },
  }
</script>


<style scoped lang="scss">

  .video__settings__items {
    .v-list-item {
      height: 32px;
      min-height: auto;
    }
  }
</style>
