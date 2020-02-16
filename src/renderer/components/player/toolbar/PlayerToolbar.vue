<template>
  <div class="player__toolbar px-8 pt-4">
    <div class="toolbar__controls"></div>
    <div class="toolbar__title">
      <div class="title__name">Название</div>
      <div class="title__episode">Серия 1</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayerTitle"
  }
</script>

<style scoped lang="scss">

  .player__toolbar {
      position: absolute;
      top: 0;
      z-index: 1;
      color: white;
      opacity: .65;
  }


</style>
