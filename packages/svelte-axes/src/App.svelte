<script>
  import { onMount } from "svelte";
  import { useAxes, PanInput } from "./svelte-axes";

  let area;
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

  onMount(() => {
    connect("rotateX rotateY", new PanInput(area));
  });
</script>

<div class="App">
  <p>You can rotate the cube using two axes.</p>
  <div id="area" bind:this={area}>
    <div id="container">
      <div id="box" style="transform: `rotateY({rotateX}deg) rotateX({rotateY}deg)`">
        <div class="face metal-linear" style="transform: 'rotateX(0deg) rotateY(0deg) translate3d(-50px,-50px,50px)'">1</div>
        <div class="face metal-linear" style="transform: 'rotateY(-90deg) translate3d(0px,-50px,100px)'">2</div>
        <div class="face metal-linear" style="transform: 'rotateY(90deg) translate3d(0px,-50px,0px)' }" >3</div>
        <div class="face metal-linear" style="transform: 'rotateX(90deg) translate3d(-50px,0px,100px)'">4</div>
        <div class="face metal-linear" style="transform: 'rotateY(180deg) translate3d(50px,-50px,50px)'">5</div>
        <div class="face metal-linear" style="transform: 'rotateX(-90deg) translate3d(-50px,0px,0px)'">6</div>
      </div>
    </div>
  </div>
</div>
