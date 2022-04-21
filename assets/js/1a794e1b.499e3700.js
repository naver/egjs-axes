"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9596,4187],{3905:function(t,e,n){n.d(e,{Zo:function(){return h},kt:function(){return f}});var i=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},a=Object.keys(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var u=i.createContext({}),c=function(t){var e=i.useContext(u),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},h=function(t){var e=c(t.components);return i.createElement(u.Provider,{value:e},t.children)},l={inlineCode:"code",wrapper:function(t){var e=t.children;return i.createElement(i.Fragment,{},e)}},d=i.forwardRef((function(t,e){var n=t.components,r=t.mdxType,a=t.originalType,u=t.parentName,h=o(t,["components","mdxType","originalType","parentName"]),d=c(n),f=r,g=d["".concat(u,".").concat(f)]||d[f]||l[f]||a;return n?i.createElement(g,s(s({ref:e},h),{},{components:n})):i.createElement(g,s({ref:e},h))}));function f(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=n.length,s=new Array(a);s[0]=d;var o={};for(var u in e)hasOwnProperty.call(e,u)&&(o[u]=e[u]);o.originalType=t,o.mdxType="string"==typeof t?t:r,s[1]=o;for(var c=2;c<a;c++)s[c]=n[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},983:function(t,e,n){n.r(e);var i=n(7294),r=n(4010),a=n(6389);e.default=function(){return(0,i.useEffect)((function(){var t=document.getElementById("slides"),e=t.scrollWidth-t.getBoundingClientRect().width,n=e/5,i=document.getElementById("nested"),s=document.getElementById("nestedUpperSlides"),o=document.getElementById("nestedBelowSlides"),u=2*i.getBoundingClientRect().width-60,c=u/2,h=new r.ZP({x:{range:[0,e],bounce:20}}),l=new r.ZP({x:{range:[0,u]}},{nested:!0}),d=new r.ZP({x:{range:[0,u]}},{nested:!0});h.on({change:function(e){var n=e.pos;t.style[r.ZP.TRANSFORM]="translate3d("+-n.x+"px, 0, 0)"},release:function(t){var e=t.destPos;t.setTo({x:Math.round(e.x/n)*n},200)}}),l.on({change:function(t){var e=t.pos;s.style[r.ZP.TRANSFORM]="translate3d("+-e.x+"px, 0, 0)"},release:function(t){var e=t.destPos;t.setTo({x:Math.round(e.x/c)*c},200)}}),d.on({change:function(t){var e=t.pos;o.style[r.ZP.TRANSFORM]="translate3d("+-e.x+"px, 0, 0)"},release:function(t){var e=t.destPos;t.setTo({x:Math.round(e.x/c)*c},200)}}),h.connect(["x"],new a.Ju(t,{scale:[-1,0]})),l.connect(["x"],new a.Ju(s,{scale:[-1,0]})),d.connect(["x"],new a.Ju(o,{scale:[-1,0]}))}),[]),i.createElement("div",null,i.createElement("p",null,"You can place Axes in another Axes."),i.createElement("div",{className:"carousel"},i.createElement("div",{id:"slides"},i.createElement("div",{className:"slide"},i.createElement("img",{src:n(2899).Z})),i.createElement("div",{className:"slide"},i.createElement("img",{src:n(2099).Z})),i.createElement("div",{id:"nested",className:"slide"},i.createElement("div",{id:"nestedUpperSlides",className:"nestedslides"},i.createElement("div",{className:"inner"},i.createElement("img",{src:n(7795).Z})),i.createElement("div",{className:"inner"},i.createElement("img",{src:n(7637).Z})),i.createElement("div",{className:"inner"},i.createElement("img",{src:n(48).Z}))),i.createElement("div",{id:"nestedBelowSlides",className:"nestedslides"},i.createElement("div",{className:"inner"},i.createElement("img",{src:n(7795).Z})),i.createElement("div",{className:"inner"},i.createElement("img",{src:n(7637).Z})),i.createElement("div",{className:"inner"},i.createElement("img",{src:n(48).Z})))),i.createElement("div",{className:"slide"},i.createElement("img",{src:n(1957).Z})),i.createElement("div",{className:"slide"},i.createElement("img",{src:n(4732).Z})),i.createElement("div",{className:"slide"},i.createElement("img",{src:n(7751).Z})))))}},1520:function(t,e,n){n.d(e,{Z:function(){return x}});var i=n(7326),r=n(4578),a=n(2921),s=function(t,e,n,i){var r=t,a=[n[0]?e[0]:i?e[0]-i[0]:e[0],n[1]?e[1]:i?e[1]+i[1]:e[1]];return r=Math.max(a[0],r),r=Math.min(a[1],r)},o=function(t,e){return t<e[0]||t>e[1]},u=function(t,e,n){return n[1]&&t>e[1]||n[0]&&t<e[0]},c=function(t,e,n){var i=t,r=e[0],a=e[1],s=a-r;return n[1]&&t>a&&(i=(i-a)%s+r),n[0]&&t<r&&(i=(i-r)%s+a),i},h=n(8519),l=function(t,e,n){return Math.max(Math.min(t,n),e)},d=function(){function t(t){var e=t.options,n=t.interruptManager,i=t.eventManager,r=t.axisManager;this._options=e,this.interruptManager=n,this.eventManager=i,this.axisManager=r,this.animationEnd=this.animationEnd.bind(this)}var e=t.prototype;return e.getDuration=function(t,e,n){var i,r=this;if(void 0!==n)i=n;else{var a=(0,h.UI)(e,(function(e,n){return function(t,e){var n=Math.sqrt(t/e*2);return n<100?0:n}(Math.abs(e-t[n]),r._options.deceleration)}));i=Object.keys(a).reduce((function(t,e){return Math.max(t,a[e])}),-1/0)}return l(i,this._options.minimumDuration,this._options.maximumDuration)},e.getDisplacement=function(t){var e=Math.pow(t.reduce((function(t,e){return t+e*e}),0),1/t.length),n=Math.abs(e/-this._options.deceleration);return t.map((function(t){return t/2*n}))},e.interpolate=function(t,e){var n=this.easing(1e-5)/1e-5;return this.easing(t/(e*n))*e},e.stopAnimation=function(t){if(this._animateParam){var e=this.axisManager.get(),n=this.axisManager.map(e,(function(t,e){return c(t,e.range,e.circular)}));(0,h.yW)(n,(function(t,n){return e[n]===t}))||this.eventManager.triggerChange(n,e,t,!!t),this._animateParam=null,this._raf&&(0,h.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}},e.getEventInfo=function(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null},e.restore=function(t){var e=this.axisManager.get(),n=this.axisManager.map(e,(function(t,e){return Math.min(e.range[1],Math.max(e.range[0],t))}));this.stopAnimation(),this.animateTo(n,this.getDuration(e,n),t)},e.animationEnd=function(){var t=this.getEventInfo();this._animateParam=null;var e=this.axisManager.filter(this.axisManager.get(),(function(t,e){return u(t,e.range,e.circular)}));Object.keys(e).length>0&&this.setTo(this.axisManager.map(e,(function(t,e){return c(t,e.range,e.circular)}))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)},e.finish=function(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)},e.getUserControl=function(t){var e=t.setTo();return e.destPos=this.axisManager.get(e.destPos),e.duration=l(e.duration,this._options.minimumDuration,this._options.maximumDuration),e},e.animateTo=function(t,e,n){var i=this;this.stopAnimation();var r=this._createAnimationParam(t,e,n),a=Object.assign({},r.depaPos),s=this.eventManager.triggerAnimationStart(r),o=this.getUserControl(r);if(!s&&this.axisManager.every(o.destPos,(function(t,e){return u(t,e.range,e.circular)}))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),s&&!(0,h.Dg)(o.destPos,a)){var c=(null==n?void 0:n.event)||null;this._animateLoop({depaPos:a,destPos:o.destPos,duration:o.duration,delta:this.axisManager.getDelta(a,o.destPos),isTrusted:!!c,inputEvent:c,input:(null==n?void 0:n.input)||null},(function(){return i.animationEnd()}))}},e.easing=function(t){return t>1?1:this._options.easing(t)},e.setTo=function(t,e){void 0===e&&(e=0);var n=Object.keys(t),i=this.axisManager.get(n);if((0,h.Dg)(t,i))return this;this.interruptManager.setInterrupt(!0);var r=(0,h.hX)(t,(function(t,e){return i[e]!==t}));return Object.keys(r).length?(r=this.axisManager.map(r,(function(t,e){var n=e.range,i=e.circular;return i&&(i[0]||i[1])?t:s(t,n,i)})),(0,h.Dg)(r,i)||(e>0?this.animateTo(r,e):(this.stopAnimation(),this.eventManager.triggerChange(r),this.finish(!1))),this):this},e.setBy=function(t,e){return void 0===e&&(e=0),this.setTo((0,h.UI)(this.axisManager.get(Object.keys(t)),(function(e,n){return e+t[n]})),e)},e.updateAnimation=function(t){var e=this._animateParam;if(e){var n=(new Date).getTime()-e.startTime,i=(null==t?void 0:t.destPos)||e.destPos,r=(null==t?void 0:t.duration)||e.duration;if(null!=t&&t.restart||r<=n)this.setTo(i,r-n);else{if(null!=t&&t.destPos){var a=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,e.delta=this.axisManager.getDelta(a,i),e.destPos=i}if(null!=t&&t.duration){var s=(n+this._durationOffset)/e.duration;this._durationOffset=s*r-n,e.duration=r}}}},e._createAnimationParam=function(t,e,n){var i=this.axisManager.get(),r=t,a=(null==n?void 0:n.event)||null;return{depaPos:i,destPos:r,duration:l(e,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(i,r),inputEvent:a,input:(null==n?void 0:n.input)||null,isTrusted:!!a,done:this.animationEnd}},e._animateLoop=function(t,e){var n=this;if(t.duration){var i=t.depaPos;this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,this._animateParam=Object.assign({},t,{startTime:(new Date).getTime()});var r=(0,h.UI)(i,(function(e,n){return e<=t.destPos[n]?1:-1})),a=(0,h.UI)(t.destPos,(function(t){return t}));!function t(){var s=n._animateParam,o=((new Date).getTime()-s.startTime+n._durationOffset)/s.duration,u=n.easing(o);n._raf=null;var l=n.axisManager.map(i,(function(t,e,a){var h=o>=1?s.destPos[a]:t+s.delta[a]*(u-n._prevEasingPer)/(1-n._initialEasingPer),l=c(h,e.range,e.circular);if(h!==l){var d=r[a]*(e.range[1]-e.range[0]);s.destPos[a]-=d,i[a]-=d}return l})),d=!n.eventManager.triggerChange(l,i);if(i=l,n._prevEasingPer=u,u>=1)return s.destPos=n._getFinalPos(s.destPos,a),(0,h.Dg)(s.destPos,n.axisManager.get(Object.keys(s.destPos)))||n.eventManager.triggerChange(s.destPos,i),void e();d?n.finish(!1):n._raf=(0,h.U7)(t)}()}else this.eventManager.triggerChange(t.destPos),e()},e._getFinalPos=function(t,e){var n=this,i=1e-6;return(0,h.UI)(t,(function(t,r){if(t>=e[r]-i&&t<=e[r]+i)return e[r];var a=n._getRoundUnit(t,r);return(0,h.QV)(t,a)}))},e._getRoundUnit=function(t,e){var n=this._options.round,i=null;if(!n){var r=this.axisManager.getAxisOptions(e);i=(0,h.Dw)(Math.max((0,h.il)(r.range[0]),(0,h.il)(r.range[1]),(0,h.il)(t)))}return i||n},t}(),f=function(){function t(t){this._axes=t}var e=t.prototype;return e.hold=function(t,e){var n=this._getRoundPos(t).roundPos;this._axes.trigger(new a.L("hold",{pos:n,input:e.input||null,inputEvent:e.event||null,isTrusted:!0}))},e.triggerRelease=function(t){var e=this._getRoundPos(t.destPos,t.depaPos),n=e.roundPos,i=e.roundDepa;t.destPos=n,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new a.L("release",Object.assign({},t,{bounceRatio:this._getBounceRatio(n)})))},e.triggerChange=function(t,e,n,i){void 0===i&&(i=!1);var r=this.animationManager,s=r.axisManager,o=r.getEventInfo(),u=this._getRoundPos(t,e),c=u.roundPos,h=u.roundDepa,l=s.moveTo(c,h),d=(null==n?void 0:n.event)||(null==o?void 0:o.event)||null,f={pos:l.pos,delta:l.delta,bounceRatio:this._getBounceRatio(l.pos),holding:i,inputEvent:d,isTrusted:!!d,input:(null==n?void 0:n.input)||(null==o?void 0:o.input)||null,set:d?this._createUserControll(l.pos):function(){}},g=new a.L("change",f);return this._axes.trigger(g),d&&s.set(f.set().destPos),!g.isCanceled()},e.triggerAnimationStart=function(t){var e=this._getRoundPos(t.destPos,t.depaPos),n=e.roundPos,i=e.roundDepa;t.destPos=n,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration);var r=new a.L("animationStart",t);return this._axes.trigger(r),!r.isCanceled()},e.triggerAnimationEnd=function(t){void 0===t&&(t=!1),this._axes.trigger(new a.L("animationEnd",{isTrusted:t}))},e.triggerFinish=function(t){void 0===t&&(t=!1),this._axes.trigger(new a.L("finish",{isTrusted:t}))},e.setAnimationManager=function(t){this.animationManager=t},e.destroy=function(){this._axes.off()},e._createUserControll=function(t,e){void 0===e&&(e=0);var n={destPos:Object.assign({},t),duration:e};return function(t,e){return t&&(n.destPos=Object.assign({},t)),void 0!==e&&(n.duration=e),n}},e._getRoundPos=function(t,e){var n=this._axes.options.round;return{roundPos:(0,h.UF)(t,n),roundDepa:(0,h.UF)(e,n)}},e._getBounceRatio=function(t){return this._axes.axisManager.map(t,(function(t,e){return t<e.range[0]&&0!==e.bounce[0]?(e.range[0]-t)/e.bounce[0]:t>e.range[1]&&0!==e.bounce[1]?(t-e.range[1])/e.bounce[1]:0}))},t}(),g=function(){function t(t){this._prevented=!1,this._options=t}var e=t.prototype;return e.isInterrupting=function(){return this._options.interruptable||this._prevented},e.isInterrupted=function(){return!this._options.interruptable&&this._prevented},e.setInterrupt=function(t){this._options.interruptable||(this._prevented=t)},t}(),v=function(){function t(t){var e=this;this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce((function(t,n){return t[n]=e._axis[n].range[0],t}),{})}var e=t.prototype;return e.getDelta=function(t,e){var n=this.get(t);return(0,h.UI)(this.get(e),(function(t,e){return t-n[e]}))},e.get=function(t){var e=this;return t&&Array.isArray(t)?t.reduce((function(t,n){return n&&n in e._pos&&(t[n]=e._pos[n]),t}),{}):Object.assign({},this._pos,t||{})},e.moveTo=function(t,e){void 0===e&&(e=this._pos);var n=(0,h.UI)(this._pos,(function(n,i){return i in t&&i in e?t[i]-e[i]:0}));return this.set(this.map(t,(function(t,e){return e?c(t,e.range,e.circular):0}))),{pos:Object.assign({},this._pos),delta:n}},e.set=function(t){for(var e in t)e&&e in this._pos&&(this._pos[e]=t[e])},e.every=function(t,e){var n=this._axis;return(0,h.yW)(t,(function(t,i){return e(t,n[i],i)}))},e.filter=function(t,e){var n=this._axis;return(0,h.hX)(t,(function(t,i){return e(t,n[i],i)}))},e.map=function(t,e){var n=this._axis;return(0,h.UI)(t,(function(t,i){return e(t,n[i],i)}))},e.isOutside=function(t){return!this.every(t?this.get(t):this._pos,(function(t,e){return!o(t,e.range)}))},e.getAxisOptions=function(t){return this._axis[t]},e._complementOptions=function(){var t=this;Object.keys(this._axis).forEach((function(e){t._axis[e]=Object.assign({},{range:[0,100],bounce:[0,0],circular:[!1,!1]},t._axis[e]),["bounce","circular"].forEach((function(n){var i=t._axis,r=i[e][n];/string|number|boolean/.test(typeof r)&&(i[e][n]=[r,r])}))}))},t}(),p=n(7242),m=function(){function t(t){var e=t.options,n=t.interruptManager,i=t.eventManager,r=t.axisManager,a=t.animationManager;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=e,this._interruptManager=n,this._eventManager=i,this._axisManager=r,this._animationManager=a}var e=t.prototype;return e.get=function(t){return this._axisManager.get(t.axes)},e.hold=function(t,e){if(!this._interruptManager.isInterrupted()&&t.axes.length){var n={input:t,event:e};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(n),this._moveDistance||this._eventManager.hold(this._axisManager.get(),n),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}},e.change=function(t,e,n,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&!this._axisManager.every(n,(function(t){return 0===t}))){var r=e.srcEvent?e.srcEvent:e;if(!r.__childrenAxesAlreadyChanged){var a,s=this._moveDistance||this._axisManager.get(t.axes);a=(0,h.UI)(s,(function(t,e){return t+(n[e]||0)})),this._moveDistance&&(this._moveDistance=this._axisManager.map(a,(function(t,e){var n=e.circular,i=e.range;return n&&(n[0]||n[1])?c(t,i,n):t}))),this._isOutside&&this._axisManager.every(s,(function(t,e){return!o(t,e.range)}))&&(this._isOutside=!1),s=this._atOutside(s),a=this._atOutside(a),this.options.nested&&this._isEndofAxis(n,s,a)||(r.__childrenAxesAlreadyChanged=!0);var u={input:t,event:e};if(i){var l=this._animationManager.getDuration(a,s);this._animationManager.animateTo(a,l,u)}else{!this._eventManager.triggerChange(a,s,u,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}}},e.release=function(t,e,n,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&this._moveDistance){var r=e.srcEvent?e.srcEvent:e;r.__childrenAxesAlreadyReleased&&(n=n.map((function(){return 0})));var a=this._axisManager.get(t.axes),o=this._axisManager.get(),u=this._animationManager.getDisplacement(n),c=(0,p.m)(t.axes,u),l=this._axisManager.get(this._axisManager.map(c,(function(t,e,n){return e.circular&&(e.circular[0]||e.circular[1])?a[n]+t:s(a[n]+t,e.range,e.circular,e.bounce)})));r.__childrenAxesAlreadyReleased=!0;var d=this._animationManager.getDuration(l,a,i);0===d&&(l=Object.assign({},o));var f={depaPos:o,destPos:l,duration:d,delta:this._axisManager.getDelta(o,l),inputEvent:e,input:t,isTrusted:!0};this._eventManager.triggerRelease(f),this._moveDistance=null;var g=this._animationManager.getUserControl(f),v=(0,h.Dg)(g.destPos,o),m={input:t,event:e};v||0===g.duration?(v||this._eventManager.triggerChange(g.destPos,o,m,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(m):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(g.destPos,g.duration,m)}},e._atOutside=function(t){var e=this;return this._isOutside?this._axisManager.map(t,(function(t,e){var n=e.range[0]-e.bounce[0],i=e.range[1]+e.bounce[1];return t>i?i:t<n?n:t})):this._axisManager.map(t,(function(t,n){var i=n.range[0],r=n.range[1],a=n.bounce,s=n.circular;return s&&(s[0]||s[1])?t:t<i?i-e._animationManager.interpolate(i-t,a[0]):t>r?r+e._animationManager.interpolate(t-r,a[1]):t}))},e._isEndofAxis=function(t,e,n){return this._axisManager.every(e,(function(i,r,a){return 0===t[a]||e[a]===n[a]&&(s=i,o=r.range,u=r.bounce,!(c=r.circular)[0]&&s===o[0]-u[0]||!c[1]&&s===o[1]+u[1]);var s,o,u,c}))},t}(),_=n(1229),E=function(t){function e(e,n,r){var a;return void 0===e&&(e={}),void 0===n&&(n={}),void 0===r&&(r=null),(a=t.call(this)||this)._inputs=[],a.axis=e,a.options=Object.assign({},{easing:function(t){return 1-Math.pow(1-t,3)},interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1},n),a.interruptManager=new g(a.options),a.axisManager=new v(a.axis),a.eventManager=new f((0,i.Z)(a)),a.animationManager=new d((0,i.Z)(a)),a.inputObserver=new m((0,i.Z)(a)),a.eventManager.setAnimationManager(a.animationManager),r&&a.eventManager.triggerChange(r),a}(0,r.Z)(e,t);var n=e.prototype;return n.connect=function(t,e){var n;return n="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(e)&&this.disconnect(e),e.mapAxes(n),e.connect(this.inputObserver),this._inputs.push(e),this},n.disconnect=function(t){if(t){var e=this._inputs.indexOf(t);e>=0&&(this._inputs[e].disconnect(),this._inputs.splice(e,1))}else this._inputs.forEach((function(t){return t.disconnect()})),this._inputs=[];return this},n.get=function(t){return this.axisManager.get(t)},n.setTo=function(t,e){return void 0===e&&(e=0),this.animationManager.setTo(t,e),this},n.setBy=function(t,e){return void 0===e&&(e=0),this.animationManager.setBy(t,e),this},n.stopAnimation=function(){return this.animationManager.stopAnimation(),this},n.updateAnimation=function(t){return this.animationManager.updateAnimation(t),this},n.isBounceArea=function(t){return this.axisManager.isOutside(t)},n.destroy=function(){this.disconnect(),this.eventManager.destroy()},e}(a.Z);E.VERSION="#__VERSION__#",E.TRANSFORM=_.Up,E.DIRECTION_NONE=_.j9,E.DIRECTION_LEFT=_.AV,E.DIRECTION_RIGHT=_.EM,E.DIRECTION_UP=_.uO,E.DIRECTION_DOWN=_.C2,E.DIRECTION_HORIZONTAL=_.Xv,E.DIRECTION_VERTICAL=_.Et,E.DIRECTION_ALL=_.oM;var x=E},9854:function(t,e,n){var i;n.d(e,{u:function(){return i}}),i="undefined"==typeof window?{navigator:{userAgent:""}}:window},1229:function(t,e,n){n.d(e,{AV:function(){return s},C2:function(){return h},EM:function(){return o},Et:function(){return l},Up:function(){return v},Xv:function(){return u},aE:function(){return p},ab:function(){return g},j9:function(){return a},kZ:function(){return f},oM:function(){return d},uO:function(){return c}});var i=n(3308),r=n(9854),a=1,s=2,o=4,u=6,c=8,h=16,l=24,d=30,f=30,g="ontouchstart"in r.u&&"safari"===(0,i.Z)().browser.name,v=function(){if("undefined"==typeof document)return"";for(var t=(document.head||document.getElementsByTagName("head")[0]).style,e=["transform","webkitTransform","msTransform","mozTransform"],n=0,i=e.length;n<i;n++)if(e[n]in t)return e[n];return""}(),p={"touch-action":"none","user-select":"none","-webkit-user-drag":"none"}},4010:function(t,e,n){var i=n(1520);e.ZP=i.Z},7242:function(t,e,n){n.d(e,{J:function(){return p},m:function(){return v}});var i=n(4578),r=n(8519),a=n(9854),s="ontouchstart"in a.u,o="PointerEvent"in a.u,u="MSPointerEvent"in a.u,c=o||u,h=function(){function t(){}var e=t.prototype;return e.extendEvent=function(t){var e=this.prevEvent,n=this._getCenter(t),i=e?this._getMovement(t):{x:0,y:0},a=e?this._getScale(t):1,s=e?(0,r._O)(n.x-e.center.x,n.y-e.center.y):0,o=e?e.deltaX+i.x:i.x,u=e?e.deltaY+i.y:i.y,c=e?o-e.deltaX:0,h=e?u-e.deltaY:0,l=e?t.timeStamp-e.srcEvent.timeStamp:0;return{srcEvent:t,scale:a,angle:s,center:n,deltaX:o,deltaY:u,offsetX:c,offsetY:h,velocityX:e&&0!==l?c/l:0,velocityY:e&&0!==l?h/l:0,preventSystemEvent:!0}},e._getDistance=function(t,e){var n=e.clientX-t.clientX,i=e.clientY-t.clientY;return Math.sqrt(n*n+i*i)},t}(),l=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=["mousedown"],e.move=["mousemove"],e.end=["mouseup"],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this.extendEvent(t)},n.onEventMove=function(t){return this.extendEvent(t)},n.onEventEnd=function(){},n.getTouches=function(){return 0},n._getScale=function(){return 1},n._getCenter=function(t){return{x:t.clientX,y:t.clientY}},n._getMovement=function(t){var e=this.prevEvent.srcEvent;return{x:t.pageX-e.pageX,y:t.pageY-e.pageY}},e}(h),d=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=["touchstart"],e.move=["touchmove"],e.end=["touchend","touchcancel"],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this._baseTouches=t.touches,this.extendEvent(t)},n.onEventMove=function(t){return this.extendEvent(t)},n.onEventEnd=function(t){this._baseTouches=t.touches},n.getTouches=function(t){return t.touches.length},n._getScale=function(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])},n._getCenter=function(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}},n._getMovement=function(t){var e=this.prevEvent.srcEvent;return t.touches[0].identifier!==e.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].pageX-e.touches[0].pageX,y:t.touches[0].pageY-e.touches[0].pageY}},e}(h),f=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=o?["pointerdown"]:["MSPointerDown"],e.move=o?["pointermove"]:["MSPointerMove"],e.end=o?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],e._firstInputs=[],e._recentInputs=[],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this._updatePointerEvent(t),this.extendEvent(t)},n.onEventMove=function(t){return this._updatePointerEvent(t),this.extendEvent(t)},n.onEventEnd=function(t){this._removePointerEvent(t)},n.getTouches=function(){return this._recentInputs.length},n._getScale=function(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])},n._getCenter=function(t){return{x:t.clientX,y:t.clientY}},n._getMovement=function(t){var e=this.prevEvent.srcEvent;return t.pointerId!==e.pointerId?{x:0,y:0}:{x:t.pageX-e.pageX,y:t.pageY-e.pageY}},n._updatePointerEvent=function(t){var e=this,n=!1;this._recentInputs.forEach((function(i,r){i.pointerId===t.pointerId&&(n=!0,e._recentInputs[r]=t)})),n||(this._firstInputs.push(t),this._recentInputs.push(t))},n._removePointerEvent=function(t){this._firstInputs=this._firstInputs.filter((function(e){return e.pointerId!==t.pointerId})),this._recentInputs=this._recentInputs.filter((function(e){return e.pointerId!==t.pointerId}))},e}(h),g=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))||this).start=["mousedown","touchstart"],e.move=["mousemove","touchmove"],e.end=["mouseup","touchend","touchcancel"],e}(0,i.Z)(e,t);var n=e.prototype;return n.onEventStart=function(t){return this._isTouchEvent(t)&&(this._baseTouches=t.touches),this.extendEvent(t)},n.onEventMove=function(t){return this.extendEvent(t)},n.onEventEnd=function(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)},n.getTouches=function(t){return this._isTouchEvent(t)?t.touches.length:0},n._getScale=function(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale},n._getCenter=function(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},n._getMovement=function(t){var e=this,n=this.prevEvent.srcEvent,i=[t,n].map((function(n){return e._isTouchEvent(t)?{id:n.touches[0].identifier,x:n.touches[0].pageX,y:n.touches[0].pageY}:{id:null,x:n.pageX,y:n.pageY}})),r=i[0],a=i[1];return r.id===a.id?{x:r.x-a.x,y:r.y-a.y}:{x:0,y:0}},n._isTouchEvent=function(t){return t.hasOwnProperty("touches")},e}(h),v=function(t,e){return e.reduce((function(e,n,i){return t[i]&&(e[t[i]]=n),e}),{})},p=function(t){void 0===t&&(t=[]);var e=!1,n=!1,i=!1;return t.forEach((function(t){switch(t){case"mouse":n=!0;break;case"touch":e=s;break;case"pointer":i=c}})),i?new f:e&&n?new g:e?new d:n?new l:null}},6389:function(t,e,n){n.d(e,{Ju:function(){return o}});var i=n(8519),r=n(1229),a=n(7242),s=function(t,e,n){return n?!!(e===r.oM||e&t&&n&t):!!(e&t)},o=function(){function t(t,e){this.axes=[],this.element=null,this._enabled=!1,this._activeInput=null,this._atRightEdge=!1,this._rightEdgeTimer=0,this.element=(0,i.$)(t),this.options=Object.assign({inputType:["touch","mouse","pointer"],scale:[1,1],thresholdAngle:45,threshold:0,iOSEdgeSwipeThreshold:r.kZ,releaseOnScroll:!1},e),this._onPanstart=this._onPanstart.bind(this),this._onPanmove=this._onPanmove.bind(this),this._onPanend=this._onPanend.bind(this)}var e=t.prototype;return e.mapAxes=function(t){var e=!!t[0],n=!!t[1];this._direction=e&&n?r.oM:e?r.Xv:n?r.Et:r.j9,this.axes=t},e.connect=function(t){return this._activeInput&&(this._detachElementEvent(),this._detachWindowEvent(this._activeInput)),this._attachElementEvent(t),this._originalCssProps=(0,i.lH)(this.element),this},e.disconnect=function(){return this._detachElementEvent(),this._detachWindowEvent(this._activeInput),this._originalCssProps!==r.aE&&(0,i.lH)(this.element,this._originalCssProps),this._direction=r.j9,this},e.destroy=function(){this.disconnect(),this.element=null},e.enable=function(){return this._enabled=!0,this},e.disable=function(){return this._enabled=!1,this},e.isEnabled=function(){return this._enabled},e._onPanstart=function(t){var e=this._activeInput;if(e.onEventStart(t),this._enabled&&!(e.getTouches(t)>1)){var n=e.extendEvent(t);if(!1!==n.srcEvent.cancelable){var i=this.options.iOSEdgeSwipeThreshold;this._observer.hold(this,n),this._atRightEdge=r.ab&&n.center.x>window.innerWidth-i,this._attachWindowEvent(e),e.prevEvent=n}}},e._onPanmove=function(t){var e=this,n=this._activeInput;if(n.onEventMove(t),this._enabled&&!(n.getTouches(t)>1)){var i=n.extendEvent(t),o=this.options,u=o.iOSEdgeSwipeThreshold,c=o.releaseOnScroll,h=function(t,e){if(e<0||e>90)return r.j9;var n=Math.abs(t);return n>e&&n<180-e?r.Et:r.Xv}(i.angle,this.options.thresholdAngle);if(!c||i.srcEvent.cancelable){if(n.prevEvent&&r.ab){if(i.center.x<0)return this._detachWindowEvent(n),void this._observer.release(this,n.prevEvent,[0,0]);this._atRightEdge&&(clearTimeout(this._rightEdgeTimer),i.deltaX<-u?this._atRightEdge=!1:this._rightEdgeTimer=window.setTimeout((function(){e._detachWindowEvent(n),e._observer.release(e,n.prevEvent,[0,0])}),100))}var l=this._getOffset([i.offsetX,i.offsetY],[s(r.Xv,this._direction,h),s(r.Et,this._direction,h)]),d=l.some((function(t){return 0!==t}));d&&(!1!==i.srcEvent.cancelable&&i.srcEvent.preventDefault(),i.srcEvent.stopPropagation()),i.preventSystemEvent=d,d&&this._observer.change(this,i,(0,a.m)(this.axes,l)),n.prevEvent=i}else this._onPanend(t)}},e._onPanend=function(t){var e=this._activeInput;if(e.onEventEnd(t),this._enabled&&0===e.getTouches(t)){this._detachWindowEvent(e),clearTimeout(this._rightEdgeTimer);var n=e.prevEvent,i=this._getOffset([Math.abs(n.velocityX)*(n.offsetX<0?-1:1),Math.abs(n.velocityY)*(n.offsetY<0?-1:1)],[s(r.Xv,this._direction),s(r.Et,this._direction)]);this._observer.release(this,n,i)}},e._attachWindowEvent=function(t){var e=this;null==t||t.move.forEach((function(t){window.addEventListener(t,e._onPanmove,!1)})),null==t||t.end.forEach((function(t){window.addEventListener(t,e._onPanend,!1)}))},e._detachWindowEvent=function(t){var e=this;null==t||t.move.forEach((function(t){window.removeEventListener(t,e._onPanmove,!1)})),null==t||t.end.forEach((function(t){window.removeEventListener(t,e._onPanend,!1)}))},e._attachElementEvent=function(t){var e=this,n=(0,a.J)(this.options.inputType);if(!n)throw new Error("There is currently no inputType available for current device. There must be at least one available inputType.");this._observer=t,this._enabled=!0,this._activeInput=n,null==n||n.start.forEach((function(t){var n;null==(n=e.element)||n.addEventListener(t,e._onPanstart,!1)}))},e._detachElementEvent=function(){var t=this,e=this._activeInput;null==e||e.start.forEach((function(e){var n;null==(n=t.element)||n.removeEventListener(e,t._onPanstart,!1)})),this._enabled=!1,this._observer=null},e._getOffset=function(t,e){var n=[0,0],i=this.options.scale;return e[0]&&(n[0]=t[0]*i[0]),e[1]&&(n[1]=t[1]*i[1]),n},t}()},8519:function(t,e,n){n.d(e,{$:function(){return s},Dg:function(){return p},Dw:function(){return M},QV:function(){return _},U7:function(){return l},UF:function(){return E},UI:function(){return f},Wx:function(){return d},_O:function(){return b},hX:function(){return g},il:function(){return x},lH:function(){return P},yW:function(){return v}});var i=n(9854),r=n(1229),a=function(t){for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e},s=function t(e,n){var r;if(void 0===n&&(n=!1),"string"==typeof e){if(e.match(/^<([a-z]+)\s*([^>]*)>/)){var s=document.createElement("div");s.innerHTML=e,r=a(s.childNodes)}else r=a(document.querySelectorAll(e));n||(r=r.length>=1?r[0]:void 0)}else e===i.u?r=e:!e.nodeName||1!==e.nodeType&&9!==e.nodeType?"jQuery"in i.u&&e instanceof jQuery||e.constructor.prototype.jquery?r=n?e.toArray():e.get(0):Array.isArray(e)&&(r=e.map((function(e){return t(e)})),n||(r=r.length>=1?r[0]:void 0)):r=e;return r},o=i.u.requestAnimationFrame||i.u.webkitRequestAnimationFrame,u=i.u.cancelAnimationFrame||i.u.webkitCancelAnimationFrame;if(o&&!u){var c={},h=o;o=function(t){var e=h((function(n){c[e]&&t(n)}));return c[e]=!0,e},u=function(t){delete c[t]}}else o&&u||(o=function(t){return i.u.setTimeout((function(){t(i.u.performance&&i.u.performance.now&&i.u.performance.now()||(new Date).getTime())}),16)},u=i.u.clearTimeout);var l=function(t){return o(t)},d=function(t){u(t)},f=function(t,e){var n={};for(var i in t)i&&(n[i]=e(t[i],i));return n},g=function(t,e){var n={};for(var i in t)i&&e(t[i],i)&&(n[i]=t[i]);return n},v=function(t,e){for(var n in t)if(n&&!e(t[n],n))return!1;return!0},p=function(t,e){return v(t,(function(t,n){return t===e[n]}))},m={},_=function(t,e){return m[e]||(m[e]=y(e)),m[e](t)},E=function(t,e){return t&&e?f(t,(function(t,n){return _(t,"number"==typeof e?e:e[n])})):t},x=function(t){if(!isFinite(t))return 0;var e=""+t;if(e.indexOf("e")>=0){for(var n=0,i=1;Math.round(t*i)/i!==t;)i*=10,n++;return n}return e.indexOf(".")>=0?e.length-e.indexOf(".")-1:0},M=function(t){return 1/Math.pow(10,t)},y=function(t){var e=t<1?Math.pow(10,x(t)):1;return function(n){return 0===t?0:Math.round(Math.round(n/t)*t*e)/e}},b=function(t,e){return 180*Math.atan2(e,t)/Math.PI},P=function(t,e){var n={};if(t&&t.style){var i=e||r.aE;Object.keys(i).forEach((function(e){n[e]=t.style[e],t.style[e]=i[e]}))}return n}},3810:function(t,e,n){n.r(e),n.d(e,{assets:function(){return l},contentTitle:function(){return c},default:function(){return g},frontMatter:function(){return u},metadata:function(){return h},toc:function(){return d}});var i=n(7462),r=n(3366),a=(n(7294),n(3905)),s=n(983),o=["components"],u={title:"Gallery",id:"gallery",slug:"/gallery",sidebar_position:12},c=void 0,h={unversionedId:"demos/gallery",id:"demos/gallery",title:"Gallery",description:"",source:"@site/docs/demos/gallery.mdx",sourceDirName:"demos",slug:"/gallery",permalink:"/egjs-axes/docs/gallery",editUrl:"https://github.com/naver/egjs-axes/edit/master/demo/docs/demos/gallery.mdx",tags:[],version:"current",sidebarPosition:12,frontMatter:{title:"Gallery",id:"gallery",slug:"/gallery",sidebar_position:12},sidebar:"demos",previous:{title:"Nested Axes",permalink:"/egjs-axes/docs/nestedaxes"}},l={},d=[],f={toc:d};function g(t){var e=t.components,n=(0,r.Z)(t,o);return(0,a.kt)("wrapper",(0,i.Z)({},f,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)(s.default,{mdxType:"Gallery"}))}g.isMDXComponent=!0},2899:function(t,e,n){e.Z=n.p+"assets/images/bg1-f990805e183f6d1e4b743b30be30f1fd.jpg"},2099:function(t,e,n){e.Z=n.p+"assets/images/bg2-1e78fa11dc7996060e3577af814c7e4d.jpg"},7795:function(t,e,n){e.Z=n.p+"assets/images/bg3-1-d93937a262cd77d8f9700f99a44dba5d.jpg"},7637:function(t,e,n){e.Z=n.p+"assets/images/bg3-2-54aed491d88996bd8ebdf65d948d14ab.jpg"},48:function(t,e,n){e.Z=n.p+"assets/images/bg3-3-afd7e56b39a5f46958f7c50794ce84cf.jpg"},1957:function(t,e,n){e.Z=n.p+"assets/images/bg4-2b9cd5c2414618a6f8f38421f5f121a4.jpg"},4732:function(t,e,n){e.Z=n.p+"assets/images/bg5-20a28ba7da68f25e2934ba2831029545.jpg"},7751:function(t,e,n){e.Z=n.p+"assets/images/bg6-ac5d9feeb45e4939f9457926c1a637ae.jpg"}}]);