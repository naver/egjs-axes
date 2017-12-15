$(function () {
  const contentWrapper = document.getElementById("pull-contentWrapper");
  const content = document.getElementById("pull-content");
  const prepend = document.getElementById("prepend");
  const append = document.getElementById("append");

  function getInfo(pos) {
    const state = pos > 0 ? (pos - axes.axis.scroll.range[1])/100 : -pos/100;
    return {
      isAdd: state > 0.8,
      isTop: pos < 0,
    };
  }
  
  function getMaxRange() {
    return content.getBoundingClientRect().height - contentWrapper.getBoundingClientRect().height
  }
  
  function getItem() {
    const el = document.createElement("li");
    el.className = "pull_drw addblinking";
    el.innerHTML = `<div class="pull_im">
        <img src="../image/pulltorefresh/${Math.floor((Math.random() * 50) + 1)}.jpg" width="110"/>
      </div>
      <div class="pull_tx">
        <span class="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
      </div>`;
      return el;
  }
  
  // 1. Initialize eg.Axes
  const axes = new eg.Axes({
    scroll: {
      range: [0, getMaxRange()],
      bounce: 100
    }
  });
  
  // 2. attach event handler
  axes.on({
    "change": ({pos}) => {
      content.style[eg.Axes.TRANSFORM] = `translate3d(0, ${-pos.scroll}px, 0)`;
      if (axes.isBounceArea()) {
        const info = getInfo(pos.scroll);
        if (info.isAdd) {
          info.isTop ? (prepend.innerText = "Release to prepend") :
            (append.innerText = "Release to append");
        } else {
          info.isTop ? (prepend.innerText = "Pull to prepend") :
            (append.innerText = "Pull to append");
        }
      }
    },
    "release" : ({depaPos}) => {
      if (axes.isBounceArea()) {
        const info = getInfo(depaPos.scroll);
        if (info.isAdd) {
          const el = getItem();
          info.isTop ? 
            content.insertBefore(el, content.firstChild) :
            content.appendChild(el);
          axes.axis.scroll.range[1] = getMaxRange();
        }
      }
    }
  });
  
  // 3. Initialize inputTypes and connect it
  axes.connect(["", "scroll"], new eg.Axes.PanInput(contentWrapper, {
    scale : [0, -1]
  }));
});
