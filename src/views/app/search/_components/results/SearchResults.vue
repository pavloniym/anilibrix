<template>

  <!-- Loader -->
  <!-- Search Items -->
  <v-list v-if="items && items.length > 0">
    <template v-for="(item, k) in items">
      <v-divider v-if="k > 0" :key="`d:${k}`"/>
      <v-list-item :key="k" @click="$emit('click', item)">

        <!-- Poster -->
        <v-list-item-avatar>
          <v-img :src="item.poster"/>
        </v-list-item-avatar>

        <!-- Release Data -->
        <v-list-item-content>
          <v-list-item-title v-text="item.names.ru" class="text-pre-wrap"/>
          <v-list-item-subtitle v-text="item.names.original" class="text-pre-wrap"/>
        </v-list-item-content>

      </v-list-item>
    </template>

  </v-list>
</template>

<script>


  const props = {
    items: {
      type: Array,
      default: null
    }
  };

  export default {
    props,
  }
</script>
