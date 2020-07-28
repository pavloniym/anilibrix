<template>
  <span class="caption grey--text text--darken-1">{{items}}</span>
</template>

<script>

  const props = {
    episode: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    computed: {

      /**
       * Get episode sources
       *
       * @return Array
       */
      sources() {
        return this.$__get(this.episode, 'sources') || [];
      },


      /**
       * Get source items
       *
       * @return {string}
       */
      items() {

        const sd = this.sources.find(source => source.alias === 'sd');
        const hd = this.sources.find(source => source.alias === 'hd');
        const fhd = this.sources.find(source => source.alias === 'fhd');
        const torrent = this.sources.find(source => source.type === 'torrent');


        return [
          fhd ? '1080' : null,
          hd ? '720' : null,
          sd ? '480' : null,
          torrent ? 'Торрент' : null,
        ]
          .filter(type => type)
          .join(' • ')
      },

    }
  }
</script>
