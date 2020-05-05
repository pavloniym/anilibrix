<template>
  <catalog-layout>

    <v-layout class="px-6">
      <catalog-item />
    </v-layout>



  </catalog-layout>
</template>

<script>

  import CatalogItem from "@components/catalog/item";
  import CatalogLayout from '@layouts/catalog'

  import AnilibriaProxy from "@proxies/anilibria";

  export default {
    name: "Catalog",
    components: {
      CatalogItem,
      CatalogLayout,
    },
    data() {
      return {
        page: 1,
        items: [],
        loading: false,
      }
    },

    created() {


    }
  }
</script>
