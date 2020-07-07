<template>
  <div>
    <template v-for="(item, k) in years">
      <v-card flat color="transparent" :key="k">

        <v-card-title>
          <span>{{item.year}}</span>
          <v-divider class="mx-2"/>
          <v-btn icon>
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-subtitle>{{item.year}}</v-card-subtitle>

        <v-row dense>
          <template v-for="release in item.releases">
            <v-col cols="2" :key="release.id">
              <release
                v-bind="{release}"
                @click="$emit('to:release', release)">
              </release>
            </v-col>
          </template>
        </v-row>

      </v-card>
    </template>
  </div>
</template>

<script>

  import Release from './../../components/release'

  const props = {
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
    computed: {

      /**
       * Get years groups
       *
       * @return {array}
       */
      years() {
        const years = {};

        (this.releases || []).forEach(release => {
          const year = release.year;

          years[year] = {...years[year]};
          years[year].year = year;
          years[year].releases = [...(years[year].releases || []), ...[release]]
        });

        return Object
          .values(years)
          .sort((a, b) => b.year - a.year);
      }

    }


  }
</script>
