<template>
  <v-layout fill-height align-center justify-center>
    <div class="app__loader">
      <loader-logo />
    </div>
    <div class="app__description ml-8">
      <div class="title">AniLibrix</div>
      <div class="caption dots">Загрузка свежих релизов</div>
    </div>
  </v-layout>
</template>

<script>

  import LoaderLogo from './components/logo'
  export default {
    components: {LoaderLogo},
  }
</script>

<style lang="scss" scoped>

  .app {

    &__loader {
      height: 60px;
      width: 60px;
    }

    &__description {

      .dots:after {
        content: ' .';
        animation: dots 3s steps(1, end) infinite;
      }

      @keyframes dots {
        0%, 12.5% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        37.5% {
          text-shadow: .5em 0;
        }
        50% {
          text-shadow: .5em 0, 1em 0;
        }
        62.5% {
          text-shadow: .5em 0, 1em 0, 1.5em 0;
        }
        75% {
          text-shadow: .5em 0, 1em 0, 1.5em 0, 2em 0;
        }
        87.5%, 100%{
          text-shadow: .5em 0, 1em 0, 1.5em 0, 2em 0, 2.5em;
        }
      }
    }

  }

</style>
