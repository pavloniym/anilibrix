<template>
  <canvas ref="noise"></canvas>
</template>

<script>

  export default {
    mounted() {
      this.$nextTick(() => {

        const canvas = this.$refs.noise;
        const ctx = canvas.getContext('2d');

        // Closer to analouge appearance
        // Resize noise to window
        canvas.width = canvas.height = 256;

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
    width: 100%;
    height: 100%;
  }


</style>
