"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[8927,1158],{981:(t,e,n)=>{n.d(e,{Z:()=>f});var s=n(1588),i=n(5362),a=n(8568);class r{constructor(t){this._axes=t}hold(t,e){const{roundPos:n}=this._getRoundPos(t);this._axes.trigger(new s.L("hold",{pos:n,input:e.input||null,inputEvent:e.event||null,isTrusted:!0}))}triggerRelease(t){const{roundPos:e,roundDepa:n}=this._getRoundPos(t.destPos,t.depaPos);t.destPos=e,t.depaPos=n,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new s.L("release",{...t,bounceRatio:this._getBounceRatio(e)}))}triggerChange(t,e,n,a){void 0===a&&(a=!1);const r=this.animationManager,o=r.axisManager,h=r.getEventInfo(),{roundPos:c,roundDepa:u}=this._getRoundPos(t,e),l=o.moveTo(c,u),d=(null==n?void 0:n.event)||(null==h?void 0:h.event)||null,g={pos:l.pos,delta:l.delta,bounceRatio:this._getBounceRatio(l.pos),holding:a,inputEvent:d,isTrusted:!!d,input:(null==n?void 0:n.input)||(null==h?void 0:h.input)||null,set:d?this._createUserControll(l.pos):()=>{}},_=new s.L("change",g);return this._axes.trigger(_),Object.keys(l.pos).forEach((t=>{const e=l.pos[t];(0,i.CV)(this._axes,t,e).current=e})),d&&o.set(g.set().destPos),!_.isCanceled()}triggerAnimationStart(t){const{roundPos:e,roundDepa:n}=this._getRoundPos(t.destPos,t.depaPos);t.destPos=e,t.depaPos=n,t.setTo=this._createUserControll(t.destPos,t.duration);const i=new s.L("animationStart",t);return this._axes.trigger(i),!i.isCanceled()}triggerAnimationEnd(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("animationEnd",{isTrusted:t}))}triggerFinish(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("finish",{isTrusted:t}))}setAnimationManager(t){this.animationManager=t}destroy(){this._axes.off()}_createUserControll(t,e){void 0===e&&(e=0);const n={destPos:{...t},duration:e};return(t,e)=>(t&&(n.destPos={...t}),void 0!==e&&(n.duration=e),n)}_getRoundPos(t,e){const n=this._axes.options.round;return{roundPos:(0,a.UF)(t,n),roundDepa:(0,a.UF)(e,n)}}_getBounceRatio(t){return this._axes.axisManager.map(t,((t,e)=>t<e.range[0]&&0!==e.bounce[0]?(e.range[0]-t)/e.bounce[0]:t>e.range[1]&&0!==e.bounce[1]?(t-e.range[1])/e.bounce[1]:0))}}class o{constructor(t){this._prevented=!1,this._options=t}isInterrupting(){return this._options.interruptable||this._prevented}isInterrupted(){return!this._options.interruptable&&this._prevented}setInterrupt(t){this._options.interruptable||(this._prevented=t)}}const h=(t,e,n,s)=>{let i=t;const a=[n[0]?e[0]:s?e[0]-s[0]:e[0],n[1]?e[1]:s?e[1]+s[1]:e[1]];return i=Math.max(a[0],i),i=Math.min(a[1],i),i},c=(t,e)=>t<e[0]||t>e[1],u=(t,e,n)=>n[1]&&t>e[1]||n[0]&&t<e[0],l=(t,e,n)=>{let s=t;const i=e[0],a=e[1],r=a-i;return n[1]&&t>a&&(s=(s-a)%r+i),n[0]&&t<i&&(s=(s-i)%r+a),s};class d{constructor(t){this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce(((t,e)=>(t[e]=this._axis[e].startPos,t)),{})}getDelta(t,e){const n=this.get(t);return(0,a.UI)(this.get(e),((t,e)=>t-n[e]))}get(t){return t&&Array.isArray(t)?t.reduce(((t,e)=>(e&&e in this._pos&&(t[e]=this._pos[e]),t)),{}):{...this._pos,...t||{}}}moveTo(t,e){void 0===e&&(e=this._pos);const n=(0,a.UI)(this._pos,((n,s)=>s in t&&s in e?t[s]-e[s]:0));return this.set(this.map(t,((t,e)=>e?l(t,e.range,e.circular):0))),{pos:{...this._pos},delta:n}}set(t){for(const e in t)e&&e in this._pos&&(this._pos[e]=t[e])}every(t,e){const n=this._axis;return(0,a.yW)(t,((t,s)=>e(t,n[s],s)))}filter(t,e){const n=this._axis;return(0,a.hX)(t,((t,s)=>e(t,n[s],s)))}map(t,e){const n=this._axis;return(0,a.UI)(t,((t,s)=>e(t,n[s],s)))}isOutside(t){return!this.every(t?this.get(t):this._pos,((t,e)=>!c(t,e.range)))}getAxisOptions(t){return this._axis[t]}setAxis(t){Object.keys(t).forEach((e=>{if(!this._axis[e])throw new Error("Axis "+e+" does not exist in Axes instance");this._axis[e]={...this._axis[e],...t[e]}})),this._complementOptions()}_complementOptions(){Object.keys(this._axis).forEach((t=>{this._axis[t]={range:[0,100],startPos:this._axis[t].range[0],bounce:[0,0],circular:[!1,!1],...this._axis[t]},["bounce","circular"].forEach((e=>{const n=this._axis,s=n[t][e];/string|number|boolean/.test(typeof s)&&(n[t][e]=[s,s])}))}))}}var g=n(1214);class _{constructor(t){let{options:e,interruptManager:n,eventManager:s,axisManager:i,animationManager:a}=t;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=e,this._interruptManager=n,this._eventManager=s,this._axisManager=i,this._animationManager=a}get(t){return this._axisManager.get(t.axes)}hold(t,e){if(this._interruptManager.isInterrupted()||!t.axes.length)return;const n={input:t,event:e};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(n),this._moveDistance||this._eventManager.hold(this._axisManager.get(),n),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}change(t,e,n,s){if(this._isStopped||!this._interruptManager.isInterrupting()||this._axisManager.every(n,(t=>0===t)))return;const i=e.srcEvent?e.srcEvent:e;if(i.__childrenAxesAlreadyChanged)return;let r,o=this._moveDistance||this._axisManager.get(t.axes);r=(0,a.UI)(o,((t,e)=>t+(n[e]||0))),this._moveDistance&&(this._moveDistance=this._axisManager.map(r,((t,e)=>{let{circular:n,range:s}=e;return n&&(n[0]||n[1])?l(t,s,n):t}))),this._isOutside&&this._axisManager.every(o,((t,e)=>!c(t,e.range)))&&(this._isOutside=!1),o=this._atOutside(o),r=this._atOutside(r),this.options.nested&&this._isEndofAxis(n,o,r)||(i.__childrenAxesAlreadyChanged=!0);const h={input:t,event:e};if(s){const t=this._animationManager.getDuration(r,o);this._animationManager.animateTo(r,t,h)}else{!this._eventManager.triggerChange(r,o,h,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}release(t,e,n,s){if(this._isStopped||!this._interruptManager.isInterrupting()||!this._moveDistance)return;const i=e.srcEvent?e.srcEvent:e;i.__childrenAxesAlreadyReleased&&(n=n.map((()=>0)));const r=this._axisManager.get(t.axes),o=this._axisManager.get(),c=this._animationManager.getDisplacement(n),u=(0,g.m)(t.axes,c);let l=this._axisManager.get(this._axisManager.map(u,((t,e,n)=>e.circular&&(e.circular[0]||e.circular[1])?r[n]+t:h(r[n]+t,e.range,e.circular,e.bounce))));i.__childrenAxesAlreadyReleased=!0;const d=this._animationManager.getDuration(l,r,s);0===d&&(l={...o});const _={depaPos:o,destPos:l,duration:d,delta:this._axisManager.getDelta(o,l),inputEvent:e,input:t,isTrusted:!0};this._eventManager.triggerRelease(_),this._moveDistance=null;const p=this._animationManager.getUserControl(_),v=(0,a.Dg)(p.destPos,o),m={input:t,event:e};v||0===p.duration?(v||this._eventManager.triggerChange(p.destPos,o,m,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(m):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(p.destPos,p.duration,m)}_atOutside(t){return this._isOutside?this._axisManager.map(t,((t,e)=>{const n=e.range[0]-e.bounce[0],s=e.range[1]+e.bounce[1];return t>s?s:t<n?n:t})):this._axisManager.map(t,((t,e)=>{const n=e.range[0],s=e.range[1],i=e.bounce,a=e.circular;return a&&(a[0]||a[1])?t:t<n?n-this._animationManager.interpolate(n-t,i[0]):t>s?s+this._animationManager.interpolate(t-s,i[1]):t}))}_isEndofAxis(t,e,n){return this._axisManager.every(e,((s,i,a)=>{return 0===t[a]||e[a]===n[a]&&(r=s,o=i.range,h=i.bounce,!(c=i.circular)[0]&&r===o[0]-h[0]||!c[1]&&r===o[1]+h[1]);var r,o,h,c}))}}var p=n(8362);const v=(t,e,n)=>Math.max(Math.min(t,n),e);class m extends class{constructor(t){let{options:e,interruptManager:n,eventManager:s,axisManager:i}=t;this._options=e,this.interruptManager=n,this.eventManager=s,this.axisManager=i,this.animationEnd=this.animationEnd.bind(this)}getDuration(t,e,n){let s;if(void 0!==n)s=n;else{const n=(0,a.UI)(e,((e,n)=>((t,e)=>{const n=Math.sqrt(t/e*2);return n<100?0:n})(Math.abs(e-t[n]),this._options.deceleration)));s=Object.keys(n).reduce(((t,e)=>Math.max(t,n[e])),-1/0)}return v(s,this._options.minimumDuration,this._options.maximumDuration)}getDisplacement(t){const e=Math.pow(t.reduce(((t,e)=>t+e*e),0),1/t.length),n=Math.abs(e/-this._options.deceleration);return t.map((t=>t/2*n))}stopAnimation(t){if(this._animateParam){const e=this.axisManager.get(),n=this.axisManager.map(e,((t,e)=>l(t,e.range,e.circular)));(0,a.yW)(n,((t,n)=>e[n]===t))||this.eventManager.triggerChange(n,e,t,!!t),this._animateParam=null,this._raf&&(0,a.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}}getEventInfo(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null}restore(t){const e=this.axisManager.get(),n=this.axisManager.map(e,((t,e)=>Math.min(e.range[1],Math.max(e.range[0],t))));this.stopAnimation(),this.animateTo(n,this.getDuration(e,n),t)}animationEnd(){const t=this.getEventInfo();this._animateParam=null;const e=this.axisManager.filter(this.axisManager.get(),((t,e)=>u(t,e.range,e.circular)));Object.keys(e).length>0&&this.setTo(this.axisManager.map(e,((t,e)=>l(t,e.range,e.circular)))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)}finish(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)}getUserControl(t){const e=t.setTo();return e.destPos=this.axisManager.get(e.destPos),e.duration=v(e.duration,this._options.minimumDuration,this._options.maximumDuration),e}animateTo(t,e,n){this.stopAnimation();const s=this._createAnimationParam(t,e,n),i={...s.depaPos},r=this.eventManager.triggerAnimationStart(s),o=this.getUserControl(s);if(!r&&this.axisManager.every(o.destPos,((t,e)=>u(t,e.range,e.circular)))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),r&&!(0,a.Dg)(o.destPos,i)){const t=(null==n?void 0:n.event)||null;this._animateLoop({depaPos:i,destPos:o.destPos,duration:o.duration,delta:this.axisManager.getDelta(i,o.destPos),isTrusted:!!t,inputEvent:t,input:(null==n?void 0:n.input)||null},(()=>this.animationEnd()))}}setTo(t,e){void 0===e&&(e=0);const n=Object.keys(t),s=this.axisManager.get(n);if((0,a.Dg)(t,s))return this;this.interruptManager.setInterrupt(!0);let i=(0,a.hX)(t,((t,e)=>s[e]!==t));return Object.keys(i).length?(i=this.axisManager.map(i,((t,e)=>{const{range:n,circular:s}=e;return s&&(s[0]||s[1])?t:h(t,n,s)})),(0,a.Dg)(i,s)||(e>0?this.animateTo(i,e):(this.stopAnimation(),this.eventManager.triggerChange(i),this.finish(!1))),this):this}setBy(t,e){return void 0===e&&(e=0),this.setTo((0,a.UI)(this.axisManager.get(Object.keys(t)),((e,n)=>e+t[n])),e)}_createAnimationParam(t,e,n){const s=this.axisManager.get(),i=t,a=(null==n?void 0:n.event)||null;return{depaPos:s,destPos:i,duration:v(e,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(s,i),inputEvent:a,input:(null==n?void 0:n.input)||null,isTrusted:!!a,done:this.animationEnd}}_animateLoop(t,e){if(t.duration){this._animateParam={...t,startTime:(new Date).getTime()};const n=(0,a.UI)(t.destPos,(t=>t));let s=this._initState(this._animateParam);const i=()=>{this._raf=null;const t=this._animateParam,r=this._getNextState(s),o=!this.eventManager.triggerChange(r.pos,s.pos);if(s=r,r.finished)return t.destPos=this._getFinalPos(t.destPos,n),(0,a.Dg)(t.destPos,this.axisManager.get(Object.keys(t.destPos)))||this.eventManager.triggerChange(t.destPos,r.pos),void e();o?this.finish(!1):this._raf=(0,a.U7)(i)};i()}else this.eventManager.triggerChange(t.destPos),e()}_getFinalPos(t,e){const n=1e-6;return(0,a.UI)(t,((t,s)=>{if(t>=e[s]-n&&t<=e[s]+n)return e[s];{const e=this._getRoundUnit(t,s);return(0,a.QV)(t,e)}}))}_getRoundUnit(t,e){const n=this._options.round;let s=null;if(!n){const n=this.axisManager.getAxisOptions(e);s=(0,a.Dw)(Math.max((0,a.il)(n.range[0]),(0,a.il)(n.range[1]),(0,a.il)(t)))}return s||n}}{constructor(){super(...arguments),this._useDuration=!0}interpolate(t,e){const n=this._easing(1e-5)/1e-5;return this._easing(t/(e*n))*e}updateAnimation(t){var e;const n=this._animateParam;if(!n)return;const s=(new Date).getTime()-n.startTime,i=(null==t?void 0:t.destPos)||n.destPos,a=null!=(e=null==t?void 0:t.duration)?e:n.duration;if(null!=t&&t.restart||a<=s)this.setTo(i,a-s);else{if(null!=t&&t.destPos){const t=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,n.delta=this.axisManager.getDelta(t,i),n.destPos=i}if(null!=t&&t.duration){const t=(s+this._durationOffset)/n.duration;this._durationOffset=t*a-s,n.duration=a}}}_initState(t){return this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,{pos:t.depaPos,easingPer:0,finished:!1}}_getNextState(t){const e=this._animateParam,n=t.pos,s=e.destPos,i=(0,a.UI)(n,((t,e)=>t<=s[e]?1:-1)),r=((new Date).getTime()-e.startTime+this._durationOffset)/e.duration,o=this._easing(r),h=this.axisManager.map(n,((t,a,h)=>{const c=r>=1?s[h]:t+e.delta[h]*(o-this._prevEasingPer)/(1-this._initialEasingPer),u=l(c,a.range,a.circular);if(c!==u){const t=i[h]*(a.range[1]-a.range[0]);s[h]-=t,n[h]-=t}return u}));return this._prevEasingPer=o,{pos:h,easingPer:o,finished:o>=1}}_easing(t){return t>1?1:this._options.easing(t)}}var E,x;const f=(0,i.kU)(((x=class extends s.Z{constructor(t,e,n){void 0===t&&(t={}),void 0===e&&(e={}),void 0===n&&(n={}),super(),this._inputs=[],this.axis=t,this.options={easing:t=>1-Math.pow(1-t,3),interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1,...e},Object.keys(n).forEach((t=>{this.axis[t].startPos=n[t]})),this.interruptManager=new o(this.options),this.axisManager=new d(this.axis),this.eventManager=new r(this),this.animationManager=new m(this),this.inputObserver=new _(this),this.eventManager.setAnimationManager(this.animationManager),this.eventManager.triggerChange(this.axisManager.get())}connect(t,e){let n;return n="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(e)&&this.disconnect(e),e.mapAxes(n),e.connect(this.inputObserver),this._inputs.push(e),this}disconnect(t){if(t){const e=this._inputs.indexOf(t);e>=0&&(this._inputs[e].disconnect(),this._inputs.splice(e,1))}else this._inputs.forEach((t=>t.disconnect())),this._inputs=[];return this}get(t){return this.axisManager.get(t)}setTo(t,e){return void 0===e&&(e=0),this.animationManager.setTo(t,e),this}setBy(t,e){return void 0===e&&(e=0),this.animationManager.setBy(t,e),this}setOptions(t){return this.options={...this.options,...t},this}setAxis(t){return this.axisManager.setAxis(t),this}stopAnimation(){return this.animationManager.stopAnimation(),this.animationManager.finish(!1),this}updateAnimation(t){return this.animationManager.updateAnimation(t),this}isBounceArea(t){return this.axisManager.isOutside(t)}destroy(){this.disconnect(),this.eventManager.destroy()}}).VERSION="#__VERSION__#",x.TRANSFORM=p.Up,x.DIRECTION_NONE=p.j9,x.DIRECTION_LEFT=p.AV,x.DIRECTION_RIGHT=p.EM,x.DIRECTION_UP=p.uO,x.DIRECTION_DOWN=p.C2,x.DIRECTION_HORIZONTAL=p.Xv,x.DIRECTION_VERTICAL=p.Et,x.DIRECTION_ALL=p.oM,E=x))||E},3987:(t,e,n)=>{let s;n.d(e,{u:()=>s}),s="undefined"==typeof window?{navigator:{userAgent:""}}:window},8362:(t,e,n)=>{n.d(e,{AV:()=>r,C2:()=>u,EM:()=>o,Et:()=>l,Up:()=>x,Xv:()=>h,YS:()=>p,ZL:()=>f,ab:()=>E,ej:()=>_,gk:()=>v,j9:()=>a,kZ:()=>m,oM:()=>d,sH:()=>g,uO:()=>c});var s=n(5161),i=n(3987);const a=1,r=2,o=4,h=6,c=8,u=16,l=24,d=30,g="left",_="right",p="middle",v=16,m=30,E="ontouchstart"in i.u&&"safari"===(0,s.ZP)().browser.name,x=(()=>{if("undefined"==typeof document)return"";const t=(document.head||document.getElementsByTagName("head")[0]).style,e=["transform","webkitTransform","msTransform","mozTransform"];for(let n=0,s=e.length;n<s;n++)if(e[n]in t)return e[n];return""})(),f={"user-select":"none","-webkit-user-drag":"none"}},8279:(t,e,n)=>{n.d(e,{ZP:()=>s});const s=n(981).Z},1214:(t,e,n)=>{n.d(e,{J:()=>v,m:()=>p});var s=n(8362),i=n(8568),a=n(3987);const r="ontouchstart"in a.u,o="PointerEvent"in a.u,h="MSPointerEvent"in a.u,c=o||h;class u{constructor(){this._stopContextMenu=t=>{t.preventDefault(),a.u.removeEventListener("contextmenu",this._stopContextMenu)}}extendEvent(t){const e=this.prevEvent,n=this._getCenter(t),a=e?this._getMovement(t):{x:0,y:0},r=e?this._getScale(t):1,o=e?(0,i._O)(n.x-e.center.x,n.y-e.center.y):0,h=e?e.deltaX+a.x:a.x,c=e?e.deltaY+a.y:a.y,u=a.x,l=a.y,d=this._latestInterval,g=Date.now(),_=d?g-d.timestamp:0;let p=e?e.velocityX:0,v=e?e.velocityY:0;return(!d||_>=s.gk)&&(d&&([p,v]=[(h-d.deltaX)/_,(c-d.deltaY)/_]),this._latestInterval={timestamp:g,deltaX:h,deltaY:c}),{srcEvent:t,scale:r,angle:o,center:n,deltaX:h,deltaY:c,offsetX:u,offsetY:l,velocityX:p,velocityY:v,preventSystemEvent:!0}}_getDistance(t,e){const n=e.clientX-t.clientX,s=e.clientY-t.clientY;return Math.sqrt(n*n+s*s)}_getButton(t){const e={1:s.sH,2:s.ej,4:s.YS},n=this._isTouchEvent(t)?s.sH:e[t.buttons];return n||null}_isTouchEvent(t){return t.type.indexOf("touch")>-1}_isValidButton(t,e){return e.indexOf(t)>-1}_preventMouseButton(t,e){e===s.ej?a.u.addEventListener("contextmenu",this._stopContextMenu):e===s.YS&&t.preventDefault()}}class l extends u{constructor(){super(...arguments),this.start=["mousedown"],this.move=["mousemove"],this.end=["mouseup"]}onEventStart(t,e){const n=this._getButton(t);return e&&!this._isValidButton(n,e)?null:(this._preventMouseButton(t,n),this.extendEvent(t))}onEventMove(t,e){return e&&!this._isValidButton(this._getButton(t),e)?null:this.extendEvent(t)}onEventEnd(){}onRelease(){this.prevEvent=null}getTouches(t,e){if(e){const n={1:s.sH,2:s.YS,3:s.ej};return this._isValidButton(n[t.which],e)&&-1===this.end.indexOf(t.type)?1:0}return 0}_getScale(){return 1}_getCenter(t){return{x:t.clientX,y:t.clientY}}_getMovement(t){const e=this.prevEvent.srcEvent;return{x:t.clientX-e.clientX,y:t.clientY-e.clientY}}}class d extends u{constructor(){super(...arguments),this.start=["touchstart"],this.move=["touchmove"],this.end=["touchend","touchcancel"]}onEventStart(t){return this._baseTouches=t.touches,this.extendEvent(t)}onEventMove(t){return this.extendEvent(t)}onEventEnd(t){this._baseTouches=t.touches}onRelease(){this.prevEvent=null,this._baseTouches=null}getTouches(t){return t.touches.length}_getScale(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])}_getCenter(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}}_getMovement(t){const e=this.prevEvent.srcEvent;return t.touches[0].identifier!==e.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].clientX-e.touches[0].clientX,y:t.touches[0].clientY-e.touches[0].clientY}}}class g extends u{constructor(){super(...arguments),this.start=o?["pointerdown"]:["MSPointerDown"],this.move=o?["pointermove"]:["MSPointerMove"],this.end=o?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],this._firstInputs=[],this._recentInputs=[]}onEventStart(t,e){const n=this._getButton(t);return e&&!this._isValidButton(n,e)?null:(this._preventMouseButton(t,n),this._updatePointerEvent(t),this.extendEvent(t))}onEventMove(t,e){return e&&!this._isValidButton(this._getButton(t),e)?null:(this._updatePointerEvent(t),this.extendEvent(t))}onEventEnd(t){this._removePointerEvent(t)}onRelease(){this.prevEvent=null,this._firstInputs=[],this._recentInputs=[]}getTouches(){return this._recentInputs.length}_getScale(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])}_getCenter(t){return{x:t.clientX,y:t.clientY}}_getMovement(t){const e=this.prevEvent.srcEvent;return t.pointerId!==e.pointerId?{x:0,y:0}:{x:t.clientX-e.clientX,y:t.clientY-e.clientY}}_updatePointerEvent(t){let e=!1;this._recentInputs.forEach(((n,s)=>{n.pointerId===t.pointerId&&(e=!0,this._recentInputs[s]=t)})),e||(this._firstInputs.push(t),this._recentInputs.push(t))}_removePointerEvent(t){this._firstInputs=this._firstInputs.filter((e=>e.pointerId!==t.pointerId)),this._recentInputs=this._recentInputs.filter((e=>e.pointerId!==t.pointerId))}}class _ extends u{constructor(){super(...arguments),this.start=["mousedown","touchstart"],this.move=["mousemove","touchmove"],this.end=["mouseup","touchend","touchcancel"]}onEventStart(t,e){const n=this._getButton(t);return this._isTouchEvent(t)&&(this._baseTouches=t.touches),e&&!this._isValidButton(n,e)?null:(this._preventMouseButton(t,n),this.extendEvent(t))}onEventMove(t,e){return e&&!this._isValidButton(this._getButton(t),e)?null:this.extendEvent(t)}onEventEnd(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)}onRelease(){this.prevEvent=null,this._baseTouches=null}getTouches(t){return this._isTouchEvent(t)?t.touches.length:0}_getScale(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale}_getCenter(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}}_getMovement(t){const e=this.prevEvent.srcEvent,[n,s]=[t,e].map((t=>this._isTouchEvent(t)?{id:t.touches[0].identifier,x:t.touches[0].clientX,y:t.touches[0].clientY}:{id:null,x:t.clientX,y:t.clientY}));return n.id===s.id?{x:n.x-s.x,y:n.y-s.y}:{x:0,y:0}}}const p=(t,e)=>e.reduce(((e,n,s)=>(t[s]&&(e[t[s]]=n),e)),{}),v=function(t){void 0===t&&(t=[]);let e=!1,n=!1,s=!1;return t.forEach((t=>{switch(t){case"mouse":n=!0;break;case"touch":e=r;break;case"pointer":s=c}})),s?new g:e&&n?new _:e?new d:n?new l:null}},9228:(t,e,n)=>{n.d(e,{J:()=>r});var s=n(8568),i=n(8362),a=n(1214);class r{constructor(t,e){this.axes=[],this.element=null,this._enabled=!1,this._activeEvent=null,this._atRightEdge=!1,this._rightEdgeTimer=0,this._dragged=!1,this._isOverThreshold=!1,this._preventClickWhenDragged=t=>{this._dragged&&(t.preventDefault(),t.stopPropagation()),this._dragged=!1},this._voidFunction=()=>{},this.element=(0,s.$)(t),this.options={inputType:["touch","mouse","pointer"],inputButton:[i.sH],scale:[1,1],thresholdAngle:45,threshold:0,preventClickOnDrag:!1,iOSEdgeSwipeThreshold:i.kZ,releaseOnScroll:!1,touchAction:null,...e},this._onPanstart=this._onPanstart.bind(this),this._onPanmove=this._onPanmove.bind(this),this._onPanend=this._onPanend.bind(this)}mapAxes(t){this._direction=(0,s.Mg)(!!t[0],!!t[1]),this.axes=t}connect(t){return this._activeEvent&&(this._detachElementEvent(),this._detachWindowEvent(this._activeEvent)),this._attachElementEvent(t),this._originalCssProps=(0,s.lH)(this.element,this.options,this._direction),this}disconnect(){return this._detachElementEvent(),this._detachWindowEvent(this._activeEvent),(0,s.fx)(this._originalCssProps)||(0,s.tF)(this.element,this._originalCssProps),this._direction=i.j9,this}destroy(){this.disconnect(),this.element=null}enable(){return this._enabled=!0,this}disable(){return this._enabled=!1,this}isEnabled(){return this._enabled}release(){const t=this._activeEvent,e=t.prevEvent;return t.onRelease(),this._observer.release(this,e,[0,0]),this._detachWindowEvent(t),this}_onPanstart(t){const e=this.options.inputButton,n=this._activeEvent,s=n.onEventStart(t,e);if(s&&this._enabled&&!(n.getTouches(t,e)>1)&&!1!==s.srcEvent.cancelable){const t=this.options.iOSEdgeSwipeThreshold;this._dragged=!1,this._isOverThreshold=!1,this._observer.hold(this,s),this._atRightEdge=i.ab&&s.center.x>window.innerWidth-t,this._attachWindowEvent(n),n.prevEvent=s}}_onPanmove(t){const{iOSEdgeSwipeThreshold:e,releaseOnScroll:n,inputButton:r,threshold:o,thresholdAngle:h}=this.options,c=this._activeEvent,u=c.onEventMove(t,r),l=c.getTouches(t,r);if(0===l||n&&u&&!u.srcEvent.cancelable)return void this._onPanend(t);if(!u||!this._enabled||l>1)return;const d=((t,e)=>{if(e<0||e>90)return i.j9;const n=Math.abs(t);return n>e&&n<180-e?i.Et:i.Xv})(u.angle,h),g=(0,s.gm)(i.Xv,this._direction,d),_=(0,s.gm)(i.Et,this._direction,d);if(c.prevEvent&&i.ab){if(u.center.x<0)return void this.release();if(this._atRightEdge){clearTimeout(this._rightEdgeTimer);u.deltaX<-e?this._atRightEdge=!1:this._rightEdgeTimer=window.setTimeout((()=>this.release()),100)}}const p=this._getDistance([u.deltaX,u.deltaY],[g,_]),v=this._getOffset([u.offsetX,u.offsetY],[g,_]),m=v.some((t=>0!==t));m&&(!1!==u.srcEvent.cancelable&&u.srcEvent.preventDefault(),u.srcEvent.stopPropagation()),u.preventSystemEvent=m,m&&(this._isOverThreshold||p>=o)&&(this._dragged=!0,this._isOverThreshold=!0,this._observer.change(this,u,(0,a.m)(this.axes,v))),c.prevEvent=u}_onPanend(t){const e=this.options.inputButton,n=this._activeEvent;if(n.onEventEnd(t),!this._enabled||0!==n.getTouches(t,e))return;this._detachWindowEvent(n),clearTimeout(this._rightEdgeTimer);const a=n.prevEvent,r=this._isOverThreshold?this._getOffset([Math.abs(a.velocityX)*(a.offsetX<0?-1:1),Math.abs(a.velocityY)*(a.offsetY<0?-1:1)],[(0,s.gm)(i.Xv,this._direction),(0,s.gm)(i.Et,this._direction)]):[0,0];n.onRelease(),this._observer.release(this,a,r)}_attachWindowEvent(t){null==t||t.move.forEach((t=>{window.addEventListener(t,this._onPanmove,{passive:!1})})),null==t||t.end.forEach((t=>{window.addEventListener(t,this._onPanend,{passive:!1})}))}_detachWindowEvent(t){null==t||t.move.forEach((t=>{window.removeEventListener(t,this._onPanmove)})),null==t||t.end.forEach((t=>{window.removeEventListener(t,this._onPanend)}))}_getOffset(t,e){const n=this.options.scale;return[e[0]?t[0]*n[0]:0,e[1]?t[1]*n[1]:0]}_getDistance(t,e){return Math.sqrt(Number(e[0])*Math.pow(t[0],2)+Number(e[1])*Math.pow(t[1],2))}_attachElementEvent(t){const e=(0,a.J)(this.options.inputType),n=this.element;if(e){if(!n)throw new Error("Element to connect input does not exist.");this._observer=t,this._enabled=!0,this._activeEvent=e,this.options.preventClickOnDrag&&n.addEventListener("click",this._preventClickWhenDragged,!0),e.start.forEach((t=>{n.addEventListener(t,this._onPanstart)})),e.move.forEach((t=>{n.addEventListener(t,this._voidFunction)}))}}_detachElementEvent(){const t=this._activeEvent,e=this.element;e&&(this.options.preventClickOnDrag&&e.removeEventListener("click",this._preventClickWhenDragged,!0),null==t||t.start.forEach((t=>{e.removeEventListener(t,this._onPanstart)})),null==t||t.move.forEach((t=>{e.removeEventListener(t,this._voidFunction)}))),this._enabled=!1,this._observer=null}}},8568:(t,e,n)=>{n.d(e,{$:()=>r,Dg:()=>_,Dw:()=>x,Mg:()=>P,QV:()=>v,U7:()=>c,UF:()=>m,UI:()=>l,Wx:()=>u,_O:()=>M,fx:()=>A,gm:()=>b,hX:()=>d,il:()=>E,lH:()=>y,tF:()=>T,yW:()=>g});var s=n(3987),i=n(8362);const a=t=>{const e=[];for(let n=0,s=t.length;n<s;n++)e.push(t[n]);return e},r=function(t,e){let n;if(void 0===e&&(e=!1),"string"==typeof t){if(t.match(/^<([a-z]+)\s*([^>]*)>/)){const e=document.createElement("div");e.innerHTML=t,n=a(e.childNodes)}else n=a(document.querySelectorAll(t));e||(n=n.length>=1?n[0]:void 0)}else t===s.u?n=t:"value"in t||"current"in t?n=t.value||t.current:!t.nodeName||1!==t.nodeType&&9!==t.nodeType?"jQuery"in s.u&&t instanceof jQuery||t.constructor.prototype.jquery?n=e?t.toArray():t.get(0):Array.isArray(t)&&(n=t.map((t=>r(t))),e||(n=n.length>=1?n[0]:void 0)):n=t;return n};let o=s.u.requestAnimationFrame||s.u.webkitRequestAnimationFrame,h=s.u.cancelAnimationFrame||s.u.webkitCancelAnimationFrame;if(o&&!h){const t={},e=o;o=n=>{const s=e((e=>{t[s]&&n(e)}));return t[s]=!0,s},h=e=>{delete t[e]}}else o&&h||(o=t=>s.u.setTimeout((()=>{t(s.u.performance&&s.u.performance.now&&s.u.performance.now()||(new Date).getTime())}),16),h=s.u.clearTimeout);const c=t=>o(t),u=t=>{h(t)},l=(t,e)=>{const n={};for(const s in t)s&&(n[s]=e(t[s],s));return n},d=(t,e)=>{const n={};for(const s in t)s&&e(t[s],s)&&(n[s]=t[s]);return n},g=(t,e)=>{for(const n in t)if(n&&!e(t[n],n))return!1;return!0},_=(t,e)=>g(t,((t,n)=>t===e[n])),p={},v=(t,e)=>(p[e]||(p[e]=f(e)),p[e](t)),m=(t,e)=>t&&e?l(t,((t,n)=>v(t,"number"==typeof e?e:e[n]))):t,E=t=>{if(!isFinite(t))return 0;const e=""+t;if(e.indexOf("e")>=0){let e=0,n=1;for(;Math.round(t*n)/n!==t;)n*=10,e++;return e}return e.indexOf(".")>=0?e.length-e.indexOf(".")-1:0},x=t=>1/Math.pow(10,t),f=t=>{const e=t<1?Math.pow(10,E(t)):1;return n=>0===t?0:Math.round(Math.round(n/t)*t*e)/e},M=(t,e)=>180*Math.atan2(e,t)/Math.PI,A=t=>{let e=!0;return Object.keys(i.ZL).forEach((n=>{t&&t[n]===i.ZL[n]||(e=!1)})),e},P=(t,e)=>t&&e?i.oM:t?i.Xv:e?i.Et:i.j9,b=(t,e,n)=>n?!!(e===i.oM||e&t&&n&t):!!(e&t),y=(t,e,n)=>{const s={[i.j9]:"auto",[i.oM]:"none",[i.Et]:"pan-x",[i.Xv]:"pan-y"},a={};if(t&&t.style){const r=e.touchAction?e.touchAction:s[n],o={...i.ZL,"touch-action":"none"===t.style["touch-action"]?"none":r};Object.keys(o).forEach((e=>{a[e]=t.style[e],t.style[e]=o[e]}))}return a},T=(t,e)=>{t&&t.style&&e&&Object.keys(e).forEach((n=>{t.style[n]=e[n]}))}},9009:(t,e,n)=>{n.r(e),n.d(e,{default:()=>d});var s=n(2784),i=n(8279),a=n(981),r=n(8568),o=n(1214),h=n(9228);class c extends h.J{constructor(t,e){super(t,e),this._prevQuadrant=null,this._lastDiff=0}mapAxes(t){this._direction=a.Z.DIRECTION_ALL,this.axes=t}_onPanstart(t){const e=this._activeEvent,n=e.onEventStart(t,this.options.inputButton);if(!n||!this.isEnabled())return;const s=this.element.getBoundingClientRect();this._observer.hold(this,n),this._attachWindowEvent(e),this._coefficientForDistanceToAngle=360/(s.width*Math.PI),this._rotateOrigin=[s.left+(s.width-1)/2,s.top+(s.height-1)/2],this._prevAngle=null,this._triggerChange(n),e.prevEvent=n}_onPanmove(t){const e=this._activeEvent,n=e.onEventMove(t,this.options.inputButton);n&&this.isEnabled()&&(!1!==n.srcEvent.cancelable&&n.srcEvent.preventDefault(),n.srcEvent.stopPropagation(),this._triggerChange(n),e.prevEvent=n)}_onPanend(t){const e=this._activeEvent;if(e.onEventEnd(t),!this.isEnabled())return;const n=e.prevEvent;this._triggerChange(n);const s=n.velocityX,i=n.velocityY,a=Math.sqrt(s*s+i*i)*(this._lastDiff>0?-1:1);e.onRelease(),this._observer.release(this,n,[a*this._coefficientForDistanceToAngle]),this._detachWindowEvent(e)}_triggerChange(t){const{x:e,y:n}=this._getPosFromOrigin(t.center.x,t.center.y),s=(0,r._O)(e,n),i=s<0?360+s:s,a=this._getQuadrant(t.center.x,t.center.y),h=this._getDifference(this._prevAngle,i,this._prevQuadrant,a);this._prevAngle=i,this._prevQuadrant=a,0!==h&&(this._lastDiff=h,this._observer.change(this,t,(0,o.m)(this.axes,[-h])))}_getDifference(t,e,n,s){let i;return i=null===t?0:1===n&&4===s?-t-(360-e):4===n&&1===s?360-t+e:e-t,i}_getPosFromOrigin(t,e){return{x:t-this._rotateOrigin[0],y:this._rotateOrigin[1]-e}}_getQuadrant(t,e){const{x:n,y:s}=this._getPosFromOrigin(t,e);let i=0;return n>=0&&s>=0?i=1:n<0&&s>=0?i=2:n<0&&s<0?i=3:n>=0&&s<0&&(i=4),i}}const u={fast:1e3,average:3e3,slow:1e4},l=new i.ZP({angle:{range:[0,360],circular:!0}},{minimumDuration:3e3,maximumDuration:3e3}),d=()=>{const[t,e]=(0,s.useState)(3e3),[i,a]=(0,s.useState)("average"),[r,o]=(0,s.useState)(!1),[h,d]=(0,s.useState)(!1);(0,s.useEffect)((()=>{const t=document.getElementById("point"),e=document.getElementById("rotate");let n=0;l.on("animationStart",(t=>{n=(new Date).getTime(),d(!0)})).on("change",(n=>{e.style.transform="rotate("+n.pos.angle+"deg)",t.style.transform="translateX("+3*Math.random()+"px)",t.style.transform="translateY("+3*Math.random()+"px)"})).on("finish",(t=>{d(!1)})),l.setTo({angle:210})}),[]);const g=()=>{o(!r),(t=>{if(t){const t=new c("#clock");l.connect("angle",t)}else l.disconnect()})(!r)},_=e=>{const n=l.axisManager.get().angle>e?e:e-360;l.setTo({angle:n},t)},p=t=>{const e=l.axisManager.get().angle>t?t:t-360;l.updateAnimation({destPos:{angle:e}})},v=n=>{const s=u[n];a(n),e(s),l.options.minimumDuration=s,l.options.maximumDuration=s,l.updateAnimation({duration:t,restart:!0})};return s.createElement("div",null,s.createElement("p",null,"You can control animation while it is playing."),s.createElement("h3",{style:{cursor:"pointer"}},s.createElement("input",{onChange:()=>g(),checked:r,type:"checkbox",id:"rotatepan"}),s.createElement("label",{htmlFor:"rotatepan"},"Enable RotatePanInput")),s.createElement("div",{className:"clock-wrapper"},s.createElement("div",{className:"options"},s.createElement("h3",null,"Animation Speed"),s.createElement("div",{className:"btn-group"},s.createElement("button",{className:"slow"===i?"slow active":"slow",onClick:()=>{v("slow")}},"Slow (10s)"),s.createElement("button",{className:"average"===i?"average active":"average",onClick:()=>{v("average")}},"Average (3s)"),s.createElement("button",{className:"fast"===i?"fast active":"fast",onClick:()=>{v("fast")}},"Fast (1s)")),s.createElement("h3",null,"Run Animation"),s.createElement("div",{className:"btn-group set"},s.createElement("button",{onClick:()=>{_(270)}},"6:00"),s.createElement("button",{onClick:()=>{_(180)}},"12:00"),s.createElement("button",{onClick:()=>{_(90)}},"18:00"),s.createElement("button",{onClick:()=>{_(0)}},"24:00")),s.createElement("h3",null,"Update Animation"),s.createElement("div",{className:h?"btn-group update active":"btn-group update"},s.createElement("button",{onClick:()=>{p(270)}},"6:00"),s.createElement("button",{onClick:()=>{p(180)}},"12:00"),s.createElement("button",{onClick:()=>{p(90)}},"18:00"),s.createElement("button",{onClick:()=>{p(0)}},"24:00"))),s.createElement("div",{id:"clock",className:"axes-target"},s.createElement("div",{id:"point"},s.createElement("img",{src:n(8090).Z,style:{width:"50px"}})),s.createElement("div",{id:"rotate",style:{transform:"rotate(210deg)"}}))),s.createElement("script",{src:"../../dist/axes.pkgd.js"}),s.createElement("script",{src:"js/schedule.js"}))}},6414:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>h,toc:()=>u});var s=n(7896),i=(n(2784),n(876)),a=n(9009);const r={title:"Schedule",id:"schedule",slug:"/schedule",sidebar_position:10},o=void 0,h={unversionedId:"demos/schedule",id:"demos/schedule",title:"Schedule",description:"",source:"@site/docs/demos/schedule.mdx",sourceDirName:"demos",slug:"/schedule",permalink:"/egjs-axes/docs/schedule",editUrl:"https://github.com/naver/egjs-axes/edit/master/packages/demo/docs/demos/schedule.mdx",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Schedule",id:"schedule",slug:"/schedule",sidebar_position:10},sidebar:"demos",previous:{title:"Bubble",permalink:"/egjs-axes/docs/bubble"},next:{title:"Nested Axes",permalink:"/egjs-axes/docs/nestedaxes"}},c={},u=[],l={toc:u};function d(t){let{components:e,...n}=t;return(0,i.kt)("wrapper",(0,s.Z)({},l,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)(a.default,{mdxType:"Schedule"}))}d.isMDXComponent=!0},8090:(t,e,n)=>{n.d(e,{Z:()=>s});const s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAQ+SURBVHhe7ZxJaxVBFIU7gm5cuXEh4i64FMEfIPgzBH/AAxEFFUXiRhFBgwNOycJEcEATFcURjfOEgorziIqzOKKC4/OcrhKiZHhJanycDw51q3nkderWre6+dfsVQgghhBBCCCGEEEIIIYQQQgghhBB1SYNtnVKtFBPRTIGGQ/yOoWhYD8d8qb/vegnNa1hbfETrBP5R58ABjWiOQ2PKA/XBL2gZ1AQHfC+POIAedw5O8B6a9aZXNzyBOlwOPvHiAMsi6LYx64KdGPxL1naGNwfgZKtoZkGfywN58xhaYky3+IwAchY6bMxs+QktwIR6a7pu8e0A3i20QW/KXp4cgXYb0z1eHYBZQ/ZBp0srPz5ArZC3ZdR3BNAJv9EshL6UB/LiPNRlJ5IXvDvAcg1aasxs4Nq/HIPPKPBGEAfYGbQGulxaedAOHTWmP0JFAHkPbYB+lL20eQ3NxcThrbRXgjnA/jO8IF8sD6QLl55VECeMd0JGAJ3wFI3HS5oTbkCdOFfePHgnqAMs26FTxkySDuiuMf3jJRvaH9VKMRbNA2hEeSAdmG4ej9n/yXT9EyMCyDNoJRQkzGuEa//UkINPojjAXpC3QvfLA/Hh+eyBjpW9gMSKAHId2gVxoyM2vO1kysH7bef/RHMAooDPA81Q7HQ1B70LOolzCk7MCKATOPNmml40uPavxrl8Nd2wRHUAwT++EU3M29I2nMM5awcnugMsi6F3xgwK967nGDMOqTjgDHTImMHg0tOM2e8129kfSTgAg8ALMXfOQg4GN9gPGjMeqUQAncC94/2m5x2WlmzGdz4y3Xgk4wDLbOiVMb1yB9pkzLgk5QDMyOdoeEH2+UDE548Z+K6gKYfeSC0CyA6I5Sy+2ILBD55y6I3kHIDBYUaSzwY+HowYYdxsSYYUI4Dsha4a0xnMOTHhllS5ZJIOQBQwRcHaUpfpam4xtuBvR0k59EaqEUAOQNw9cwWznclVZUTZEauVaqUYh+YKNKo8MHhYWt6I2e+0tNwFKUcAeQGtg5g2GCzfoPkpDj5J2gEYNN6zc+eMSbPBwOcJvqnDAtskST0CyE2o05gDhvWodCAv6kmS9DXgL7gWjETzEBpdHqgdFtdORiRxGUqSHCKASxFn8jRoIGWNXPOnpzz4JAsHWLiOM1taS56In2nH4Dt/p8s1OTmAT7LcNq9lPedytcKYaZONAzCbyQmIJeN9RQEdtQ0KVl44FHKKADqB6zmTaX2t6ywAZsZzKM8OwcjKAQQDewFNC9RTFPBYKz7DW9csyM4BliboljH/gbke1pxmQ5YOwAzn66+squte1sglh7/jkNWL4blGAGFFQ/eCLu4hZPc6bLYOwExniTtfpGN+n2+xs8LN2c/IhCLnCCB8m4XrPveQk0241TXVSjEJmmC7QgghhBBCCCGEEEIIIYQQQgghhBBCCBGZovgDm+LqZ03BQZQAAAAASUVORK5CYII="}}]);