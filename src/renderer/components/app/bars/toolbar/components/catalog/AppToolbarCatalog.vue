<template>
  <v-tooltip left>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" icon @click="toCatalog">
        <v-icon>mdi-folder-multiple-outline</v-icon>
      </v-btn>
    </template>
    <span>Каталог релизов</span>
  </v-tooltip>
</template>

<script>
    export default {

        methods: {

          /**
           * Go to catalog page
           *
           * @return void
           */
          toCatalog() {
            this.$router.push({
              name: 'catalog'
            })
          }
        }
    }
</script>
