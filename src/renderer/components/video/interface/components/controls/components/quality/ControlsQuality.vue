<template>
  <v-menu v-bind="{attach}" top nudge-left="60" nudge-top="45">

    <!-- Quality -->
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon large>
        <v-icon size="24">{{getSourceIcon(source)}}</v-icon>
      </v-btn>
    </template>

    <!-- Qualities -->
    <v-list dense>
      <v-list-item
        v-for="(s, k) in sources"
        :input-value="s.alias === source.alias"
        :key="k"
        @click="_setQuality(s.alias)">
        <v-icon class="mr-2" color="grey">{{getSourceIcon(s)}}</v-icon>

        <v-list-item-content>
          <v-list-item-subtitle v-text="s.label"/>
        </v-list-item-content>

      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script>


  import __get from "lodash/get";
  import prettyBytes from 'pretty-bytes'
  import {mapActions} from "vuex";

  const props = {
    source: {
      type: Object,
      default: null
    },
    sources: {
      type: Array,
      default: null
    },
    attach: {
      type: HTMLDivElement,
      default: null
    }
  };

  export default {
    props,

    methods: {
      ...mapActions('app/settings/player', {_setQuality: 'setQuality'}),

      /**
       * Get source icon
       *
       * @param source
       * @return {string|null}
       */
      getSourceIcon(source) {

        const type = __get(source, 'type');
        const alias = __get(source, 'alias');

        if (type === 'server') {
          if (alias === 'sd') return 'mdi-standard-definition';
          if (alias === 'hd' || alias === 'fhd') return 'mdi-high-definition';
        } else if (type === 'torrent') return 'mdi-alpha-t';

        return null;
      },


      /**
       * Get source caption
       *
       * @param source
       * @return {string|null}
       */
      getSourceCaption(source) {

        const type = __get(source, 'type');
        if (type === 'torrent') {

          const length = __get(source, 'payload.file.length') || null;

          // const seeders = __get(source, 'payload.torrent.seeders') || 0;
          // const leechers = __get(source, 'payload.torrent.leechers') || 0;

          /*return [`С: ${seeders}`, `Л: ${leechers}`, ]
            .filter(item => item)
            .join(' • ')*/

          return length ? prettyBytes(length) : null;
        }

        return null;

      }

    },
  }
</script>
