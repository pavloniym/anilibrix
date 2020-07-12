<template>
  <div class="blob"></div>
</template>

<style scoped lang="scss">

  .blob {
    border-radius: 50%;
    margin: 10px;
    height: 15px;
    width: 15px;
    transform: scale(1);
    background: grey;
    box-shadow: 0 0 0 0 rgba(128, 128, 128, 1);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(128, 128, 128, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(128, 128, 128, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(128, 128, 128, 0);
    }
  }

</style>
