<template>
  <div>

    <!-- Comments loader -->
    <v-skeleton-loader v-if="visible === false" type="list-item-two-line@20"/>

    <!-- Comments content -->
    <v-fade-transition appear mode="out-in">
      <webview v-bind="configuration" ref="comments" class="comments" :class="{visible}" :style="{height}"/>
    </v-fade-transition>

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

        // Insert custom css theme
        // Open devtools
        webview.insertCSS(darkThemeStyle);
        //webview.openDevTools();

        // Set interval to update parent container
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
    width: 100%;
    height: 100vh;
    opacity: 0;
    transition: opacity .2s ease;

    &.visible {
      opacity: 1;
    }
  }

</style>
