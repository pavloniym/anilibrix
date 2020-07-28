<template>
  <v-layout column>

    <!-- Comments loader -->
    <v-skeleton-loader v-if="visible === false" type="list-item-avatar-three-line@19"/>

    <!-- Comments content -->
    <webview v-bind="configuration" ref="comments" class="comments" :class="{visible}" :style="{height}"/>

  </v-layout>
</template>

<script>

  // Utils
  import {meta} from '@package'

  // Raw
  import preloadScript from '!raw-loader!./utils/preload'
  import darkThemeStyle from '!raw-loader!./themes/dark.css'


  const props = {
    release: {
      type: Object,
      default: null
    }
  };

  export default {
    props,
    data() {
      return {
        width: '100%',
        height: '100%',
        visible: false,
        interval: null,
      }
    },
    computed: {


      /**
       * Get anilibria host
       *
       * @return {string}
       */
      anilibria() {
        return meta.links.anilibria;
      },


      /**
       * Get webview configuration
       *
       * @return {*}
       */
      configuration() {
        return {
          src: this.src,
          partition: "release:comments",
          allowpopups: true,
          httpreferrer: this.anilibria,
          disablewebsecurity: true,
        }
      },

      /**
       * Get comments src
       *
       * @return {string}
       */
      src() {

        const code = this.$__get(this.release, 'code');
        const url = `${this.anilibria}/release/${code}.html`;
        const appId = process.env.VK_APP_ID;

        return `https://vk.com/widget_comments.php?app=${appId}&url=${url}&limit=10`;
      }

    },

    mounted() {

      const webview = this.$refs.comments;

      // Hide webview to hide glitched on dom-ready event
      webview.addEventListener('did-navigate', () => this.visible = false);

      // Added certificate error
      webview.addEventListener('certificate-error', () => this.$toasted.error('Произошла ошибка при загрузке комментариев. Ошибка с сертификатом'));
      webview.addEventListener('did-fail-load', () => this.$toasted.error('Произошла ошибка при загрузке комментариев'));


      // Dom ready event
      // Inject custom css and js
      webview.addEventListener('dom-ready', () => {
        this.visible = false;

        // Insert custom css theme
        // Open devtools
        webview.insertCSS(darkThemeStyle);
        //webview.openDevTools();


        // Check dom-ready was fired before
        // Set interval to update parent container
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
          webview.executeJavaScript(preloadScript).then(({width, height}) => {
            this.width = width + 'px';
            this.height = height + 'px';
          })
        }, 50);

        // Show comments after second delay
        setTimeout(() => this.visible = true, 1000);

      });

    },

    beforeDestroy() {
      if (this.interval) clearInterval(this.interval);
    }

  }

</script>

<style lang="scss">

  .comments {
    height: 100vh;
    position: absolute;
    top: -999999px;

    &.visible {
      top: 0;
      position: relative;

    }
  }

</style>
