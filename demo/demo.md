### Car 360º viewer

<div class="car_spot">
<div class="car_rotate">
  <div class="img_cont" style="position:relative;z-index:10">
    <img height="150" src="./assets/image/car360/beatle (1).png">
    <img height="150" src="./assets/image/car360/beatle (2).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (3).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (4).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (5).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (6).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (7).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (8).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (9).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (10).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (11).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (12).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (13).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (14).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (15).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (16).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (17).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (18).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (19).png" style="display:none;">
    <img height="150" src="./assets/image/car360/beatle (20).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (21).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (22).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (23).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (24).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (25).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (26).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (27).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (28).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (29).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (30).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (31).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (32).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (33).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (34).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (35).png" style="display:none">
    <img height="150" src="./assets/image/car360/beatle (36).png" style="display:none">
  </div>
  <div class="ratate_bg"></div>
</div>
</div>


```javascript
new eg.MovableCoord({
  min: [0, 0],
  max: [720, 0],
  bounce: [0, 0, 0, 0],
  circular: [false, true, false, true],
}).on({
  "change": function(e) {
    var $images = jQuery(".car_rotate img");
    var imagesNum = $images.length;
    var ape = 360 / imagesNum; // angle per each 
    var index = Math.min(Math.round(e.pos[0] % 360 / ape), imagesNum - 1);
    
    $images.hide().eq(index).show();
  }
}).bind(jQuery(".car_rotate").get(0));
```


### Cards in hands

<!-- Cards in hands -->
<div class="bg-primary" id="showcase">
  <div class="showcase-item">
  <div class="showcase-content">
    <div id="movableCoordWrapper">
    <div class="hand">
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
      <div class="handcard" style=""><img class="logo_mono" src="./assets/image/logo_mono.svg"></div>
    </div>
    </div>
    <div id="dot" class="movableDot"></div>
  </div>
  </div>
</div>


```javascript
new eg.MovableCoord({
  min : [handRotMin, 0],
  max: [handRotMax, 0],
  circular: false,
  deceleration: 0.00034,
  bounce: [160, 15, 40, 15]
}).on({
"change" : function(evt) {
  var cardDistance;
  var cardOffset;
  var currentRotateZ;
  var pos = evt.pos;

  movableDot.style["bottom"] = -1.4 * pos[1] + "px";
  movableDot.style[TRANSFORM] = "translateX(" + (pos[0] * 2.3) + "px)";
  hand.style[TRANSFORM] = "rotateZ(" + pos[0] + "deg)";
  cards.forEach(function(v) {
    cardDistance = getCardDistance(v, hand).distance;
    cardOffset = pos[1];
    currentRotateZ = v.style[TRANSFORM].split("translateY")[0];
    v.style[TRANSFORM] = currentRotateZ +
    "translateY(" + (parseFloat(v.getAttribute("data-cardOffset")) + pos[1]) + "px)";
  });
  }
}).bind(hand, {
  maximumSpeed : 50,
  scale: [0.3, 0.8]
}).setTo((handRotMin + handRotMax) / 2, 0);
```

### Rotate a Cube

<div id="area">
  <div id="box">
  <div class="face" style="background-color:#f00; -webkit-transform:rotateX(0deg) rotateY(0deg) translate3d(-100px,-100px,100px);">1</div>
  <div class="face" style="background-color:#0f0; -webkit-transform:rotateY(-90deg) translate3d(0px,-100px,200px);">2</div>
  <div class="face" style="background-color:#00f; -webkit-transform:rotateY(90deg) translate3d(0px,-100px,0px);">3</div>
  <div class="face" style="background-color:#f80; -webkit-transform:rotateX(90deg) translate3d(-100px,0px,200px);">4</div>
  <div class="face" style="background-color:#f0f; -webkit-transform:rotateY(180deg) translate3d(100px,-100px,100px);">5</div>
  <div class="face" style="background-color:#0ff; -webkit-transform:rotateX(-90deg) translate3d(-100px,00px,0px);">6</div>
  </div>
</div>

```js
var box = document.getElementById("box");
new eg.MovableCoord({
  min : [ 0, 0 ],
  max : [ 360, 360 ],
  circular : true,
deceleration : 0.0024
}).on({
  "change" : function(evt) {
    var pos = evt.pos;
    box.style[TRANSFORM] = "rotateY(" + pos[0] + "deg) rotateX(" + pos[1] + "deg)";
  }
}).bind("#area", {
  direction : eg.MovableCoord.DIRECTION_ALL,
  maximumSpeed : 50
});
```

### Swipe example (Cover effect)

<div id="coverarea">
  <ul id="lists">
    <li style="background-color:yellow;">
      PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1
      PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1
      PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1
      PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1
      PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1
      PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1 PANEL 1
    </li>
    <li style="background-color:yellowgreen;">
      PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2
      PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2
      PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2
      PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2
      PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2
      PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2 PANEL 2
    </li>
    <li style="background-color:violet;">
      PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3
      PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3
      PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3
      PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3
      PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3
      PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3 PANEL 3
    </li>
    <li style="background-color:skyblue;">
      PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4
      PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4
      PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4
      PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4
      PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4
      PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4 PANEL 4
    </li>
    <li style="background-color:orange;">
      PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5
      PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5
      PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5
      PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5
      PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5
      PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5 PANEL 5
    </li>
  </ul>
</div>

```js
var listEl = document.getElementById("lists");
new eg.MovableCoord({
  min : [0, 0],
  max : [1200, 100],
  bounce : [0, 100, 0, 100]
}).on({
  "change" : function(evt) {
    var pos = evt.pos;
    var base = pos[0] / 300;
    var idx = Math.ceil(base);
    var list = listEl.querySelectorAll("li");
    var len = list.length;

    if (idx >= len) {
      listEl.style[TRANSFORM] = "translate3d(" + (pos[0] - this.options.max[0]) + "px,0,0)";
    } else {
      listEl.style[TRANSFORM] = "translate3d(0,0,0)";
    }

    if (list[idx-1]) { 
      list[idx-1].style[TRANSFORM] = "translate3d(0,0,0)"; 
    }
    if (list[idx]) { 
      list[idx].style[TRANSFORM] = "translate3d(" + ((base-idx)*300) + "px,0,0)";
    }
    if (list[idx+1]) { 
      list[idx+1].style[TRANSFORM] = "translate3d(-300px, 0, 0)";
    }
  },
  "release" : function(evt) {
    var pos = evt.destPos;
    pos[0] = Math.round(pos[0] / 300) * 300;
  }
}).bind("#coverarea", {
  scale : [1, 0.2],
  direction : eg.MovableCoord.DIRECTION_ALL
}).setTo(1200, 100, 0);
```
