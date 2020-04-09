<template>
  <v-layout fill-height column align-center justify-center>

    <!-- Noise -->
    <canvas ref="noise"></canvas>

    <div class="text-center" :style="{zIndex: 1}">
      <div class="my-5 caption">При загрузке серии произошла ошибка</div>
      <v-btn text @click="goBack">Назад</v-btn>
    </div>

  </v-layout>
</template>

<script>

  export default {
    methods: {

      /**
       * Go back
       *
       * @return void
       */
      goBack() {
        this.$router.replace({
          name: 'releases'
        })
      },


      /**
       * Resize noise
       *
       * @param noise
       */
      resizeNoise(noise) {
        noise.style.width = window.innerWidth + 'px';
        noise.style.height = window.innerHeight + 'px';
      }

    },

    mounted() {
      this.$nextTick(() => {


        const
          canvas = this.$refs.noise,
          ctx = canvas.getContext('2d');

        // Closer to analouge appearance
        // Resize noise to window
        canvas.width = canvas.height = 256;
        this.resizeNoise(canvas);

        // Add resize listeners
        window.addEventListener('resize', () => this.resizeNoise(canvas), true);


        function noise(ctx) {

          let
            w = ctx.canvas.width,
            h = ctx.canvas.height,
            idata = ctx.createImageData(w, h),
            buffer32 = new Uint32Array(idata.data.buffer),
            len = buffer32.length,
            run = 0,
            color = 0,
            m = Math.random() * 6 + 4,
            band = Math.random() * 256 * 256,
            p = 0,
            i = 0;

          for (; i < len;) {
            if (run < 0) {
              run = m * Math.random();
              p = Math.pow(Math.random(), 0.4);
              if (i > band && i < band + 48 * 256) {
                p = Math.random();
              }
              color = (255 * p) << 24;
            }
            run -= 1;
            buffer32[i++] = color;
          }

          ctx.putImageData(idata, 0, 0);
        }

        let frame = 0;

        // added toggle to get 30 FPS instead of 60 FPS
        (function loop() {
          frame += 1;
          if (frame % 3) {
            requestAnimationFrame(loop);
            return;
          }
          noise(ctx);
          requestAnimationFrame(loop);
        })();

      })
    },


    destroyed() {
      window.removeEventListener('resize', this.resizeNoise)
    }

  }
</script>


<style lang="scss" scoped>

  canvas {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 0;
    opacity: .05;
  }


</style>
