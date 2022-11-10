"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1248,6640],{876:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>g});var s=n(2784);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,s)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,s,i=function(t,e){if(null==t)return{};var n,s,i={},r=Object.keys(t);for(s=0;s<r.length;s++)n=r[s],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(s=0;s<r.length;s++)n=r[s],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var h=s.createContext({}),c=function(t){var e=s.useContext(h),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},u=function(t){var e=c(t.components);return s.createElement(h.Provider,{value:e},t.children)},l={inlineCode:"code",wrapper:function(t){var e=t.children;return s.createElement(s.Fragment,{},e)}},d=s.forwardRef((function(t,e){var n=t.components,i=t.mdxType,r=t.originalType,h=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),d=c(n),g=i,p=d["".concat(h,".").concat(g)]||d[g]||l[g]||r;return n?s.createElement(p,a(a({ref:e},u),{},{components:n})):s.createElement(p,a({ref:e},u))}));function g(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var r=n.length,a=new Array(r);a[0]=d;var o={};for(var h in e)hasOwnProperty.call(e,h)&&(o[h]=e[h]);o.originalType=t,o.mdxType="string"==typeof t?t:i,a[1]=o;for(var c=2;c<r;c++)a[c]=n[c];return s.createElement.apply(null,a)}return s.createElement.apply(null,n)}d.displayName="MDXCreateElement"},981:(t,e,n)=>{n.d(e,{Z:()=>x});var s=n(1588),i=n(5362),r=n(8568);class a{constructor(t){this._axes=t}hold(t,e){const{roundPos:n}=this._getRoundPos(t);this._axes.trigger(new s.L("hold",{pos:n,input:e.input||null,inputEvent:e.event||null,isTrusted:!0}))}triggerRelease(t){const{roundPos:e,roundDepa:n}=this._getRoundPos(t.destPos,t.depaPos);t.destPos=e,t.depaPos=n,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new s.L("release",{...t,bounceRatio:this._getBounceRatio(e)}))}triggerChange(t,e,n,r){void 0===r&&(r=!1);const a=this.animationManager,o=a.axisManager,h=a.getEventInfo(),{roundPos:c,roundDepa:u}=this._getRoundPos(t,e),l=o.moveTo(c,u),d=(null==n?void 0:n.event)||(null==h?void 0:h.event)||null,g={pos:l.pos,delta:l.delta,bounceRatio:this._getBounceRatio(l.pos),holding:r,inputEvent:d,isTrusted:!!d,input:(null==n?void 0:n.input)||(null==h?void 0:h.input)||null,set:d?this._createUserControll(l.pos):()=>{}},p=new s.L("change",g);return this._axes.trigger(p),Object.keys(l.pos).forEach((t=>{const e=l.pos[t];(0,i.CV)(this._axes,t,e).current=e})),d&&o.set(g.set().destPos),!p.isCanceled()}triggerAnimationStart(t){const{roundPos:e,roundDepa:n}=this._getRoundPos(t.destPos,t.depaPos);t.destPos=e,t.depaPos=n,t.setTo=this._createUserControll(t.destPos,t.duration);const i=new s.L("animationStart",t);return this._axes.trigger(i),!i.isCanceled()}triggerAnimationEnd(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("animationEnd",{isTrusted:t}))}triggerFinish(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("finish",{isTrusted:t}))}setAnimationManager(t){this.animationManager=t}destroy(){this._axes.off()}_createUserControll(t,e){void 0===e&&(e=0);const n={destPos:{...t},duration:e};return(t,e)=>(t&&(n.destPos={...t}),void 0!==e&&(n.duration=e),n)}_getRoundPos(t,e){const n=this._axes.options.round;return{roundPos:(0,r.UF)(t,n),roundDepa:(0,r.UF)(e,n)}}_getBounceRatio(t){return this._axes.axisManager.map(t,((t,e)=>t<e.range[0]&&0!==e.bounce[0]?(e.range[0]-t)/e.bounce[0]:t>e.range[1]&&0!==e.bounce[1]?(t-e.range[1])/e.bounce[1]:0))}}class o{constructor(t){this._prevented=!1,this._options=t}isInterrupting(){return this._options.interruptable||this._prevented}isInterrupted(){return!this._options.interruptable&&this._prevented}setInterrupt(t){this._options.interruptable||(this._prevented=t)}}const h=(t,e,n,s)=>{let i=t;const r=[n[0]?e[0]:s?e[0]-s[0]:e[0],n[1]?e[1]:s?e[1]+s[1]:e[1]];return i=Math.max(r[0],i),i=Math.min(r[1],i),i},c=(t,e)=>t<e[0]||t>e[1],u=(t,e,n)=>n[1]&&t>e[1]||n[0]&&t<e[0],l=(t,e,n)=>{let s=t;const i=e[0],r=e[1],a=r-i;return n[1]&&t>r&&(s=(s-r)%a+i),n[0]&&t<i&&(s=(s-i)%a+r),s};class d{constructor(t){this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce(((t,e)=>(t[e]=this._axis[e].range[0],t)),{})}getDelta(t,e){const n=this.get(t);return(0,r.UI)(this.get(e),((t,e)=>t-n[e]))}get(t){return t&&Array.isArray(t)?t.reduce(((t,e)=>(e&&e in this._pos&&(t[e]=this._pos[e]),t)),{}):{...this._pos,...t||{}}}moveTo(t,e){void 0===e&&(e=this._pos);const n=(0,r.UI)(this._pos,((n,s)=>s in t&&s in e?t[s]-e[s]:0));return this.set(this.map(t,((t,e)=>e?l(t,e.range,e.circular):0))),{pos:{...this._pos},delta:n}}set(t){for(const e in t)e&&e in this._pos&&(this._pos[e]=t[e])}every(t,e){const n=this._axis;return(0,r.yW)(t,((t,s)=>e(t,n[s],s)))}filter(t,e){const n=this._axis;return(0,r.hX)(t,((t,s)=>e(t,n[s],s)))}map(t,e){const n=this._axis;return(0,r.UI)(t,((t,s)=>e(t,n[s],s)))}isOutside(t){return!this.every(t?this.get(t):this._pos,((t,e)=>!c(t,e.range)))}getAxisOptions(t){return this._axis[t]}_complementOptions(){Object.keys(this._axis).forEach((t=>{this._axis[t]={range:[0,100],startPos:this._axis[t].range[0],bounce:[0,0],circular:[!1,!1],...this._axis[t]},["bounce","circular"].forEach((e=>{const n=this._axis,s=n[t][e];/string|number|boolean/.test(typeof s)&&(n[t][e]=[s,s])}))}))}}var g=n(1214);class p{constructor(t){let{options:e,interruptManager:n,eventManager:s,axisManager:i,animationManager:r}=t;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=e,this._interruptManager=n,this._eventManager=s,this._axisManager=i,this._animationManager=r}get(t){return this._axisManager.get(t.axes)}hold(t,e){if(this._interruptManager.isInterrupted()||!t.axes.length)return;const n={input:t,event:e};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(n),this._moveDistance||this._eventManager.hold(this._axisManager.get(),n),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}change(t,e,n,s){if(this._isStopped||!this._interruptManager.isInterrupting()||this._axisManager.every(n,(t=>0===t)))return;const i=e.srcEvent?e.srcEvent:e;if(i.__childrenAxesAlreadyChanged)return;let a,o=this._moveDistance||this._axisManager.get(t.axes);a=(0,r.UI)(o,((t,e)=>t+(n[e]||0))),this._moveDistance&&(this._moveDistance=this._axisManager.map(a,((t,e)=>{let{circular:n,range:s}=e;return n&&(n[0]||n[1])?l(t,s,n):t}))),this._isOutside&&this._axisManager.every(o,((t,e)=>!c(t,e.range)))&&(this._isOutside=!1),o=this._atOutside(o),a=this._atOutside(a),this.options.nested&&this._isEndofAxis(n,o,a)||(i.__childrenAxesAlreadyChanged=!0);const h={input:t,event:e};if(s){const t=this._animationManager.getDuration(a,o);this._animationManager.animateTo(a,t,h)}else{!this._eventManager.triggerChange(a,o,h,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}release(t,e,n,s){if(this._isStopped||!this._interruptManager.isInterrupting()||!this._moveDistance)return;const i=e.srcEvent?e.srcEvent:e;i.__childrenAxesAlreadyReleased&&(n=n.map((()=>0)));const a=this._axisManager.get(t.axes),o=this._axisManager.get(),c=this._animationManager.getDisplacement(n),u=(0,g.m)(t.axes,c);let l=this._axisManager.get(this._axisManager.map(u,((t,e,n)=>e.circular&&(e.circular[0]||e.circular[1])?a[n]+t:h(a[n]+t,e.range,e.circular,e.bounce))));i.__childrenAxesAlreadyReleased=!0;const d=this._animationManager.getDuration(l,a,s);0===d&&(l={...o});const p={depaPos:o,destPos:l,duration:d,delta:this._axisManager.getDelta(o,l),inputEvent:e,input:t,isTrusted:!0};this._eventManager.triggerRelease(p),this._moveDistance=null;const _=this._animationManager.getUserControl(p),m=(0,r.Dg)(_.destPos,o),v={input:t,event:e};m||0===_.duration?(m||this._eventManager.triggerChange(_.destPos,o,v,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(v):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(_.destPos,_.duration,v)}_atOutside(t){return this._isOutside?this._axisManager.map(t,((t,e)=>{const n=e.range[0]-e.bounce[0],s=e.range[1]+e.bounce[1];return t>s?s:t<n?n:t})):this._axisManager.map(t,((t,e)=>{const n=e.range[0],s=e.range[1],i=e.bounce,r=e.circular;return r&&(r[0]||r[1])?t:t<n?n-this._animationManager.interpolate(n-t,i[0]):t>s?s+this._animationManager.interpolate(t-s,i[1]):t}))}_isEndofAxis(t,e,n){return this._axisManager.every(e,((s,i,r)=>{return 0===t[r]||e[r]===n[r]&&(a=s,o=i.range,h=i.bounce,!(c=i.circular)[0]&&a===o[0]-h[0]||!c[1]&&a===o[1]+h[1]);var a,o,h,c}))}}var _=n(8362);const m=(t,e,n)=>Math.max(Math.min(t,n),e);class v extends class{constructor(t){let{options:e,interruptManager:n,eventManager:s,axisManager:i}=t;this._options=e,this.interruptManager=n,this.eventManager=s,this.axisManager=i,this.animationEnd=this.animationEnd.bind(this)}getDuration(t,e,n){let s;if(void 0!==n)s=n;else{const n=(0,r.UI)(e,((e,n)=>((t,e)=>{const n=Math.sqrt(t/e*2);return n<100?0:n})(Math.abs(e-t[n]),this._options.deceleration)));s=Object.keys(n).reduce(((t,e)=>Math.max(t,n[e])),-1/0)}return m(s,this._options.minimumDuration,this._options.maximumDuration)}getDisplacement(t){const e=Math.pow(t.reduce(((t,e)=>t+e*e),0),1/t.length),n=Math.abs(e/-this._options.deceleration);return t.map((t=>t/2*n))}stopAnimation(t){if(this._animateParam){const e=this.axisManager.get(),n=this.axisManager.map(e,((t,e)=>l(t,e.range,e.circular)));(0,r.yW)(n,((t,n)=>e[n]===t))||this.eventManager.triggerChange(n,e,t,!!t),this._animateParam=null,this._raf&&(0,r.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}}getEventInfo(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null}restore(t){const e=this.axisManager.get(),n=this.axisManager.map(e,((t,e)=>Math.min(e.range[1],Math.max(e.range[0],t))));this.stopAnimation(),this.animateTo(n,this.getDuration(e,n),t)}animationEnd(){const t=this.getEventInfo();this._animateParam=null;const e=this.axisManager.filter(this.axisManager.get(),((t,e)=>u(t,e.range,e.circular)));Object.keys(e).length>0&&this.setTo(this.axisManager.map(e,((t,e)=>l(t,e.range,e.circular)))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)}finish(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)}getUserControl(t){const e=t.setTo();return e.destPos=this.axisManager.get(e.destPos),e.duration=m(e.duration,this._options.minimumDuration,this._options.maximumDuration),e}animateTo(t,e,n){this.stopAnimation();const s=this._createAnimationParam(t,e,n),i={...s.depaPos},a=this.eventManager.triggerAnimationStart(s),o=this.getUserControl(s);if(!a&&this.axisManager.every(o.destPos,((t,e)=>u(t,e.range,e.circular)))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),a&&!(0,r.Dg)(o.destPos,i)){const t=(null==n?void 0:n.event)||null;this._animateLoop({depaPos:i,destPos:o.destPos,duration:o.duration,delta:this.axisManager.getDelta(i,o.destPos),isTrusted:!!t,inputEvent:t,input:(null==n?void 0:n.input)||null},(()=>this.animationEnd()))}}setTo(t,e){void 0===e&&(e=0);const n=Object.keys(t),s=this.axisManager.get(n);if((0,r.Dg)(t,s))return this;this.interruptManager.setInterrupt(!0);let i=(0,r.hX)(t,((t,e)=>s[e]!==t));return Object.keys(i).length?(i=this.axisManager.map(i,((t,e)=>{const{range:n,circular:s}=e;return s&&(s[0]||s[1])?t:h(t,n,s)})),(0,r.Dg)(i,s)||(e>0?this.animateTo(i,e):(this.stopAnimation(),this.eventManager.triggerChange(i),this.finish(!1))),this):this}setBy(t,e){return void 0===e&&(e=0),this.setTo((0,r.UI)(this.axisManager.get(Object.keys(t)),((e,n)=>e+t[n])),e)}_createAnimationParam(t,e,n){const s=this.axisManager.get(),i=t,r=(null==n?void 0:n.event)||null;return{depaPos:s,destPos:i,duration:m(e,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(s,i),inputEvent:r,input:(null==n?void 0:n.input)||null,isTrusted:!!r,done:this.animationEnd}}_animateLoop(t,e){if(t.duration){this._animateParam={...t,startTime:(new Date).getTime()};const n=(0,r.UI)(t.destPos,(t=>t));let s=this._initState(this._animateParam);const i=()=>{this._raf=null;const t=this._animateParam,a=this._getNextState(s),o=!this.eventManager.triggerChange(a.pos,s.pos);if(s=a,a.finished)return t.destPos=this._getFinalPos(t.destPos,n),(0,r.Dg)(t.destPos,this.axisManager.get(Object.keys(t.destPos)))||this.eventManager.triggerChange(t.destPos,a.pos),void e();o?this.finish(!1):this._raf=(0,r.U7)(i)};i()}else this.eventManager.triggerChange(t.destPos),e()}_getFinalPos(t,e){const n=1e-6;return(0,r.UI)(t,((t,s)=>{if(t>=e[s]-n&&t<=e[s]+n)return e[s];{const e=this._getRoundUnit(t,s);return(0,r.QV)(t,e)}}))}_getRoundUnit(t,e){const n=this._options.round;let s=null;if(!n){const n=this.axisManager.getAxisOptions(e);s=(0,r.Dw)(Math.max((0,r.il)(n.range[0]),(0,r.il)(n.range[1]),(0,r.il)(t)))}return s||n}}{constructor(){super(...arguments),this._useDuration=!0}interpolate(t,e){const n=this._easing(1e-5)/1e-5;return this._easing(t/(e*n))*e}updateAnimation(t){const e=this._animateParam;if(!e)return;const n=(new Date).getTime()-e.startTime,s=(null==t?void 0:t.destPos)||e.destPos,i=(null==t?void 0:t.duration)||e.duration;if(null!=t&&t.restart||i<=n)this.setTo(s,i-n);else{if(null!=t&&t.destPos){const t=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,e.delta=this.axisManager.getDelta(t,s),e.destPos=s}if(null!=t&&t.duration){const t=(n+this._durationOffset)/e.duration;this._durationOffset=t*i-n,e.duration=i}}}_initState(t){return this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,{pos:t.depaPos,easingPer:0,finished:!1}}_getNextState(t){const e=this._animateParam,n=t.pos,s=e.destPos,i=(0,r.UI)(n,((t,e)=>t<=s[e]?1:-1)),a=((new Date).getTime()-e.startTime+this._durationOffset)/e.duration,o=this._easing(a),h=this.axisManager.map(n,((t,r,h)=>{const c=a>=1?s[h]:t+e.delta[h]*(o-this._prevEasingPer)/(1-this._initialEasingPer),u=l(c,r.range,r.circular);if(c!==u){const t=i[h]*(r.range[1]-r.range[0]);s[h]-=t,n[h]-=t}return u}));return this._prevEasingPer=o,{pos:h,easingPer:o,finished:o>=1}}_easing(t){return t>1?1:this._options.easing(t)}}var E,f;const x=(0,i.kU)(((f=class extends s.Z{constructor(t,e,n){void 0===t&&(t={}),void 0===e&&(e={}),void 0===n&&(n=null),super(),this._inputs=[],this.axis=t,this.options={easing:t=>1-Math.pow(1-t,3),interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1,...e},this.interruptManager=new o(this.options),this.axisManager=new d(this.axis),this.eventManager=new a(this),this.animationManager=new v(this),this.inputObserver=new p(this),this.eventManager.setAnimationManager(this.animationManager),this.eventManager.triggerChange((0,r.HD)(t,n))}connect(t,e){let n;return n="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(e)&&this.disconnect(e),e.mapAxes(n),e.connect(this.inputObserver),this._inputs.push(e),this}disconnect(t){if(t){const e=this._inputs.indexOf(t);e>=0&&(this._inputs[e].disconnect(),this._inputs.splice(e,1))}else this._inputs.forEach((t=>t.disconnect())),this._inputs=[];return this}get(t){return this.axisManager.get(t)}setTo(t,e){return void 0===e&&(e=0),this.animationManager.setTo(t,e),this}setBy(t,e){return void 0===e&&(e=0),this.animationManager.setBy(t,e),this}stopAnimation(){return this.animationManager.stopAnimation(),this}updateAnimation(t){return this.animationManager.updateAnimation(t),this}isBounceArea(t){return this.axisManager.isOutside(t)}destroy(){this.disconnect(),this.eventManager.destroy()}}).VERSION="#__VERSION__#",f.TRANSFORM=_.Up,f.DIRECTION_NONE=_.j9,f.DIRECTION_LEFT=_.AV,f.DIRECTION_RIGHT=_.EM,f.DIRECTION_UP=_.uO,f.DIRECTION_DOWN=_.C2,f.DIRECTION_HORIZONTAL=_.Xv,f.DIRECTION_VERTICAL=_.Et,f.DIRECTION_ALL=_.oM,E=f))||E},3987:(t,e,n)=>{let s;n.d(e,{u:()=>s}),s="undefined"==typeof window?{navigator:{userAgent:""}}:window},8362:(t,e,n)=>{n.d(e,{AV:()=>a,C2:()=>u,EM:()=>o,Et:()=>l,Up:()=>f,Xv:()=>h,YS:()=>_,ZL:()=>x,ab:()=>E,ej:()=>p,gk:()=>m,j9:()=>r,kZ:()=>v,oM:()=>d,sH:()=>g,uO:()=>c});var s=n(5161),i=n(3987);const r=1,a=2,o=4,h=6,c=8,u=16,l=24,d=30,g="left",p="right",_="middle",m=16,v=30,E="ontouchstart"in i.u&&"safari"===(0,s.ZP)().browser.name,f=(()=>{if("undefined"==typeof document)return"";const t=(document.head||document.getElementsByTagName("head")[0]).style,e=["transform","webkitTransform","msTransform","mozTransform"];for(let n=0,s=e.length;n<s;n++)if(e[n]in t)return e[n];return""})(),x={"user-select":"none","-webkit-user-drag":"none"}},8279:(t,e,n)=>{n.d(e,{ZP:()=>s});const s=n(981).Z},1214:(t,e,n)=>{n.d(e,{J:()=>m,m:()=>_});var s=n(8568),i=n(3987),r=n(8362);const a="ontouchstart"in i.u,o="PointerEvent"in i.u,h="MSPointerEvent"in i.u,c=o||h;class u{constructor(){this._stopContextMenu=t=>{t.preventDefault(),i.u.removeEventListener("contextmenu",this._stopContextMenu)}}extendEvent(t){const e=this.prevEvent,n=this._getCenter(t),i=e?this._getMovement(t):{x:0,y:0},a=e?this._getScale(t):1,o=e?(0,s._O)(n.x-e.center.x,n.y-e.center.y):0,h=e?e.deltaX+i.x:i.x,c=e?e.deltaY+i.y:i.y,u=i.x,l=i.y,d=this._latestInterval,g=Date.now(),p=d?g-d.timestamp:0;let _=e?e.velocityX:0,m=e?e.velocityY:0;return(!d||p>=r.gk)&&(d&&([_,m]=[(h-d.deltaX)/p,(c-d.deltaY)/p]),this._latestInterval={timestamp:g,deltaX:h,deltaY:c}),{srcEvent:t,scale:a,angle:o,center:n,deltaX:h,deltaY:c,offsetX:u,offsetY:l,velocityX:_,velocityY:m,preventSystemEvent:!0}}_getDistance(t,e){const n=e.clientX-t.clientX,s=e.clientY-t.clientY;return Math.sqrt(n*n+s*s)}_getButton(t){const e={1:r.sH,2:r.ej,4:r.YS},n=this._isTouchEvent(t)?r.sH:e[t.buttons];return n||null}_isTouchEvent(t){return t.type.indexOf("touch")>-1}_isValidButton(t,e){return e.indexOf(t)>-1}_preventMouseButton(t,e){e===r.ej?i.u.addEventListener("contextmenu",this._stopContextMenu):e===r.YS&&t.preventDefault()}}class l extends u{constructor(){super(...arguments),this.start=["mousedown"],this.move=["mousemove"],this.end=["mouseup"]}onEventStart(t,e){const n=this._getButton(t);return e&&!this._isValidButton(n,e)?null:(this._preventMouseButton(t,n),this.extendEvent(t))}onEventMove(t,e){return e&&!this._isValidButton(this._getButton(t),e)?null:this.extendEvent(t)}onEventEnd(){}onRelease(){this.prevEvent=null}getTouches(){return 0}_getScale(){return 1}_getCenter(t){return{x:t.clientX,y:t.clientY}}_getMovement(t){const e=this.prevEvent.srcEvent;return{x:t.clientX-e.clientX,y:t.clientY-e.clientY}}}class d extends u{constructor(){super(...arguments),this.start=["touchstart"],this.move=["touchmove"],this.end=["touchend","touchcancel"]}onEventStart(t){return this._baseTouches=t.touches,this.extendEvent(t)}onEventMove(t){return this.extendEvent(t)}onEventEnd(t){this._baseTouches=t.touches}onRelease(){this.prevEvent=null,this._baseTouches=null}getTouches(t){return t.touches.length}_getScale(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])}_getCenter(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}}_getMovement(t){const e=this.prevEvent.srcEvent;return t.touches[0].identifier!==e.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].clientX-e.touches[0].clientX,y:t.touches[0].clientY-e.touches[0].clientY}}}class g extends u{constructor(){super(...arguments),this.start=o?["pointerdown"]:["MSPointerDown"],this.move=o?["pointermove"]:["MSPointerMove"],this.end=o?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],this._firstInputs=[],this._recentInputs=[]}onEventStart(t,e){const n=this._getButton(t);return e&&!this._isValidButton(n,e)?null:(this._preventMouseButton(t,n),this._updatePointerEvent(t),this.extendEvent(t))}onEventMove(t,e){return e&&!this._isValidButton(this._getButton(t),e)?null:(this._updatePointerEvent(t),this.extendEvent(t))}onEventEnd(t){this._removePointerEvent(t)}onRelease(){this.prevEvent=null,this._firstInputs=[],this._recentInputs=[]}getTouches(){return this._recentInputs.length}_getScale(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])}_getCenter(t){return{x:t.clientX,y:t.clientY}}_getMovement(t){const e=this.prevEvent.srcEvent;return t.pointerId!==e.pointerId?{x:0,y:0}:{x:t.clientX-e.clientX,y:t.clientY-e.clientY}}_updatePointerEvent(t){let e=!1;this._recentInputs.forEach(((n,s)=>{n.pointerId===t.pointerId&&(e=!0,this._recentInputs[s]=t)})),e||(this._firstInputs.push(t),this._recentInputs.push(t))}_removePointerEvent(t){this._firstInputs=this._firstInputs.filter((e=>e.pointerId!==t.pointerId)),this._recentInputs=this._recentInputs.filter((e=>e.pointerId!==t.pointerId))}}class p extends u{constructor(){super(...arguments),this.start=["mousedown","touchstart"],this.move=["mousemove","touchmove"],this.end=["mouseup","touchend","touchcancel"]}onEventStart(t,e){const n=this._getButton(t);return this._isTouchEvent(t)&&(this._baseTouches=t.touches),e&&!this._isValidButton(n,e)?null:(this._preventMouseButton(t,n),this.extendEvent(t))}onEventMove(t,e){return e&&!this._isValidButton(this._getButton(t),e)?null:this.extendEvent(t)}onEventEnd(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)}onRelease(){this.prevEvent=null,this._baseTouches=null}getTouches(t){return this._isTouchEvent(t)?t.touches.length:0}_getScale(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale}_getCenter(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}}_getMovement(t){const e=this.prevEvent.srcEvent,[n,s]=[t,e].map((t=>this._isTouchEvent(t)?{id:t.touches[0].identifier,x:t.touches[0].clientX,y:t.touches[0].clientY}:{id:null,x:t.clientX,y:t.clientY}));return n.id===s.id?{x:n.x-s.x,y:n.y-s.y}:{x:0,y:0}}}const _=(t,e)=>e.reduce(((e,n,s)=>(t[s]&&(e[t[s]]=n),e)),{}),m=function(t){void 0===t&&(t=[]);let e=!1,n=!1,s=!1;return t.forEach((t=>{switch(t){case"mouse":n=!0;break;case"touch":e=a;break;case"pointer":s=c}})),s?new g:e&&n?new p:e?new d:n?new l:null}},9228:(t,e,n)=>{n.d(e,{J:()=>a});var s=n(8568),i=n(8362),r=n(1214);class a{constructor(t,e){this.axes=[],this.element=null,this._enabled=!1,this._activeEvent=null,this._atRightEdge=!1,this._rightEdgeTimer=0,this._voidFunction=()=>{},this.element=(0,s.$)(t),this.options={inputType:["touch","mouse","pointer"],inputButton:[i.sH],scale:[1,1],thresholdAngle:45,threshold:0,iOSEdgeSwipeThreshold:i.kZ,releaseOnScroll:!1,touchAction:null,...e},this._onPanstart=this._onPanstart.bind(this),this._onPanmove=this._onPanmove.bind(this),this._onPanend=this._onPanend.bind(this)}mapAxes(t){this._direction=(0,s.Mg)(!!t[0],!!t[1]),this.axes=t}connect(t){return this._activeEvent&&(this._detachElementEvent(),this._detachWindowEvent(this._activeEvent)),this._attachElementEvent(t),this._originalCssProps=(0,s.lH)(this.element,this.options,this._direction),this}disconnect(){return this._detachElementEvent(),this._detachWindowEvent(this._activeEvent),(0,s.fx)(this._originalCssProps)||(0,s.tF)(this.element,this._originalCssProps),this._direction=i.j9,this}destroy(){this.disconnect(),this.element=null}enable(){return this._enabled=!0,this}disable(){return this._enabled=!1,this}isEnabled(){return this._enabled}release(){const t=this._activeEvent,e=t.prevEvent;return t.onRelease(),this._observer.release(this,e,[0,0]),this._detachWindowEvent(t),this}_onPanstart(t){const e=this._activeEvent,n=e.onEventStart(t,this.options.inputButton);if(n&&this._enabled&&!(e.getTouches(t)>1)&&!1!==n.srcEvent.cancelable){const t=this.options.iOSEdgeSwipeThreshold;this._observer.hold(this,n),this._atRightEdge=i.ab&&n.center.x>window.innerWidth-t,this._attachWindowEvent(e),e.prevEvent=n}}_onPanmove(t){const e=this._activeEvent,n=e.onEventMove(t,this.options.inputButton);if(!n||!this._enabled||e.getTouches(t)>1)return;const{iOSEdgeSwipeThreshold:a,releaseOnScroll:o}=this.options,h=((t,e)=>{if(e<0||e>90)return i.j9;const n=Math.abs(t);return n>e&&n<180-e?i.Et:i.Xv})(n.angle,this.options.thresholdAngle);if(o&&!n.srcEvent.cancelable)return void this._onPanend(t);if(e.prevEvent&&i.ab){if(n.center.x<0)return void this.release();if(this._atRightEdge){clearTimeout(this._rightEdgeTimer);n.deltaX<-a?this._atRightEdge=!1:this._rightEdgeTimer=window.setTimeout((()=>this.release()),100)}}const c=this._getOffset([n.offsetX,n.offsetY],[(0,s.gm)(i.Xv,this._direction,h),(0,s.gm)(i.Et,this._direction,h)]),u=c.some((t=>0!==t));u&&(!1!==n.srcEvent.cancelable&&n.srcEvent.preventDefault(),n.srcEvent.stopPropagation()),n.preventSystemEvent=u,u&&this._observer.change(this,n,(0,r.m)(this.axes,c)),e.prevEvent=n}_onPanend(t){const e=this._activeEvent;if(e.onEventEnd(t),!this._enabled||0!==e.getTouches(t))return;this._detachWindowEvent(e),clearTimeout(this._rightEdgeTimer);const n=e.prevEvent,r=this._getOffset([Math.abs(n.velocityX)*(n.offsetX<0?-1:1),Math.abs(n.velocityY)*(n.offsetY<0?-1:1)],[(0,s.gm)(i.Xv,this._direction),(0,s.gm)(i.Et,this._direction)]);e.onRelease(),this._observer.release(this,n,r)}_attachWindowEvent(t){null==t||t.move.forEach((t=>{window.addEventListener(t,this._onPanmove,{passive:!1})})),null==t||t.end.forEach((t=>{window.addEventListener(t,this._onPanend,{passive:!1})}))}_detachWindowEvent(t){null==t||t.move.forEach((t=>{window.removeEventListener(t,this._onPanmove)})),null==t||t.end.forEach((t=>{window.removeEventListener(t,this._onPanend)}))}_getOffset(t,e){const n=this.options.scale;return[e[0]?t[0]*n[0]:0,e[1]?t[1]*n[1]:0]}_attachElementEvent(t){const e=(0,r.J)(this.options.inputType);e&&(this._observer=t,this._enabled=!0,this._activeEvent=e,e.start.forEach((t=>{var e;null==(e=this.element)||e.addEventListener(t,this._onPanstart)})),e.move.forEach((t=>{var e;null==(e=this.element)||e.addEventListener(t,this._voidFunction)})))}_detachElementEvent(){const t=this._activeEvent;null==t||t.start.forEach((t=>{var e;null==(e=this.element)||e.removeEventListener(t,this._onPanstart)})),null==t||t.move.forEach((t=>{var e;null==(e=this.element)||e.removeEventListener(t,this._voidFunction)})),this._enabled=!1,this._observer=null}}},8568:(t,e,n)=>{n.d(e,{$:()=>a,Dg:()=>p,Dw:()=>f,HD:()=>P,Mg:()=>b,QV:()=>m,U7:()=>c,UF:()=>v,UI:()=>l,Wx:()=>u,_O:()=>M,fx:()=>y,gm:()=>O,hX:()=>d,il:()=>E,lH:()=>T,tF:()=>w,yW:()=>g});var s=n(3987),i=n(8362);const r=t=>{const e=[];for(let n=0,s=t.length;n<s;n++)e.push(t[n]);return e},a=function(t,e){let n;if(void 0===e&&(e=!1),"string"==typeof t){if(t.match(/^<([a-z]+)\s*([^>]*)>/)){const e=document.createElement("div");e.innerHTML=t,n=r(e.childNodes)}else n=r(document.querySelectorAll(t));e||(n=n.length>=1?n[0]:void 0)}else t===s.u?n=t:"value"in t||"current"in t?n=t.value||t.current:!t.nodeName||1!==t.nodeType&&9!==t.nodeType?"jQuery"in s.u&&t instanceof jQuery||t.constructor.prototype.jquery?n=e?t.toArray():t.get(0):Array.isArray(t)&&(n=t.map((t=>a(t))),e||(n=n.length>=1?n[0]:void 0)):n=t;return n};let o=s.u.requestAnimationFrame||s.u.webkitRequestAnimationFrame,h=s.u.cancelAnimationFrame||s.u.webkitCancelAnimationFrame;if(o&&!h){const t={},e=o;o=n=>{const s=e((e=>{t[s]&&n(e)}));return t[s]=!0,s},h=e=>{delete t[e]}}else o&&h||(o=t=>s.u.setTimeout((()=>{t(s.u.performance&&s.u.performance.now&&s.u.performance.now()||(new Date).getTime())}),16),h=s.u.clearTimeout);const c=t=>o(t),u=t=>{h(t)},l=(t,e)=>{const n={};for(const s in t)s&&(n[s]=e(t[s],s));return n},d=(t,e)=>{const n={};for(const s in t)s&&e(t[s],s)&&(n[s]=t[s]);return n},g=(t,e)=>{for(const n in t)if(n&&!e(t[n],n))return!1;return!0},p=(t,e)=>g(t,((t,n)=>t===e[n])),_={},m=(t,e)=>(_[e]||(_[e]=x(e)),_[e](t)),v=(t,e)=>t&&e?l(t,((t,n)=>m(t,"number"==typeof e?e:e[n]))):t,E=t=>{if(!isFinite(t))return 0;const e=""+t;if(e.indexOf("e")>=0){let e=0,n=1;for(;Math.round(t*n)/n!==t;)n*=10,e++;return e}return e.indexOf(".")>=0?e.length-e.indexOf(".")-1:0},f=t=>1/Math.pow(10,t),x=t=>{const e=t<1?Math.pow(10,E(t)):1;return n=>0===t?0:Math.round(Math.round(n/t)*t*e)/e},M=(t,e)=>180*Math.atan2(e,t)/Math.PI,y=t=>{let e=!0;return Object.keys(i.ZL).forEach((n=>{t&&t[n]===i.ZL[n]||(e=!1)})),e},b=(t,e)=>t&&e?i.oM:t?i.Xv:e?i.Et:i.j9,P=(t,e)=>({...Object.keys(t).reduce(((e,n)=>{var s,i;return Object.assign(e,{[n]:null!=(s=null!=(i=t[n].startPos)?i:t[n].range[0])?s:0})}),{}),...e}),O=(t,e,n)=>n?!!(e===i.oM||e&t&&n&t):!!(e&t),T=(t,e,n)=>{const s={[i.j9]:"auto",[i.oM]:"none",[i.Et]:"pan-x",[i.Xv]:"pan-y"},r={};if(t&&t.style){const a=e.touchAction?e.touchAction:s[n],o={...i.ZL,"touch-action":"none"===t.style["touch-action"]?"none":a};Object.keys(o).forEach((e=>{r[e]=t.style[e],t.style[e]=o[e]}))}return r},w=(t,e)=>{t&&t.style&&e&&Object.keys(e).forEach((n=>{t.style[n]=e[n]}))}},7965:(t,e,n)=>{n.r(e),n.d(e,{default:()=>d});var s,i,r,a,o=n(2784),h=n(8279),c=n(9228);function u(){return u=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},u.apply(this,arguments)}const l=t=>{let{title:e,titleId:n,...h}=t;return o.createElement("svg",u({id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",x:0,y:0,viewBox:"0 0 61.2 75.4",style:{enableBackground:"new 0 0 61.2 75.4"},xmlSpace:"preserve","aria-labelledby":n},h),e?o.createElement("title",{id:n},e):null,s||(s=o.createElement("style",null,".st0{fill:#f5c720}")),i||(i=o.createElement("path",{className:"st0",d:"M32.5 15.2c.2-1.5-.1-3.1-.8-4.5l-1.2-2.2c-1.1-2-.4-4.4 1.6-5.5.8-.4 1.1-1.4.6-2.2-.4-.8-1.4-1.1-2.2-.6-3.5 1.9-4.8 6.4-2.8 9.9l1.2 2.2c.5.9.6 2 .4 3 .5.1.9.2 1.4.4.5-.3 1.2-.4 1.8-.5zM22.2 65c-.1.6-.2 1.3-.2 1.9 0 4.7 3.8 8.5 8.5 8.5s8.5-3.8 8.5-8.5c0-.6-.1-1.2-.2-1.8-2.5 1.2-5.3 1.8-8.2 1.8-3 0-5.9-.6-8.4-1.9zM6.5 28.5c-.3 0-.5-.1-.8-.1-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7.3 0 .6 0 .8-.1-.5-1.8-.8-3.7-.8-5.6 0-2 .3-3.9.8-5.6zM55.6 28.4c-.3 0-.6 0-.8.1.5 1.8.8 3.7.8 5.6 0 1.9-.3 3.8-.8 5.6.3 0 .5.1.8.1 3.1 0 5.7-2.5 5.7-5.7-.1-3.2-2.6-5.7-5.7-5.7zM47.6 34.1c0-6.3-5.1-11.3-11.3-11.3-2.1 0-4 .6-5.7 1.5-1.7-1-3.6-1.5-5.7-1.5-6.3 0-11.3 5.1-11.3 11.3 0 4.4 2.5 8.2 6.2 10.1-.4 1.1-.5 2.3-.5 3.5C19.3 54 24.4 59 30.6 59 36.9 59 42 53.9 42 47.7c0-1.2-.2-2.4-.5-3.5 3.6-1.9 6.1-5.7 6.1-10.1z"})),r||(r=o.createElement("circle",{cx:36.3,cy:37.5,r:1.1})),a||(a=o.createElement("circle",{cx:24.9,cy:37.5,r:1.1})))},d=()=>((0,o.useEffect)((()=>{const t=h.ZP.TRANSFORM,e=document.getElementById("dot"),n=document.querySelector(".hand"),s=Array.prototype.slice.apply(document.querySelectorAll(".handcard")),i=parseInt(window.getComputedStyle(n).width)/2;let r=null,a=null;const o=t=>{const e=((t,e)=>{const n=e.getBoundingClientRect(),s=(n.top+n.bottom)/2,i=(n.left+n.right)/2,r=t.getBoundingClientRect(),a=(r.top+r.bottom)/2,o=i-(r.left+r.right)/2,h=s-a;return{distance:Math.sqrt(Math.pow(o,2)+Math.pow(h,2)),tilt:-1*Math.atan(o/h)/Math.PI*180}})(t,n),s=e.tilt,o=e.distance- -300-i;(null===r||s<r)&&(r=s),(null===a||s>a)&&(a=s),t.style[h.ZP.TRANSFORM]="rotateZ("+s+"deg) translateY("+o+"px)",t.setAttribute("data-cardOffset",o)};s.forEach((t=>{o(t)}));const u=new h.ZP({hand:{range:[r,a],bounce:15},top:{range:[0,0],bounce:[100,160]}},{deceleration:34e-5});u.on("change",(i=>{let{pos:r}=i;e.style.bottom=-1.4*r.top+"px",e.style[t]="translateX("+2.3*r.hand+"px)",n.style[t]="rotateZ("+r.hand+"deg)",s.forEach((e=>{e.style[t]=e.style[t].split("translateY")[0]+" translateY("+(parseFloat(e.getAttribute("data-cardOffset"))+r.top)+"px)"}))})),u.connect("hand top",new c.J(n,{scale:[.3,.8]}))}),[]),o.createElement("div",null,o.createElement("p",null,"You can create a UI that responds to user input using two axes."),o.createElement("div",{id:"showcase"},o.createElement("div",{className:"showcase-item"},o.createElement("div",{className:"showcase-content"},o.createElement("div",{id:"movableCoordWrapper"},o.createElement("div",{className:"hand"},o.createElement("div",{className:"handcard"},o.createElement(l,null)),o.createElement("div",{className:"handcard"},o.createElement(l,null)),o.createElement("div",{className:"handcard"},o.createElement(l,null)),o.createElement("div",{className:"handcard"},o.createElement(l,null)),o.createElement("div",{className:"handcard"},o.createElement(l,null)),o.createElement("div",{className:"handcard"},o.createElement(l,null)),o.createElement("div",{className:"handcard"},o.createElement(l,null)))),o.createElement("div",{id:"dot",className:"movableDot"}))),o.createElement("div",{className:"codepen"}))))},4194:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>h,toc:()=>u});var s=n(7896),i=(n(2784),n(876)),r=n(7965);const a={title:"Cards in hands",id:"cardinhand",slug:"/cardinhand",sidebar_position:5},o=void 0,h={unversionedId:"demos/cardinhand",id:"demos/cardinhand",title:"Cards in hands",description:"",source:"@site/docs/demos/cardinhand.mdx",sourceDirName:"demos",slug:"/cardinhand",permalink:"/egjs-axes/docs/cardinhand",editUrl:"https://github.com/naver/egjs-axes/edit/master/packages/demo/docs/demos/cardinhand.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"Cards in hands",id:"cardinhand",slug:"/cardinhand",sidebar_position:5},sidebar:"demos",previous:{title:"3D Carousel",permalink:"/egjs-axes/docs/3dcarousel"},next:{title:"Pull to Refresh",permalink:"/egjs-axes/docs/pulltorefresh"}},c={},u=[],l={toc:u};function d(t){let{components:e,...n}=t;return(0,i.kt)("wrapper",(0,s.Z)({},l,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)(r.default,{mdxType:"CardInHand"}))}d.isMDXComponent=!0}}]);