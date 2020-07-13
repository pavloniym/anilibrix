<template>
  <div>

    <!-- Comments loader -->
    <v-skeleton-loader v-if="visible === false" type="list-item-avatar-three-line@19"/>

    <!-- Comments content -->
    <webview v-bind="configuration" ref="comments" class="comments" :class="{visible}" :style="{height}"/>

  </div>
</template>

<script>

  import {mapState} from 'vuex'

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
      ...mapState('app/settings/connection', {_host: s => s.host}),


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
          httpreferrer: this._host,
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
        const url = `${this._host}/release/${code}.html`;
        const appId = process.env.VK_APP_ID;

        return `https://vk.com/widget_comments.php?app=${appId}&url=${url}&limit=10`;
      }

    },

    mounted() {

      const webview = this.$refs.comments;
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

      webview.addEventListener('did-navigate', () => this.visible = false);

    },

    beforeDestroy() {
      if (this.interval) clearInterval(this.interval);
    }

  }

</script>

<style lang="scss">

  .comments {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: -999999px;

    &.visible {
      top: 0;
      position: relative;

    }
  }

</style>
