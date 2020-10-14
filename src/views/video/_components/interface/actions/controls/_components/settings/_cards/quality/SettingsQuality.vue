<template>
  <options
    v-bind="{attach}"
    is_back
    width="180"
    @back="$emit('back')"
    @close="$emit('close')">

    <quality
      v-for="(s, k) in sources"
      :key="k"
      :source="s"
      :is_active="s.alias === source.alias"
      @click="$emit('update:quality', s.alias)">
    </quality>

  </options>
</template>

<script>

  // Components
  import Quality from './_components/quality'
  import Options from './../../_components/options'

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
      Quality,
      Options
    },
    computed: {

      /**
       * Get sorted sources
       *
       * @return {array}
       */
      sources() {
        return [...this.upscale, ...this.playlist, ...this.torrents].filter(item => item)
      },

      /**
       * Get sources from episode
       *
       * @return {array}
       */
      episodes() {
        return this.$__get(this.episode, 'sources') || [];
      },


      /**
       * Get upscale sources
       *
       * @return {array}
       */
      upscale() {
        return (this.episodes || []).filter(item => item.type === 'upscale')
      },


      /**
       * Get server sources
       *
       * @return {array}
       */
      playlist() {
        return (this.episodes || []).filter(item => item.type === 'server')
      },


      /**
       * Get torrent sources
       *
       * @return {array}
       */
      torrents() {
        return (this.episodes || []).filter(item => item.type === 'torrent')
      }

    }
  }
</script>
