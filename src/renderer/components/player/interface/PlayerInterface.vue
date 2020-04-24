<template>
  <div>
    <v-slide-y-reverse-transition>
      <v-layout v-show="visible" column class="interface pa-8">


        <interface-headline v-bind="{player, release, episode}" class="pb-2"/>
        <interface-timeline v-bind="{player}"/>


        <v-row no-gutters justify="center">
          <v-col align-self="center">
            <interface-links v-bind="{release}"/>
          </v-col>
          <v-col align-self="center">
            <interface-play v-bind="{player, release, episode}"/>
          </v-col>
          <v-col align-self="center">
            <interface-controls v-bind="{player, source, sources, container}"/>
          </v-col>
        </v-row>

      </v-layout>
    </v-slide-y-reverse-transition>
    <interface-buffering v-bind="{player}"/>
  </div>
</template>

<script>

  import InterfacePlay from './components/play'
  import InterfaceLinks from './components/links'
  import InterfaceHeadline from './components/headline'
  import InterfaceTimeline from './components/timeline'
  import InterfaceControls from './components/controls'
  import InterfaceBuffering from './components/buffering'


  const props = {
    player: {
      type: Object,
      default: null
    },
    sources: {
      type: Array,
      default: null
    },
    source: {
      type: Object,
      default: null
    },
    container: {
      type: HTMLDivElement,
      default: null
    },
    release: {
      type: Object,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  };


  export default {
    props,
    components: {
      InterfacePlay,
      InterfaceLinks,
      InterfaceHeadline,
      InterfaceTimeline,
      InterfaceControls,
      InterfaceBuffering,
    },
    data() {
      return {
        visible: true,
        visibilityHandler: null,
      }
    },

    methods: {


      /**
       * Show player controls
       *
       * @return void
       */
      showInterface() {

        // Show controls
        this.visible = true;

        // Clear previous interval
        if (this.visibilityHandler) clearTimeout(this.visibilityHandler);

        // Create new interval
        this.visibilityHandler = setTimeout(() => this.visible = false, 2500)
      },


    },

    mounted() {
      this.$nextTick(async () => {

        // Hide / Show controls
        this.showInterface();

        // Add some event listeners
        window.addEventListener('mousemove', this.showInterface, true);
      })
    },


    destroyed() {
      window.removeEventListener('mousemove', this.showInterface);
    }

  }
</script>

<style scoped lang="scss">

  .interface {
    width: 100%;
    bottom: 0;
    z-index: 10;
    position: absolute;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 50%, rgba(255, 255, 255, 0) 100%);
    user-select: none;
  }

</style>
