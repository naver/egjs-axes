(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[2898],{9259:function(t,e,n){"use strict";n.r(e);var i=n(7294),r=n(4010),s=n(6389),a=new r.ZP({scroll:{range:[0,0],bounce:100}}),o=function(t,e){return t.getBoundingClientRect().height-e.getBoundingClientRect().height},u=function(t){return{isAdd:(t>0?(t-a.axis.scroll.range[1])/100:-t/100)>.8,isTop:t<0}};e.default=function(){var t=(0,i.useState)([1,2,3,4,5,6,7,8,9,10]),e=t[0],c=t[1];return(0,i.useEffect)((function(){var t=document.getElementById("pull-contentWrapper"),e=document.getElementById("pull-content"),n=document.getElementById("prepend"),i=document.getElementById("append");a.axis.scroll.range=[0,o(e,t)],a.connect(["","scroll"],new s.Ju(t,{scale:[0,-1]})),a.on({change:function(t){var s=t.pos;if(e.style[r.ZP.TRANSFORM]="translate3d(0, "+-s.scroll+"px, 0)",a.isBounceArea()){var o=u(s.scroll);o.isAdd?o.isTop?n.innerText="Release to prepend":i.innerText="Release to append":o.isTop?n.innerText="Pull to prepend":i.innerText="Pull to append"}}})}),[]),(0,i.useEffect)((function(){var t=document.getElementById("pull-contentWrapper"),n=document.getElementById("pull-content");a.off("release"),a.on({release:function(i){var r=i.depaPos;if(a.isBounceArea()){var s=u(r.scroll);if(s.isAdd){var f=Math.floor(50*Math.random()+1);s.isTop?c([f].concat(e)):c([].concat(e,[f])),a.axis.scroll.range[1]=o(n,t)}}}})}),[e]),i.createElement("div",{className:"demobox"},i.createElement("p",null,"You can create a pull-to-refresh UI using one axis."),i.createElement("div",{id:"pull-contentWrapper"},i.createElement("div",{id:"prepend"},"Pull to prepend"),i.createElement("ul",{id:"pull-content"},e.map((function(t,e){return i.createElement("li",{className:"pull_drw",key:e},i.createElement("div",{className:"pull_im"},i.createElement("img",{src:n(7969)("./"+t+".jpg").default,width:"110"})),i.createElement("div",{className:"pull_tx"},i.createElement("span",{className:"pull_tit"},"egjs is Javascript components group that brings easiest and fastest way to build a web application in your way")))}))),i.createElement("div",{id:"append"},"Pull to append")),i.createElement("div",{className:"bottomWapper"}))}},1520:function(t,e,n){"use strict";n.d(e,{Z:function(){return E}});var i=n(7326),r=n(4578),s=n(2921),a=function(t,e,n,i){var r=t,s=[n[0]?e[0]:i?e[0]-i[0]:e[0],n[1]?e[1]:i?e[1]+i[1]:e[1]];return r=Math.max(s[0],r),r=Math.min(s[1],r)},o=function(t,e){return t<e[0]||t>e[1]},u=function(t,e,n){return n[1]&&t>e[1]||n[0]&&t<e[0]},c=function(t,e,n){var i=t,r=e[0],s=e[1],a=s-r;return n[1]&&t>s&&(i=(i-s)%a+r),n[0]&&t<r&&(i=(i-r)%a+s),i},f=n(8519),h=function(t,e,n){return Math.max(Math.min(t,n),e)},g=function(){function t(t){var e=t.options,n=t.interruptManager,i=t.eventManager,r=t.axisManager;this._options=e,this.interruptManager=n,this.eventManager=i,this.axisManager=r,this.animationEnd=this.animationEnd.bind(this)}var e=t.prototype;return e.getDuration=function(t,e,n){var i,r=this;if(void 0!==n)i=n;else{var s=(0,f.UI)(e,(function(e,n){return function(t,e){var n=Math.sqrt(t/e*2);return n<100?0:n}(Math.abs(e-t[n]),r._options.deceleration)}));i=Object.keys(s).reduce((function(t,e){return Math.max(t,s[e])}),-1/0)}return h(i,this._options.minimumDuration,this._options.maximumDuration)},e.getDisplacement=function(t){var e=Math.pow(t.reduce((function(t,e){return t+e*e}),0),1/t.length),n=Math.abs(e/-this._options.deceleration);return t.map((function(t){return t/2*n}))},e.interpolate=function(t,e){var n=this.easing(1e-5)/1e-5;return this.easing(t/(e*n))*e},e.stopAnimation=function(t){if(this._animateParam){var e=this.axisManager.get(),n=this.axisManager.map(e,(function(t,e){return c(t,e.range,e.circular)}));(0,f.yW)(n,(function(t,n){return e[n]===t}))||this.eventManager.triggerChange(n,e,t,!!t),this._animateParam=null,this._raf&&(0,f.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}},e.getEventInfo=function(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null},e.restore=function(t){var e=this.axisManager.get(),n=this.axisManager.map(e,(function(t,e){return Math.min(e.range[1],Math.max(e.range[0],t))}));this.stopAnimation(),this.animateTo(n,this.getDuration(e,n),t)},e.animationEnd=function(){var t=this.getEventInfo();this._animateParam=null;var e=this.axisManager.filter(this.axisManager.get(),(function(t,e){return u(t,e.range,e.circular)}));Object.keys(e).length>0&&this.setTo(this.axisManager.map(e,(function(t,e){return c(t,e.range,e.circular)}))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)},e.finish=function(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)},e.getUserControl=function(t){var e=t.setTo();return e.destPos=this.axisManager.get(e.destPos),e.duration=h(e.duration,this._options.minimumDuration,this._options.maximumDuration),e},e.animateTo=function(t,e,n){var i=this;this.stopAnimation();var r=this._createAnimationParam(t,e,n),s=Object.assign({},r.depaPos),a=this.eventManager.triggerAnimationStart(r),o=this.getUserControl(r);if(!a&&this.axisManager.every(o.destPos,(function(t,e){return u(t,e.range,e.circular)}))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),a&&!(0,f.Dg)(o.destPos,s)){var c=(null==n?void 0:n.event)||null;this._animateLoop({depaPos:s,destPos:o.destPos,duration:o.duration,delta:this.axisManager.getDelta(s,o.destPos),isTrusted:!!c,inputEvent:c,input:(null==n?void 0:n.input)||null},(function(){return i.animationEnd()}))}},e.easing=function(t){return t>1?1:this._options.easing(t)},e.setTo=function(t,e){void 0===e&&(e=0);var n=Object.keys(t),i=this.axisManager.get(n);if((0,f.Dg)(t,i))return this;this.interruptManager.setInterrupt(!0);var r=(0,f.hX)(t,(function(t,e){return i[e]!==t}));return Object.keys(r).length?(r=this.axisManager.map(r,(function(t,e){var n=e.range,i=e.circular;return i&&(i[0]||i[1])?t:a(t,n,i)})),(0,f.Dg)(r,i)||(e>0?this.animateTo(r,e):(this.stopAnimation(),this.eventManager.triggerChange(r),this.finish(!1))),this):this},e.setBy=function(t,e){return void 0===e&&(e=0),this.setTo((0,f.UI)(this.axisManager.get(Object.keys(t)),(function(e,n){return e+t[n]})),e)},e.updateAnimation=function(t){var e=this._animateParam;if(e){var n=(new Date).getTime()-e.startTime,i=(null==t?void 0:t.destPos)||e.destPos,r=(null==t?void 0:t.duration)||e.duration;if(null!=t&&t.restart||r<=n)this.setTo(i,r-n);else{if(null!=t&&t.destPos){var s=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,e.delta=this.axisManager.getDelta(s,i),e.destPos=i}if(null!=t&&t.duration){var a=(n+this._durationOffset)/e.duration;this._durationOffset=a*r-n,e.duration=r}}}},e._createAnimationParam=function(t,e,n){var i=this.axisManager.get(),r=t,s=(null==n?void 0:n.event)||null;return{depaPos:i,destPos:r,duration:h(e,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(i,r),inputEvent:s,input:(null==n?void 0:n.input)||null,isTrusted:!!s,done:this.animationEnd}},e._animateLoop=function(t,e){var n=this;if(t.duration){var i=t.depaPos;this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,this._animateParam=Object.assign({},t,{startTime:(new Date).getTime()});var r=(0,f.UI)(i,(function(e,n){return e<=t.destPos[n]?1:-1})),s=(0,f.UI)(t.destPos,(function(t){return t}));!function t(){var a=n._animateParam,o=((new Date).getTime()-a.startTime+n._durationOffset)/a.duration,u=n.easing(o);n._raf=null;var h=n.axisManager.map(i,(function(t,e,s){var f=o>=1?a.destPos[s]:t+a.delta[s]*(u-n._prevEasingPer)/(1-n._initialEasingPer),h=c(f,e.range,e.circular);if(f!==h){var g=r[s]*(e.range[1]-e.range[0]);a.destPos[s]-=g,i[s]-=g}return h})),g=!n.eventManager.triggerChange(h,i);if(i=h,n._prevEasingPer=u,u>=1)return a.destPos=n._getFinalPos(a.destPos,s),(0,f.Dg)(a.destPos,n.axisManager.get(Object.keys(a.destPos)))||n.eventManager.triggerChange(a.destPos,i),void e();g?n.finish(!1):n._raf=(0,f.U7)(t)}()}else this.eventManager.triggerChange(t.destPos),e()},e._getFinalPos=function(t,e){var n=this,i=1e-6;return(0,f.UI)(t,(function(t,r){if(t>=e[r]-i&&t<=e[r]+i)return e[r];var s=n._getRoundUnit(t,r);return(0,f.QV)(t,s)}))},e._getRoundUnit=function(t,e){var n=this._options.round,i=null;if(!n){var r=this.axisManager.getAxisOptions(e);i=(0,f.Dw)(Math.max((0,f.il)(r.range[0]),(0,f.il)(r.range[1]),(0,f.il)(t)))}return i||n},t}(),d=function(){function t(t){this._axes=t}var e=t.prototype;return e.hold=function(t,e){var n=this._getRoundPos(t).roundPos;this._axes.trigger(new s.L("hold",{pos:n,input:e.input||null,inputEvent:e.event||null,isTrusted:!0}))},e.triggerRelease=function(t){var e=this._getRoundPos(t.destPos,t.depaPos),n=e.roundPos,i=e.roundDepa;t.destPos=n,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new s.L("release",Object.assign({},t,{bounceRatio:this._getBounceRatio(n)})))},e.triggerChange=function(t,e,n,i){void 0===i&&(i=!1);var r=this.animationManager,a=r.axisManager,o=r.getEventInfo(),u=this._getRoundPos(t,e),c=u.roundPos,f=u.roundDepa,h=a.moveTo(c,f),g=(null==n?void 0:n.event)||(null==o?void 0:o.event)||null,d={pos:h.pos,delta:h.delta,bounceRatio:this._getBounceRatio(h.pos),holding:i,inputEvent:g,isTrusted:!!g,input:(null==n?void 0:n.input)||(null==o?void 0:o.input)||null,set:g?this._createUserControll(h.pos):function(){}},p=new s.L("change",d);return this._axes.trigger(p),g&&a.set(d.set().destPos),!p.isCanceled()},e.triggerAnimationStart=function(t){var e=this._getRoundPos(t.destPos,t.depaPos),n=e.roundPos,i=e.roundDepa;t.destPos=n,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration);var r=new s.L("animationStart",t);return this._axes.trigger(r),!r.isCanceled()},e.triggerAnimationEnd=function(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("animationEnd",{isTrusted:t}))},e.triggerFinish=function(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("finish",{isTrusted:t}))},e.setAnimationManager=function(t){this.animationManager=t},e.destroy=function(){this._axes.off()},e._createUserControll=function(t,e){void 0===e&&(e=0);var n={destPos:Object.assign({},t),duration:e};return function(t,e){return t&&(n.destPos=Object.assign({},t)),void 0!==e&&(n.duration=e),n}},e._getRoundPos=function(t,e){var n=this._axes.options.round;return{roundPos:(0,f.UF)(t,n),roundDepa:(0,f.UF)(e,n)}},e._getBounceRatio=function(t){return this._axes.axisManager.map(t,(function(t,e){return t<e.range[0]&&0!==e.bounce[0]?(e.range[0]-t)/e.bounce[0]:t>e.range[1]&&0!==e.bounce[1]?(t-e.range[1])/e.bounce[1]:0}))},t}(),p=function(){function t(t){this._prevented=!1,this._options=t}var e=t.prototype;return e.isInterrupting=function(){return this._options.interruptable||this._prevented},e.isInterrupted=function(){return!this._options.interruptable&&this._prevented},e.setInterrupt=function(t){this._options.interruptable||(this._prevented=t)},t}(),l=function(){function t(t){var e=this;this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce((function(t,n){return t[n]=e._axis[n].range[0],t}),{})}var e=t.prototype;return e.getDelta=function(t,e){var n=this.get(t);return(0,f.UI)(this.get(e),(function(t,e){return t-n[e]}))},e.get=function(t){var e=this;return t&&Array.isArray(t)?t.reduce((function(t,n){return n&&n in e._pos&&(t[n]=e._pos[n]),t}),{}):Object.assign({},this._pos,t||{})},e.moveTo=function(t,e){void 0===e&&(e=this._pos);var n=(0,f.UI)(this._pos,(function(n,i){return i in t&&i in e?t[i]-e[i]:0}));return this.set(this.map(t,(function(t,e){return e?c(t,e.range,e.circular):0}))),{pos:Object.assign({},this._pos),delta:n}},e.set=function(t){for(var e in t)e&&e in this._pos&&(this._pos[e]=t[e])},e.every=function(t,e){var n=this._axis;return(0,f.yW)(t,(function(t,i){return e(t,n[i],i)}))},e.filter=function(t,e){var n=this._axis;return(0,f.hX)(t,(function(t,i){return e(t,n[i],i)}))},e.map=function(t,e){var n=this._axis;return(0,f.UI)(t,(function(t,i){return e(t,n[i],i)}))},e.isOutside=function(t){return!this.every(t?this.get(t):this._pos,(function(t,e){return!o(t,e.range)}))},e.getAxisOptions=function(t){return this._axis[t]},e._complementOptions=function(){var t=this;Object.keys(this._axis).forEach((function(e){t._axis[e]=Object.assign({},{range:[0,100],bounce:[0,0],circular:[!1,!1]},t._axis[e]),["bounce","circular"].forEach((function(n){var i=t._axis,r=i[e][n];/string|number|boolean/.test(typeof r)&&(i[e][n]=[r,r])}))}))},t}(),v=n(7242),m=function(){function t(t){var e=t.options,n=t.interruptManager,i=t.eventManager,r=t.axisManager,s=t.animationManager;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=e,this._interruptManager=n,this._eventManager=i,this._axisManager=r,this._animationManager=s}var e=t.prototype;return e.get=function(t){return this._axisManager.get(t.axes)},e.hold=function(t,e){if(!this._interruptManager.isInterrupted()&&t.axes.length){var n={input:t,event:e};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(n),this._moveDistance||this._eventManager.hold(this._axisManager.get(),n),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}},e.change=function(t,e,n,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&!this._axisManager.every(n,(function(t){return 0===t}))){var r=e.srcEvent?e.srcEvent:e;if(!r.__childrenAxesAlreadyChanged){var s,a=this._moveDistance||this._axisManager.get(t.axes);s=(0,f.UI)(a,(function(t,e){return t+(n[e]||0)})),this._moveDistance&&(this._moveDistance=this._axisManager.map(s,(function(t,e){var n=e.circular,i=e.range;return n&&(n[0]||n[1])?c(t,i,n):t}))),this._isOutside&&this._axisManager.every(a,(function(t,e){return!o(t,e.range)}))&&(this._isOutside=!1),a=this._atOutside(a),s=this._atOutside(s),this.options.nested&&this._isEndofAxis(n,a,s)||(r.__childrenAxesAlreadyChanged=!0);var u={input:t,event:e};if(i){var h=this._animationManager.getDuration(s,a);this._animationManager.animateTo(s,h,u)}else{!this._eventManager.triggerChange(s,a,u,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}}},e.release=function(t,e,n,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&this._moveDistance){var r=e.srcEvent?e.srcEvent:e;r.__childrenAxesAlreadyReleased&&(n=n.map((function(){return 0})));var s=this._axisManager.get(t.axes),o=this._axisManager.get(),u=this._animationManager.getDisplacement(n),c=(0,v.m)(t.axes,u),h=this._axisManager.get(this._axisManager.map(c,(function(t,e,n){return e.circular&&(e.circular[0]||e.circular[1])?s[n]+t:a(s[n]+t,e.range,e.circular,e.bounce)})));r.__childrenAxesAlreadyReleased=!0;var g=this._animationManager.getDuration(h,s,i);0===g&&(h=Object.assign({},o));var d={depaPos:o,destPos:h,duration:g,delta:this._axisManager.getDelta(o,h),inputEvent:e,input:t,isTrusted:!0};this._eventManager.triggerRelease(d),this._moveDistance=null;var p=this._animationManager.getUserControl(d),l=(0,f.Dg)(p.destPos,o),m={input:t,event:e};l||0===p.duration?(l||this._eventManager.triggerChange(p.destPos,o,m,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(m):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(p.destPos,p.duration,m)}},e._atOutside=function(t){var e=this;return this._isOutside?this._axisManager.map(t,(function(t,e){var n=e.range[0]-e.bounce[0],i=e.range[1]+e.bounce[1];return t>i?i:t<n?n:t})):this._axisManager.map(t,(function(t,n){var i=n.range[0],r=n.range[1],s=n.bounce,a=n.circular;return a&&(a[0]||a[1])?t:t<i?i-e._animationManager.interpolate(i-t,s[0]):t>r?r+e._animationManager.interpolate(t-r,s[1]):t}))},e._isEndofAxis=function(t,e,n){return this._axisManager.every(e,(function(i,r,s){return 0===t[s]||e[s]===n[s]&&(a=i,o=r.range,u=r.bounce,!(c=r.circular)[0]&&a===o[0]-u[0]||!c[1]&&a===o[1]+u[1]);var a,o,u,c}))},t}(),_=n(1229),b=function(t){function e(e,n,r){var s;return void 0===e&&(e={}),void 0===n&&(n={}),void 0===r&&(r=null),(s=t.call(this)||this)._inputs=[],s.axis=e,s.options=Object.assign({},{easing:function(t){return 1-Math.pow(1-t,3)},interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1},n),s.interruptManager=new p(s.options),s.axisManager=new l(s.axis),s.eventManager=new d((0,i.Z)(s)),s.animationManager=new g((0,i.Z)(s)),s.inputObserver=new m((0,i.Z)(s)),s.eventManager.setAnimationManager(s.animationManager),r&&s.eventManager.triggerChange(r),s}(0,r.Z)(e,t);var n=e.prototype;return n.connect=function(t,e){var n;return n="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(e)&&this.disconnect(e),e.mapAxes(n),e.connect(this.inputObserver),this._inputs.push(e),this},n.disconnect=function(t){if(t){var e=this._inputs.indexOf(t);e>=0&&(this._inputs[e].disconnect(),this._inputs.splice(e,1))}else this._inputs.forEach((function(t){return t.disconnect()})),this._inputs=[];return this},n.get=function(t){return this.axisManager.get(t)},n.setTo=function(t,e){return void 0===e&&(e=0),this.animationManager.setTo(t,e),this},n.setBy=function(t,e){return void 0===e&&(e=0),this.animationManager.setBy(t,e),this},n.stopAnimation=function(){return this.animationManager.stopAnimation(),this},n.updateAnimation=function(t){return this.animationManager.updateAnimation(t),this},n.isBounceArea=function(t){return this.axisManager.isOutside(t)},n.destroy=function(){this.disconnect(),this.eventManager.destroy()},e}(s.Z);b.VERSION="#__VERSION__#",b.TRANSFORM=_.Up,b.DIRECTION_NONE=_.j9,b.DIRECTION_LEFT=_.AV,b.DIRECTION_RIGHT=_.EM,b.DIRECTION_UP=_.uO,b.DIRECTION_DOWN=_.C2,b.DIRECTION_HORIZONTAL=_.Xv,b.DIRECTION_VERTICAL=_.Et,b.DIRECTION_ALL=_.oM;var E=b},9854:function(t,e,n){"use strict";var i;n.d(e,{u:function(){return i}}),i="undefined"==typeof window?{navigator:{userAgent:""}}:window},1229:function(t,e,n){"use strict";n.d(e,{AV:function(){return a},C2:function(){return f},EM:function(){return o},Et:function(){return h},Up:function(){return l},Xv:function(){return u},aE:function(){return v},ab:function(){return p},j9:function(){return s},kZ:function(){return d},oM:function(){return g},uO:function(){return c}});var i=n(3308),r=n(9854),s=1,a=2,o=4,u=6,c=8,f=16,h=24,g=30,d=30,p="ontouchstart"in r.u&&"safari"===(0,i.Z)().browser.name,l=function(){if("undefined"==typeof document)return"";for(var t=(document.head||document.getElementsByTagName("head")[0]).style,e=["transform","webkitTransform","msTransform","mozTransform"],n=0,i=e.length;n<i;n++)if(e[n]in t)return e[n];return""}(),v={"touch-action":"none","user-select":"none","-webkit-user-drag":"none"}},4010:function(t,e,n){"use strict";var i=n(1520);e.ZP=i.Z},7242:function(t,e,n){"use strict";n.d(e,{J:function(){return v},m:function(){return l}});var i=n(4578),r=n(8519),s=n(9854),a="ontouchstart"in s.u,o="PointerEvent"in s.u,u="MSPointerEvent"in s.u,c=o||u,f=function(){function t(){}var e=t.prototype;return e.extendEvent=function(t){var e=this.prevEvent,n=this._getCenter(t),i=e?this._getMovement(t):{x:0,y:0},s=e?this._getScale(t):1,a=e?(0,r._O)(n.x-e.center.x,n.y-e.center.y):0,o=e?e.deltaX+i.x:i.x,u=e?e.deltaY+i.y:i.y,c=e?o-e.deltaX:0,f=e?u-e.deltaY:0,h=e?t.timeStamp-e.srcEvent.timeStamp:0;return{srcEvent:t,scale:s,angle:a,center:n,deltaX:o,deltaY:u,offsetX:c,offsetY:f,velocityX:e&&0!==h?c/h:0,velocityY:e&&0!==h?f/h:0,preventSystemEvent:!0}},e._getDistance=function(t,e){var n=e.clientX-t.clientX,i=e.clientY-t.clientY;return Math.sqrt(n*n+i*i)},t}(),h=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=["mousedown"],e.move=["mousemove"],e.end=["mouseup"],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this.extendEvent(t)},n.onEventMove=function(t){return this.extendEvent(t)},n.onEventEnd=function(){},n.getTouches=function(){return 0},n._getScale=function(){return 1},n._getCenter=function(t){return{x:t.clientX,y:t.clientY}},n._getMovement=function(t){var e=this.prevEvent.srcEvent;return{x:t.pageX-e.pageX,y:t.pageY-e.pageY}},e}(f),g=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=["touchstart"],e.move=["touchmove"],e.end=["touchend","touchcancel"],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this._baseTouches=t.touches,this.extendEvent(t)},n.onEventMove=function(t){return this.extendEvent(t)},n.onEventEnd=function(t){this._baseTouches=t.touches},n.getTouches=function(t){return t.touches.length},n._getScale=function(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])},n._getCenter=function(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}},n._getMovement=function(t){var e=this.prevEvent.srcEvent;return t.touches[0].identifier!==e.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].pageX-e.touches[0].pageX,y:t.touches[0].pageY-e.touches[0].pageY}},e}(f),d=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=o?["pointerdown"]:["MSPointerDown"],e.move=o?["pointermove"]:["MSPointerMove"],e.end=o?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],e._firstInputs=[],e._recentInputs=[],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this._updatePointerEvent(t),this.extendEvent(t)},n.onEventMove=function(t){return this._updatePointerEvent(t),this.extendEvent(t)},n.onEventEnd=function(t){this._removePointerEvent(t)},n.getTouches=function(){return this._recentInputs.length},n._getScale=function(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])},n._getCenter=function(t){return{x:t.clientX,y:t.clientY}},n._getMovement=function(t){var e=this.prevEvent.srcEvent;return t.pointerId!==e.pointerId?{x:0,y:0}:{x:t.pageX-e.pageX,y:t.pageY-e.pageY}},n._updatePointerEvent=function(t){var e=this,n=!1;this._recentInputs.forEach((function(i,r){i.pointerId===t.pointerId&&(n=!0,e._recentInputs[r]=t)})),n||(this._firstInputs.push(t),this._recentInputs.push(t))},n._removePointerEvent=function(t){this._firstInputs=this._firstInputs.filter((function(e){return e.pointerId!==t.pointerId})),this._recentInputs=this._recentInputs.filter((function(e){return e.pointerId!==t.pointerId}))},e}(f),p=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=["mousedown","touchstart"],e.move=["mousemove","touchmove"],e.end=["mouseup","touchend","touchcancel"],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this._isTouchEvent(t)&&(this._baseTouches=t.touches),this.extendEvent(t)},n.onEventMove=function(t){return this.extendEvent(t)},n.onEventEnd=function(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)},n.getTouches=function(t){return this._isTouchEvent(t)?t.touches.length:0},n._getScale=function(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale},n._getCenter=function(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},n._getMovement=function(t){var e=this,n=this.prevEvent.srcEvent,i=[t,n].map((function(n){return e._isTouchEvent(t)?{id:n.touches[0].identifier,x:n.touches[0].pageX,y:n.touches[0].pageY}:{id:null,x:n.pageX,y:n.pageY}})),r=i[0],s=i[1];return r.id===s.id?{x:r.x-s.x,y:r.y-s.y}:{x:0,y:0}},n._isTouchEvent=function(t){return t.hasOwnProperty("touches")},e}(f),l=function(t,e){return e.reduce((function(e,n,i){return t[i]&&(e[t[i]]=n),e}),{})},v=function(t){void 0===t&&(t=[]);var e=!1,n=!1,i=!1;return t.forEach((function(t){switch(t){case"mouse":n=!0;break;case"touch":e=a;break;case"pointer":i=c}})),i?new d:e&&n?new p:e?new g:n?new h:null}},6389:function(t,e,n){"use strict";n.d(e,{Ju:function(){return o}});var i=n(8519),r=n(1229),s=n(7242),a=function(t,e,n){return n?!!(e===r.oM||e&t&&n&t):!!(e&t)},o=function(){function t(t,e){this.axes=[],this.element=null,this._enabled=!1,this._activeInput=null,this._atRightEdge=!1,this._rightEdgeTimer=0,this.element=(0,i.$)(t),this.options=Object.assign({inputType:["touch","mouse","pointer"],scale:[1,1],thresholdAngle:45,threshold:0,iOSEdgeSwipeThreshold:r.kZ,releaseOnScroll:!1},e),this._onPanstart=this._onPanstart.bind(this),this._onPanmove=this._onPanmove.bind(this),this._onPanend=this._onPanend.bind(this)}var e=t.prototype;return e.mapAxes=function(t){var e=!!t[0],n=!!t[1];this._direction=e&&n?r.oM:e?r.Xv:n?r.Et:r.j9,this.axes=t},e.connect=function(t){return this._activeInput&&(this._detachElementEvent(),this._detachWindowEvent(this._activeInput)),this._attachElementEvent(t),this._originalCssProps=(0,i.lH)(this.element),this},e.disconnect=function(){return this._detachElementEvent(),this._detachWindowEvent(this._activeInput),this._originalCssProps!==r.aE&&(0,i.lH)(this.element,this._originalCssProps),this._direction=r.j9,this},e.destroy=function(){this.disconnect(),this.element=null},e.enable=function(){return this._enabled=!0,this},e.disable=function(){return this._enabled=!1,this},e.isEnabled=function(){return this._enabled},e._onPanstart=function(t){var e=this._activeInput;if(e.onEventStart(t),this._enabled&&!(e.getTouches(t)>1)){var n=e.extendEvent(t);if(!1!==n.srcEvent.cancelable){var i=this.options.iOSEdgeSwipeThreshold;this._observer.hold(this,n),this._atRightEdge=r.ab&&n.center.x>window.innerWidth-i,this._attachWindowEvent(e),e.prevEvent=n}}},e._onPanmove=function(t){var e=this,n=this._activeInput;if(n.onEventMove(t),this._enabled&&!(n.getTouches(t)>1)){var i=n.extendEvent(t),o=this.options,u=o.iOSEdgeSwipeThreshold,c=o.releaseOnScroll,f=function(t,e){if(e<0||e>90)return r.j9;var n=Math.abs(t);return n>e&&n<180-e?r.Et:r.Xv}(i.angle,this.options.thresholdAngle);if(!c||i.srcEvent.cancelable){if(n.prevEvent&&r.ab){if(i.center.x<0)return this._detachWindowEvent(n),void this._observer.release(this,n.prevEvent,[0,0]);this._atRightEdge&&(clearTimeout(this._rightEdgeTimer),i.deltaX<-u?this._atRightEdge=!1:this._rightEdgeTimer=window.setTimeout((function(){e._detachWindowEvent(n),e._observer.release(e,n.prevEvent,[0,0])}),100))}var h=this._getOffset([i.offsetX,i.offsetY],[a(r.Xv,this._direction,f),a(r.Et,this._direction,f)]),g=h.some((function(t){return 0!==t}));g&&(!1!==i.srcEvent.cancelable&&i.srcEvent.preventDefault(),i.srcEvent.stopPropagation()),i.preventSystemEvent=g,g&&this._observer.change(this,i,(0,s.m)(this.axes,h)),n.prevEvent=i}else this._onPanend(t)}},e._onPanend=function(t){var e=this._activeInput;if(e.onEventEnd(t),this._enabled&&0===e.getTouches(t)){this._detachWindowEvent(e),clearTimeout(this._rightEdgeTimer);var n=e.prevEvent,i=this._getOffset([Math.abs(n.velocityX)*(n.offsetX<0?-1:1),Math.abs(n.velocityY)*(n.offsetY<0?-1:1)],[a(r.Xv,this._direction),a(r.Et,this._direction)]);this._observer.release(this,n,i)}},e._attachWindowEvent=function(t){var e=this;null==t||t.move.forEach((function(t){window.addEventListener(t,e._onPanmove,!1)})),null==t||t.end.forEach((function(t){window.addEventListener(t,e._onPanend,!1)}))},e._detachWindowEvent=function(t){var e=this;null==t||t.move.forEach((function(t){window.removeEventListener(t,e._onPanmove,!1)})),null==t||t.end.forEach((function(t){window.removeEventListener(t,e._onPanend,!1)}))},e._attachElementEvent=function(t){var e=this,n=(0,s.J)(this.options.inputType);if(!n)throw new Error("There is currently no inputType available for current device. There must be at least one available inputType.");this._observer=t,this._enabled=!0,this._activeInput=n,null==n||n.start.forEach((function(t){var n;null==(n=e.element)||n.addEventListener(t,e._onPanstart,!1)}))},e._detachElementEvent=function(){var t=this,e=this._activeInput;null==e||e.start.forEach((function(e){var n;null==(n=t.element)||n.removeEventListener(e,t._onPanstart,!1)})),this._enabled=!1,this._observer=null},e._getOffset=function(t,e){var n=[0,0],i=this.options.scale;return e[0]&&(n[0]=t[0]*i[0]),e[1]&&(n[1]=t[1]*i[1]),n},t}()},8519:function(t,e,n){"use strict";n.d(e,{$:function(){return a},Dg:function(){return v},Dw:function(){return M},QV:function(){return _},U7:function(){return h},UF:function(){return b},UI:function(){return d},Wx:function(){return g},_O:function(){return j},hX:function(){return p},il:function(){return E},lH:function(){return P},yW:function(){return l}});var i=n(9854),r=n(1229),s=function(t){for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e},a=function t(e,n){var r;if(void 0===n&&(n=!1),"string"==typeof e){if(e.match(/^<([a-z]+)\s*([^>]*)>/)){var a=document.createElement("div");a.innerHTML=e,r=s(a.childNodes)}else r=s(document.querySelectorAll(e));n||(r=r.length>=1?r[0]:void 0)}else e===i.u?r=e:!e.nodeName||1!==e.nodeType&&9!==e.nodeType?"jQuery"in i.u&&e instanceof jQuery||e.constructor.prototype.jquery?r=n?e.toArray():e.get(0):Array.isArray(e)&&(r=e.map((function(e){return t(e)})),n||(r=r.length>=1?r[0]:void 0)):r=e;return r},o=i.u.requestAnimationFrame||i.u.webkitRequestAnimationFrame,u=i.u.cancelAnimationFrame||i.u.webkitCancelAnimationFrame;if(o&&!u){var c={},f=o;o=function(t){var e=f((function(n){c[e]&&t(n)}));return c[e]=!0,e},u=function(t){delete c[t]}}else o&&u||(o=function(t){return i.u.setTimeout((function(){t(i.u.performance&&i.u.performance.now&&i.u.performance.now()||(new Date).getTime())}),16)},u=i.u.clearTimeout);var h=function(t){return o(t)},g=function(t){u(t)},d=function(t,e){var n={};for(var i in t)i&&(n[i]=e(t[i],i));return n},p=function(t,e){var n={};for(var i in t)i&&e(t[i],i)&&(n[i]=t[i]);return n},l=function(t,e){for(var n in t)if(n&&!e(t[n],n))return!1;return!0},v=function(t,e){return l(t,(function(t,n){return t===e[n]}))},m={},_=function(t,e){return m[e]||(m[e]=x(e)),m[e](t)},b=function(t,e){return t&&e?d(t,(function(t,n){return _(t,"number"==typeof e?e:e[n])})):t},E=function(t){if(!isFinite(t))return 0;var e=""+t;if(e.indexOf("e")>=0){for(var n=0,i=1;Math.round(t*i)/i!==t;)i*=10,n++;return n}return e.indexOf(".")>=0?e.length-e.indexOf(".")-1:0},M=function(t){return 1/Math.pow(10,t)},x=function(t){var e=t<1?Math.pow(10,E(t)):1;return function(n){return 0===t?0:Math.round(Math.round(n/t)*t*e)/e}},j=function(t,e){return 180*Math.atan2(e,t)/Math.PI},P=function(t,e){var n={};if(t&&t.style){var i=e||r.aE;Object.keys(i).forEach((function(e){n[e]=t.style[e],t.style[e]=i[e]}))}return n}},6597:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/1-678a5c68d9ac7a26dc269150429c596d.jpg"},4345:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/10-444ae8ae4e1b0e2da7255b86033f2746.jpg"},6861:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/11-ccb16594650ba223280b7fc6ab9c6f33.jpg"},5506:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/12-1d5ee5e9b9d4c4988987af3363d693f8.jpg"},6552:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/13-f2fe4bb3326ebf512a356f8b97626531.jpg"},7379:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/14-79ee85233eecc7214c482429f42d4dfb.jpg"},7834:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/15-d7dcf5c569ea997fe85c903bd13d07a8.jpg"},8280:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/16-3bc0e3812dbe2f8b14570dc45f2367ab.jpg"},1775:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/17-79a3d079480197d7400e2782d177d029.jpg"},2315:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/18-4f969193573ee29fbf560342116ab755.jpg"},4675:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/19-0303a57aaaab15ae0962291cf702f625.jpg"},8597:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/2-0b19bfb5a6c83fe732a09f42299efa6b.jpg"},9302:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/20-12ae23a7e94ebca16e7ff50018caeb7f.jpg"},2621:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/21-480f063b893d5df8d288d99060cdb360.jpg"},5348:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/22-6ac99e9833a54254c9f8d81597bb409f.jpg"},5802:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/23-2adaceb4f6378d2b289192e4a622e8c4.jpg"},5586:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/24-de543a82d9a29632662e3eff3f492816.jpg"},759:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/25-02e1a7f90fd3c728c7b2987198146c39.jpg"},5329:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/26-6417b88f2a9ee06ffa0a6c3fd48786eb.jpg"},3863:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/27-b83acd807e00434823420b4e1dcce4a9.jpg"},8924:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/28-233180a939eda0d0e7e076de2f1b0489.jpg"},9512:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/29-40db14e164e73b98279109d6e745a861.jpg"},3204:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/3-676c078a02438932f2c2d3419c040f32.jpg"},1275:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/30-a229b6685c92fdce571d3f5836fe1d83.jpg"},9749:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/31-9fe5c33e2730919226241be7e1c26645.jpg"},5974:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/32-1e42ef8b554ae42685302ccc7d0dbc05.jpg"},7160:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/33-b4528227c55ff03d3bb215553c3f28e1.jpg"},7354:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/34-072d97c85255fd657c0ab4f23f9f139a.jpg"},7506:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/35-c35baedab3e6923625e5a2505c228755.jpg"},4975:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/36-069dc542867179fe0743c3363b1c5041.jpg"},2659:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/37-2546121d4d8323a3cd905b5402ad04f2.jpg"},1707:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/38-f72a8b0868a34c32bffd2559b3b77171.jpg"},2845:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/39-3a813c876f6ed93c76190c19a32aacb0.jpg"},7992:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/4-7133214bd4e9dd8d1beb17695003ae77.jpg"},314:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/40-ebd63603ca0a173e075d33d6b3a4a336.jpg"},7573:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/41-f21feaaaa1aab2a7f8b285f4b2356020.jpg"},7617:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/42-a7f7da9b992e95b7dcf26ba3c664d2e9.jpg"},7008:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/43-775caf6e678060bed3be4bf668226183.jpg"},2878:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/44-e860ff0dcb8ca7554ed94a294cc014c6.jpg"},7123:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/45-3d1cae96476f1de9b0a6c53be62a502f.jpg"},2294:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/46-f71b4e869cd3008653472b5ecd0031e6.jpg"},6786:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/47-b82444c6317cb04c4e936cfdc88b8cf5.jpg"},7374:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/48-9e7190e1defd8c9fd2a2bb848a084c54.jpg"},2381:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/49-e3bf1c476eb1c9f8fc1d6e6d9666c2cb.jpg"},6320:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/5-8493131583356e9c5d153d622726ca7a.jpg"},8739:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/50-c52aa08a9663215d9a8bec969ebd00d4.jpg"},226:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/6-ec89af05609c1c3d4ee5771623e2f219.jpg"},2221:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/7-94e63021dae29c5b2790369b13bcf938.jpg"},9562:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/8-79afa58c76332cbf19b4bf4a872d25bf.jpg"},5973:function(t,e,n){"use strict";n.r(e),e.default=n.p+"assets/images/9-4f969193573ee29fbf560342116ab755.jpg"},7969:function(t,e,n){var i={"./1.jpg":6597,"./10.jpg":4345,"./11.jpg":6861,"./12.jpg":5506,"./13.jpg":6552,"./14.jpg":7379,"./15.jpg":7834,"./16.jpg":8280,"./17.jpg":1775,"./18.jpg":2315,"./19.jpg":4675,"./2.jpg":8597,"./20.jpg":9302,"./21.jpg":2621,"./22.jpg":5348,"./23.jpg":5802,"./24.jpg":5586,"./25.jpg":759,"./26.jpg":5329,"./27.jpg":3863,"./28.jpg":8924,"./29.jpg":9512,"./3.jpg":3204,"./30.jpg":1275,"./31.jpg":9749,"./32.jpg":5974,"./33.jpg":7160,"./34.jpg":7354,"./35.jpg":7506,"./36.jpg":4975,"./37.jpg":2659,"./38.jpg":1707,"./39.jpg":2845,"./4.jpg":7992,"./40.jpg":314,"./41.jpg":7573,"./42.jpg":7617,"./43.jpg":7008,"./44.jpg":2878,"./45.jpg":7123,"./46.jpg":2294,"./47.jpg":6786,"./48.jpg":7374,"./49.jpg":2381,"./5.jpg":6320,"./50.jpg":8739,"./6.jpg":226,"./7.jpg":2221,"./8.jpg":9562,"./9.jpg":5973};function r(t){var e=s(t);return n(e)}function s(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}r.keys=function(){return Object.keys(i)},r.resolve=s,t.exports=r,r.id=7969}}]);