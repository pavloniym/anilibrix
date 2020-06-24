<template>

  <div class="scroll-back" :style="{left: -leftOffset + 'px'}" :class="{'scroll-back--active': shift > 60}">
    <v-icon large>mdi-arrow-left</v-icon>
  </div>


</template>

<script>

  import {AppPlatformMixin} from '@mixins/app'

  export default {
    mixins: [AppPlatformMixin],
    data() {
      return {
        from: null,
        shift: 0,
        scroll: null,
        handler: null,
      }
    },

    computed: {

      leftOffset() {
        return this.shift <= 60 ? 60 - this.shift : 0;
      }


    },

    methods: {

      handleMousewheel(event) {
        this.scroll = event;
      }

    },


    mounted() {

      window.addEventListener('mousewheel', this.handleMousewheel);

    },

    destroyed() {
      window.removeEventListener('mousewheel', this.handleMousewheel);
    },

    watch: {

      $route: {
        deep: true,
        handler(to, from) {
          this.from = from || null;
          this.shift = 0;
        }
      },


      scroll: {
        deep: true,
        handler(scroll, previous) {
          console.log(scroll);
          if (this.from && this.from.name) {

            if (this.handler) clearTimeout(this.handler);

            const deltaX = scroll && scroll.wheelDeltaX ? scroll.wheelDeltaX : 0;
            const previousDeltaX = previous && previous.wheelDeltaX ? previous.wheelDeltaX : 0;

            if (deltaX < previousDeltaX) this.shift = this.shift + Math.abs(deltaX);

            this.handler = setTimeout(() => this.shift = 0, 500);

          }
        }
      },

      shift: {
        handler(shift) {
          if (shift > 65 && this.from && this.from.name) {
            this.$router.replace(this.from)
          }
        }
      }

    }

  }
</script>

<style scoped lang="scss">

  .scroll-back {
    position: absolute;
    top: calc(50% - 70px);
    height: 70px;
    display: flex;
    align-items: center;
    width: 60px;
    background: #ffffff6b;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    left: -60px;

    &--active {
      background: white;
    }
  }

</style>
