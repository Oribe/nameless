<template>
<canvas id="canvas" class="canvas" ref="canvas"/>
</template>
<script lang='ts'>

import { ref, onMounted } from 'vue';
import Animate from './Hanabi/index';

export default {
  setup() {
    const canvas = ref();
    onMounted(() => {
      canvas.value.width = window.innerWidth;
      canvas.value.height = window.innerHeight;
      const hanabi = new Animate(canvas.value);
      hanabi.run();
    });
    return {
      canvas,
    };
  },
};
</script>

<style lang="scss">
  .canvas{
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -99;
  }
</style>
