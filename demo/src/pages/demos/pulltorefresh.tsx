import React, { useEffect } from "react";

import Axes, { PanInput } from "../../../../src/index";
import "../../css/demos/pulltorefresh.css";

function PullToRefresh() {
  useEffect(() => {
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
          <img src="../../../static/img/demos/pulltorefresh/${Math.floor((Math.random() * 50) + 1)}.jpg" width="110"/>
        </div>
        <div class="pull_tx">
          <span class="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
        </div>`;
        return el;
    }

    // 1. Initialize eg.Axes
    const axes = new Axes({
      scroll: {
        range: [0, getMaxRange()],
        bounce: 100
      }
    });

    // 2. attach event handler
    axes.on({
      "change": ({pos}) => {
        content.style[Axes.TRANSFORM] = `translate3d(0, ${-pos.scroll}px, 0)`;
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
    axes.connect(["", "scroll"], new PanInput(contentWrapper, {
      scale : [0, -1]
    }));
  });

  return (
    <div className="demobox" codepen="pulltorefresh">
      <p>You can create a pull-to-refresh UI using one axis.</p>
      <div id="pull-contentWrapper">
        <div id="prepend">Pull to prepend</div>
        <ul id="pull-content">
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/1.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/2.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/3.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/4.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/5.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>

          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/6.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/7.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/8.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/9.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
          <li className="pull_drw">
            <div className="pull_im">
              <img src={ require('@site/static/img/demos/pulltorefresh/10.jpg').default } width="110"/>
            </div>
            <div className="pull_tx">
              <span className="pull_tit">egjs is Javascript components group that brings easiest and fastest way to build a web application in your way</span>
            </div>
          </li>
        </ul>
        <div id="append">Pull to append</div>
      </div>
      <div className="bottomWapper"></div>
    </div>
  );
}

export default PullToRefresh;
