<template>
  <div class="App">
    <p>You can rotate the cube using two axes.</p>
    <div id="area" ref="area">
      <div id="container" ref="container">
        <div id="box" ref="box" :style="{ transform: `rotateY(${rotateX}deg) rotateX(${rotateY}deg)` }">
          <div class="face metal-linear" :style="{ transform: 'rotateX(0deg) rotateY(0deg) translate3d(-50px,-50px,50px)' }">1</div>
          <div class="face metal-linear" :style="{ transform: 'rotateY(-90deg) translate3d(0px,-50px,100px)' }">2</div>
          <div class="face metal-linear" :style="{ transform: 'rotateY(90deg) translate3d(0px,-50px,0px)' }" >3</div>
          <div class="face metal-linear" :style="{ transform: 'rotateX(90deg) translate3d(-50px,0px,100px)' }">4</div>
          <div class="face metal-linear" :style="{ transform: 'rotateY(180deg) translate3d(50px,-50px,50px)' }">5</div>
          <div class="face metal-linear" :style="{ transform: 'rotateX(-90deg) translate3d(-50px,0px,0px)' }">6</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "@vue/composition-api";
import { PanInput, useAxes } from "../src";

export default defineComponent({
  name: "App",
  setup() {
    const area = ref(null);
    const { connect, rotateX, rotateY } = useAxes(
    {
      rotateX: {
        range: [0, 360],
        circular: true,
        startPos: 40,
      },
      rotateY: {
        range: [0, 360],
        circular: true,
        startPos: 315,
      },
    },
    {
      deceleration: 0.0024,
    });

    onMounted(() => {
      connect("rotateX rotateY", new PanInput(area));
    });

    return {
      area,
      rotateX,
      rotateY,
    };
  },
});
</script>

<style>
#area {
  display: flex;
  justify-content: center;
  position:relative;
  width:100%; height:200px;
  -webkit-perspective: 300px;
  -moz-perspective: 300px;
  -ms-perspective: 300px;
  -o-perspective: 300px;
  perspective: 300px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
}

#box {
  position:absolute;
  left:50%; top:50%;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.face {
  position:absolute;
  width:100px; height:100px;
  color: hsla(0,0%,20%,1);
  text-shadow: hsla(0,0%,40%,.5) 0 -1px 0, hsla(0,0%,100%,.6) 0 2px 1px;
  text-align: center;
  font-size:2.5em; font-weight:bold;
  text-align:center; line-height:2.5;
  -webkit-backface-visibility:hidden;
  -moz-backface-visibility:hidden;
  -ms-backface-visibility:hidden;
  -o-backface-visibility:hidden;
  backface-visibility:hidden;
  -webkit-border-radius:4px;
  -moz-border-radius:4px;
  -ms-border-radius:4px;
  -o-border-radius:4px;
  border-radius:4px;
  background:
    repeating-radial-gradient(
      line at 0 0,
      #eee,
      #ccc 50px
    );
}

.metal-linear {
  width: 100px;
  height: 100px;
  -webkit-border-radius:4px;
  -moz-border-radius:4px;
  -ms-border-radius:4px;
  -o-border-radius:4px;
  border-radius:4px;
  background-image: -webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%, .1) 7.5%),
    -webkit-repeating-linear-gradient(left, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   4%, hsla(0,0%,  0%,.03) 4.5%),
    -webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%),
    linear-gradient(180deg, hsl(0,0%,78%)  0%,
    hsl(0,0%,90%) 47%,
    hsl(0,0%,78%) 53%,
    hsl(0,0%,70%)100%);
}
</style>
