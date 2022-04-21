"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1094],{3217:function(t,n,e){e.r(n);var i=e(7294),r=e(4010),a=e(4677),s=e(728);n.default=function(){return(0,i.useEffect)((function(){var t=document.querySelector(".bubbles");function n(){var n,e,i=document.createElement("div"),o=parseInt(80*Math.random()+60),u=parseInt(220*Math.random()+15,10),c=parseInt(220*Math.random()+15,10),h=parseInt(220*Math.random()+15,10),l=parseInt(85*Math.random()+5,10),f=parseInt(85*Math.random()+5,10);i.className="bubble",i.style.width=o+"px",i.style.height=o+"px",i.style.background="rgb("+u+","+c+","+h+")",i.style.left=l+"%",i.style.top=f+"%",t.appendChild(i),n=i,(e=new r.ZP({zoom:{range:[.5,3]}},{deceleration:.01},{zoom:1})).on("change",(function(t){var e=t.pos;n.style.transform="scale("+e.zoom+")"})),e.connect("zoom",new a.n(n)).connect("zoom",new s.H(n,{scale:.3}))}document.querySelector(".add").addEventListener("click",n),n()}),[]),i.createElement("div",{className:"demobox"},i.createElement("p",null,"You can create bubble that can zoom using pinch(touch) or wheel."),i.createElement("div",{id:"wrapper"},i.createElement("button",{className:"add"}),i.createElement("div",{className:"bubbles"})))}},1520:function(t,n,e){e.d(n,{Z:function(){return M}});var i=e(7326),r=e(4578),a=e(2921),s=function(t,n,e,i){var r=t,a=[e[0]?n[0]:i?n[0]-i[0]:n[0],e[1]?n[1]:i?n[1]+i[1]:n[1]];return r=Math.max(a[0],r),r=Math.min(a[1],r)},o=function(t,n){return t<n[0]||t>n[1]},u=function(t,n,e){return e[1]&&t>n[1]||e[0]&&t<n[0]},c=function(t,n,e){var i=t,r=n[0],a=n[1],s=a-r;return e[1]&&t>a&&(i=(i-a)%s+r),e[0]&&t<r&&(i=(i-r)%s+a),i},h=e(8519),l=function(t,n,e){return Math.max(Math.min(t,e),n)},f=function(){function t(t){var n=t.options,e=t.interruptManager,i=t.eventManager,r=t.axisManager;this._options=n,this.interruptManager=e,this.eventManager=i,this.axisManager=r,this.animationEnd=this.animationEnd.bind(this)}var n=t.prototype;return n.getDuration=function(t,n,e){var i,r=this;if(void 0!==e)i=e;else{var a=(0,h.UI)(n,(function(n,e){return function(t,n){var e=Math.sqrt(t/n*2);return e<100?0:e}(Math.abs(n-t[e]),r._options.deceleration)}));i=Object.keys(a).reduce((function(t,n){return Math.max(t,a[n])}),-1/0)}return l(i,this._options.minimumDuration,this._options.maximumDuration)},n.getDisplacement=function(t){var n=Math.pow(t.reduce((function(t,n){return t+n*n}),0),1/t.length),e=Math.abs(n/-this._options.deceleration);return t.map((function(t){return t/2*e}))},n.interpolate=function(t,n){var e=this.easing(1e-5)/1e-5;return this.easing(t/(n*e))*n},n.stopAnimation=function(t){if(this._animateParam){var n=this.axisManager.get(),e=this.axisManager.map(n,(function(t,n){return c(t,n.range,n.circular)}));(0,h.yW)(e,(function(t,e){return n[e]===t}))||this.eventManager.triggerChange(e,n,t,!!t),this._animateParam=null,this._raf&&(0,h.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}},n.getEventInfo=function(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null},n.restore=function(t){var n=this.axisManager.get(),e=this.axisManager.map(n,(function(t,n){return Math.min(n.range[1],Math.max(n.range[0],t))}));this.stopAnimation(),this.animateTo(e,this.getDuration(n,e),t)},n.animationEnd=function(){var t=this.getEventInfo();this._animateParam=null;var n=this.axisManager.filter(this.axisManager.get(),(function(t,n){return u(t,n.range,n.circular)}));Object.keys(n).length>0&&this.setTo(this.axisManager.map(n,(function(t,n){return c(t,n.range,n.circular)}))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)},n.finish=function(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)},n.getUserControl=function(t){var n=t.setTo();return n.destPos=this.axisManager.get(n.destPos),n.duration=l(n.duration,this._options.minimumDuration,this._options.maximumDuration),n},n.animateTo=function(t,n,e){var i=this;this.stopAnimation();var r=this._createAnimationParam(t,n,e),a=Object.assign({},r.depaPos),s=this.eventManager.triggerAnimationStart(r),o=this.getUserControl(r);if(!s&&this.axisManager.every(o.destPos,(function(t,n){return u(t,n.range,n.circular)}))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),s&&!(0,h.Dg)(o.destPos,a)){var c=(null==e?void 0:e.event)||null;this._animateLoop({depaPos:a,destPos:o.destPos,duration:o.duration,delta:this.axisManager.getDelta(a,o.destPos),isTrusted:!!c,inputEvent:c,input:(null==e?void 0:e.input)||null},(function(){return i.animationEnd()}))}},n.easing=function(t){return t>1?1:this._options.easing(t)},n.setTo=function(t,n){void 0===n&&(n=0);var e=Object.keys(t),i=this.axisManager.get(e);if((0,h.Dg)(t,i))return this;this.interruptManager.setInterrupt(!0);var r=(0,h.hX)(t,(function(t,n){return i[n]!==t}));return Object.keys(r).length?(r=this.axisManager.map(r,(function(t,n){var e=n.range,i=n.circular;return i&&(i[0]||i[1])?t:s(t,e,i)})),(0,h.Dg)(r,i)||(n>0?this.animateTo(r,n):(this.stopAnimation(),this.eventManager.triggerChange(r),this.finish(!1))),this):this},n.setBy=function(t,n){return void 0===n&&(n=0),this.setTo((0,h.UI)(this.axisManager.get(Object.keys(t)),(function(n,e){return n+t[e]})),n)},n.updateAnimation=function(t){var n=this._animateParam;if(n){var e=(new Date).getTime()-n.startTime,i=(null==t?void 0:t.destPos)||n.destPos,r=(null==t?void 0:t.duration)||n.duration;if(null!=t&&t.restart||r<=e)this.setTo(i,r-e);else{if(null!=t&&t.destPos){var a=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,n.delta=this.axisManager.getDelta(a,i),n.destPos=i}if(null!=t&&t.duration){var s=(e+this._durationOffset)/n.duration;this._durationOffset=s*r-e,n.duration=r}}}},n._createAnimationParam=function(t,n,e){var i=this.axisManager.get(),r=t,a=(null==e?void 0:e.event)||null;return{depaPos:i,destPos:r,duration:l(n,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(i,r),inputEvent:a,input:(null==e?void 0:e.input)||null,isTrusted:!!a,done:this.animationEnd}},n._animateLoop=function(t,n){var e=this;if(t.duration){var i=t.depaPos;this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,this._animateParam=Object.assign({},t,{startTime:(new Date).getTime()});var r=(0,h.UI)(i,(function(n,e){return n<=t.destPos[e]?1:-1})),a=(0,h.UI)(t.destPos,(function(t){return t}));!function t(){var s=e._animateParam,o=((new Date).getTime()-s.startTime+e._durationOffset)/s.duration,u=e.easing(o);e._raf=null;var l=e.axisManager.map(i,(function(t,n,a){var h=o>=1?s.destPos[a]:t+s.delta[a]*(u-e._prevEasingPer)/(1-e._initialEasingPer),l=c(h,n.range,n.circular);if(h!==l){var f=r[a]*(n.range[1]-n.range[0]);s.destPos[a]-=f,i[a]-=f}return l})),f=!e.eventManager.triggerChange(l,i);if(i=l,e._prevEasingPer=u,u>=1)return s.destPos=e._getFinalPos(s.destPos,a),(0,h.Dg)(s.destPos,e.axisManager.get(Object.keys(s.destPos)))||e.eventManager.triggerChange(s.destPos,i),void n();f?e.finish(!1):e._raf=(0,h.U7)(t)}()}else this.eventManager.triggerChange(t.destPos),n()},n._getFinalPos=function(t,n){var e=this,i=1e-6;return(0,h.UI)(t,(function(t,r){if(t>=n[r]-i&&t<=n[r]+i)return n[r];var a=e._getRoundUnit(t,r);return(0,h.QV)(t,a)}))},n._getRoundUnit=function(t,n){var e=this._options.round,i=null;if(!e){var r=this.axisManager.getAxisOptions(n);i=(0,h.Dw)(Math.max((0,h.il)(r.range[0]),(0,h.il)(r.range[1]),(0,h.il)(t)))}return i||e},t}(),v=function(){function t(t){this._axes=t}var n=t.prototype;return n.hold=function(t,n){var e=this._getRoundPos(t).roundPos;this._axes.trigger(new a.L("hold",{pos:e,input:n.input||null,inputEvent:n.event||null,isTrusted:!0}))},n.triggerRelease=function(t){var n=this._getRoundPos(t.destPos,t.depaPos),e=n.roundPos,i=n.roundDepa;t.destPos=e,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new a.L("release",Object.assign({},t,{bounceRatio:this._getBounceRatio(e)})))},n.triggerChange=function(t,n,e,i){void 0===i&&(i=!1);var r=this.animationManager,s=r.axisManager,o=r.getEventInfo(),u=this._getRoundPos(t,n),c=u.roundPos,h=u.roundDepa,l=s.moveTo(c,h),f=(null==e?void 0:e.event)||(null==o?void 0:o.event)||null,v={pos:l.pos,delta:l.delta,bounceRatio:this._getBounceRatio(l.pos),holding:i,inputEvent:f,isTrusted:!!f,input:(null==e?void 0:e.input)||(null==o?void 0:o.input)||null,set:f?this._createUserControll(l.pos):function(){}},g=new a.L("change",v);return this._axes.trigger(g),f&&s.set(v.set().destPos),!g.isCanceled()},n.triggerAnimationStart=function(t){var n=this._getRoundPos(t.destPos,t.depaPos),e=n.roundPos,i=n.roundDepa;t.destPos=e,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration);var r=new a.L("animationStart",t);return this._axes.trigger(r),!r.isCanceled()},n.triggerAnimationEnd=function(t){void 0===t&&(t=!1),this._axes.trigger(new a.L("animationEnd",{isTrusted:t}))},n.triggerFinish=function(t){void 0===t&&(t=!1),this._axes.trigger(new a.L("finish",{isTrusted:t}))},n.setAnimationManager=function(t){this.animationManager=t},n.destroy=function(){this._axes.off()},n._createUserControll=function(t,n){void 0===n&&(n=0);var e={destPos:Object.assign({},t),duration:n};return function(t,n){return t&&(e.destPos=Object.assign({},t)),void 0!==n&&(e.duration=n),e}},n._getRoundPos=function(t,n){var e=this._axes.options.round;return{roundPos:(0,h.UF)(t,e),roundDepa:(0,h.UF)(n,e)}},n._getBounceRatio=function(t){return this._axes.axisManager.map(t,(function(t,n){return t<n.range[0]&&0!==n.bounce[0]?(n.range[0]-t)/n.bounce[0]:t>n.range[1]&&0!==n.bounce[1]?(t-n.range[1])/n.bounce[1]:0}))},t}(),g=function(){function t(t){this._prevented=!1,this._options=t}var n=t.prototype;return n.isInterrupting=function(){return this._options.interruptable||this._prevented},n.isInterrupted=function(){return!this._options.interruptable&&this._prevented},n.setInterrupt=function(t){this._options.interruptable||(this._prevented=t)},t}(),d=function(){function t(t){var n=this;this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce((function(t,e){return t[e]=n._axis[e].range[0],t}),{})}var n=t.prototype;return n.getDelta=function(t,n){var e=this.get(t);return(0,h.UI)(this.get(n),(function(t,n){return t-e[n]}))},n.get=function(t){var n=this;return t&&Array.isArray(t)?t.reduce((function(t,e){return e&&e in n._pos&&(t[e]=n._pos[e]),t}),{}):Object.assign({},this._pos,t||{})},n.moveTo=function(t,n){void 0===n&&(n=this._pos);var e=(0,h.UI)(this._pos,(function(e,i){return i in t&&i in n?t[i]-n[i]:0}));return this.set(this.map(t,(function(t,n){return n?c(t,n.range,n.circular):0}))),{pos:Object.assign({},this._pos),delta:e}},n.set=function(t){for(var n in t)n&&n in this._pos&&(this._pos[n]=t[n])},n.every=function(t,n){var e=this._axis;return(0,h.yW)(t,(function(t,i){return n(t,e[i],i)}))},n.filter=function(t,n){var e=this._axis;return(0,h.hX)(t,(function(t,i){return n(t,e[i],i)}))},n.map=function(t,n){var e=this._axis;return(0,h.UI)(t,(function(t,i){return n(t,e[i],i)}))},n.isOutside=function(t){return!this.every(t?this.get(t):this._pos,(function(t,n){return!o(t,n.range)}))},n.getAxisOptions=function(t){return this._axis[t]},n._complementOptions=function(){var t=this;Object.keys(this._axis).forEach((function(n){t._axis[n]=Object.assign({},{range:[0,100],bounce:[0,0],circular:[!1,!1]},t._axis[n]),["bounce","circular"].forEach((function(e){var i=t._axis,r=i[n][e];/string|number|boolean/.test(typeof r)&&(i[n][e]=[r,r])}))}))},t}(),p=e(7242),_=function(){function t(t){var n=t.options,e=t.interruptManager,i=t.eventManager,r=t.axisManager,a=t.animationManager;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=n,this._interruptManager=e,this._eventManager=i,this._axisManager=r,this._animationManager=a}var n=t.prototype;return n.get=function(t){return this._axisManager.get(t.axes)},n.hold=function(t,n){if(!this._interruptManager.isInterrupted()&&t.axes.length){var e={input:t,event:n};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(e),this._moveDistance||this._eventManager.hold(this._axisManager.get(),e),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}},n.change=function(t,n,e,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&!this._axisManager.every(e,(function(t){return 0===t}))){var r=n.srcEvent?n.srcEvent:n;if(!r.__childrenAxesAlreadyChanged){var a,s=this._moveDistance||this._axisManager.get(t.axes);a=(0,h.UI)(s,(function(t,n){return t+(e[n]||0)})),this._moveDistance&&(this._moveDistance=this._axisManager.map(a,(function(t,n){var e=n.circular,i=n.range;return e&&(e[0]||e[1])?c(t,i,e):t}))),this._isOutside&&this._axisManager.every(s,(function(t,n){return!o(t,n.range)}))&&(this._isOutside=!1),s=this._atOutside(s),a=this._atOutside(a),this.options.nested&&this._isEndofAxis(e,s,a)||(r.__childrenAxesAlreadyChanged=!0);var u={input:t,event:n};if(i){var l=this._animationManager.getDuration(a,s);this._animationManager.animateTo(a,l,u)}else{!this._eventManager.triggerChange(a,s,u,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}}},n.release=function(t,n,e,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&this._moveDistance){var r=n.srcEvent?n.srcEvent:n;r.__childrenAxesAlreadyReleased&&(e=e.map((function(){return 0})));var a=this._axisManager.get(t.axes),o=this._axisManager.get(),u=this._animationManager.getDisplacement(e),c=(0,p.m)(t.axes,u),l=this._axisManager.get(this._axisManager.map(c,(function(t,n,e){return n.circular&&(n.circular[0]||n.circular[1])?a[e]+t:s(a[e]+t,n.range,n.circular,n.bounce)})));r.__childrenAxesAlreadyReleased=!0;var f=this._animationManager.getDuration(l,a,i);0===f&&(l=Object.assign({},o));var v={depaPos:o,destPos:l,duration:f,delta:this._axisManager.getDelta(o,l),inputEvent:n,input:t,isTrusted:!0};this._eventManager.triggerRelease(v),this._moveDistance=null;var g=this._animationManager.getUserControl(v),d=(0,h.Dg)(g.destPos,o),_={input:t,event:n};d||0===g.duration?(d||this._eventManager.triggerChange(g.destPos,o,_,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(_):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(g.destPos,g.duration,_)}},n._atOutside=function(t){var n=this;return this._isOutside?this._axisManager.map(t,(function(t,n){var e=n.range[0]-n.bounce[0],i=n.range[1]+n.bounce[1];return t>i?i:t<e?e:t})):this._axisManager.map(t,(function(t,e){var i=e.range[0],r=e.range[1],a=e.bounce,s=e.circular;return s&&(s[0]||s[1])?t:t<i?i-n._animationManager.interpolate(i-t,a[0]):t>r?r+n._animationManager.interpolate(t-r,a[1]):t}))},n._isEndofAxis=function(t,n,e){return this._axisManager.every(n,(function(i,r,a){return 0===t[a]||n[a]===e[a]&&(s=i,o=r.range,u=r.bounce,!(c=r.circular)[0]&&s===o[0]-u[0]||!c[1]&&s===o[1]+u[1]);var s,o,u,c}))},t}(),m=e(1229),E=function(t){function n(n,e,r){var a;return void 0===n&&(n={}),void 0===e&&(e={}),void 0===r&&(r=null),(a=t.call(this)||this)._inputs=[],a.axis=n,a.options=Object.assign({},{easing:function(t){return 1-Math.pow(1-t,3)},interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1},e),a.interruptManager=new g(a.options),a.axisManager=new d(a.axis),a.eventManager=new v((0,i.Z)(a)),a.animationManager=new f((0,i.Z)(a)),a.inputObserver=new _((0,i.Z)(a)),a.eventManager.setAnimationManager(a.animationManager),r&&a.eventManager.triggerChange(r),a}(0,r.Z)(n,t);var e=n.prototype;return e.connect=function(t,n){var e;return e="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(n)&&this.disconnect(n),n.mapAxes(e),n.connect(this.inputObserver),this._inputs.push(n),this},e.disconnect=function(t){if(t){var n=this._inputs.indexOf(t);n>=0&&(this._inputs[n].disconnect(),this._inputs.splice(n,1))}else this._inputs.forEach((function(t){return t.disconnect()})),this._inputs=[];return this},e.get=function(t){return this.axisManager.get(t)},e.setTo=function(t,n){return void 0===n&&(n=0),this.animationManager.setTo(t,n),this},e.setBy=function(t,n){return void 0===n&&(n=0),this.animationManager.setBy(t,n),this},e.stopAnimation=function(){return this.animationManager.stopAnimation(),this},e.updateAnimation=function(t){return this.animationManager.updateAnimation(t),this},e.isBounceArea=function(t){return this.axisManager.isOutside(t)},e.destroy=function(){this.disconnect(),this.eventManager.destroy()},n}(a.Z);E.VERSION="#__VERSION__#",E.TRANSFORM=m.Up,E.DIRECTION_NONE=m.j9,E.DIRECTION_LEFT=m.AV,E.DIRECTION_RIGHT=m.EM,E.DIRECTION_UP=m.uO,E.DIRECTION_DOWN=m.C2,E.DIRECTION_HORIZONTAL=m.Xv,E.DIRECTION_VERTICAL=m.Et,E.DIRECTION_ALL=m.oM;var M=E},9854:function(t,n,e){var i;e.d(n,{u:function(){return i}}),i="undefined"==typeof window?{navigator:{userAgent:""}}:window},1229:function(t,n,e){e.d(n,{AV:function(){return s},C2:function(){return h},EM:function(){return o},Et:function(){return l},Up:function(){return d},Xv:function(){return u},aE:function(){return p},ab:function(){return g},j9:function(){return a},kZ:function(){return v},oM:function(){return f},uO:function(){return c}});var i=e(3308),r=e(9854),a=1,s=2,o=4,u=6,c=8,h=16,l=24,f=30,v=30,g="ontouchstart"in r.u&&"safari"===(0,i.Z)().browser.name,d=function(){if("undefined"==typeof document)return"";for(var t=(document.head||document.getElementsByTagName("head")[0]).style,n=["transform","webkitTransform","msTransform","mozTransform"],e=0,i=n.length;e<i;e++)if(n[e]in t)return n[e];return""}(),p={"touch-action":"none","user-select":"none","-webkit-user-drag":"none"}},4010:function(t,n,e){var i=e(1520);n.ZP=i.Z},7242:function(t,n,e){e.d(n,{J:function(){return p},m:function(){return d}});var i=e(4578),r=e(8519),a=e(9854),s="ontouchstart"in a.u,o="PointerEvent"in a.u,u="MSPointerEvent"in a.u,c=o||u,h=function(){function t(){}var n=t.prototype;return n.extendEvent=function(t){var n=this.prevEvent,e=this._getCenter(t),i=n?this._getMovement(t):{x:0,y:0},a=n?this._getScale(t):1,s=n?(0,r._O)(e.x-n.center.x,e.y-n.center.y):0,o=n?n.deltaX+i.x:i.x,u=n?n.deltaY+i.y:i.y,c=n?o-n.deltaX:0,h=n?u-n.deltaY:0,l=n?t.timeStamp-n.srcEvent.timeStamp:0;return{srcEvent:t,scale:a,angle:s,center:e,deltaX:o,deltaY:u,offsetX:c,offsetY:h,velocityX:n&&0!==l?c/l:0,velocityY:n&&0!==l?h/l:0,preventSystemEvent:!0}},n._getDistance=function(t,n){var e=n.clientX-t.clientX,i=n.clientY-t.clientY;return Math.sqrt(e*e+i*i)},t}(),l=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["mousedown"],n.move=["mousemove"],n.end=["mouseup"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t){return this.extendEvent(t)},e.onEventMove=function(t){return this.extendEvent(t)},e.onEventEnd=function(){},e.getTouches=function(){return 0},e._getScale=function(){return 1},e._getCenter=function(t){return{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return{x:t.pageX-n.pageX,y:t.pageY-n.pageY}},n}(h),f=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["touchstart"],n.move=["touchmove"],n.end=["touchend","touchcancel"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t){return this._baseTouches=t.touches,this.extendEvent(t)},e.onEventMove=function(t){return this.extendEvent(t)},e.onEventEnd=function(t){this._baseTouches=t.touches},e.getTouches=function(t){return t.touches.length},e._getScale=function(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])},e._getCenter=function(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return t.touches[0].identifier!==n.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].pageX-n.touches[0].pageX,y:t.touches[0].pageY-n.touches[0].pageY}},n}(h),v=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=o?["pointerdown"]:["MSPointerDown"],n.move=o?["pointermove"]:["MSPointerMove"],n.end=o?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],n._firstInputs=[],n._recentInputs=[],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t){return this._updatePointerEvent(t),this.extendEvent(t)},e.onEventMove=function(t){return this._updatePointerEvent(t),this.extendEvent(t)},e.onEventEnd=function(t){this._removePointerEvent(t)},e.getTouches=function(){return this._recentInputs.length},e._getScale=function(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])},e._getCenter=function(t){return{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return t.pointerId!==n.pointerId?{x:0,y:0}:{x:t.pageX-n.pageX,y:t.pageY-n.pageY}},e._updatePointerEvent=function(t){var n=this,e=!1;this._recentInputs.forEach((function(i,r){i.pointerId===t.pointerId&&(e=!0,n._recentInputs[r]=t)})),e||(this._firstInputs.push(t),this._recentInputs.push(t))},e._removePointerEvent=function(t){this._firstInputs=this._firstInputs.filter((function(n){return n.pointerId!==t.pointerId})),this._recentInputs=this._recentInputs.filter((function(n){return n.pointerId!==t.pointerId}))},n}(h),g=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["mousedown","touchstart"],n.move=["mousemove","touchmove"],n.end=["mouseup","touchend","touchcancel"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t){return this._isTouchEvent(t)&&(this._baseTouches=t.touches),this.extendEvent(t)},e.onEventMove=function(t){return this.extendEvent(t)},e.onEventEnd=function(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)},e.getTouches=function(t){return this._isTouchEvent(t)?t.touches.length:0},e._getScale=function(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale},e._getCenter=function(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this,e=this.prevEvent.srcEvent,i=[t,e].map((function(e){return n._isTouchEvent(t)?{id:e.touches[0].identifier,x:e.touches[0].pageX,y:e.touches[0].pageY}:{id:null,x:e.pageX,y:e.pageY}})),r=i[0],a=i[1];return r.id===a.id?{x:r.x-a.x,y:r.y-a.y}:{x:0,y:0}},e._isTouchEvent=function(t){return t.hasOwnProperty("touches")},n}(h),d=function(t,n){return n.reduce((function(n,e,i){return t[i]&&(n[t[i]]=e),n}),{})},p=function(t){void 0===t&&(t=[]);var n=!1,e=!1,i=!1;return t.forEach((function(t){switch(t){case"mouse":e=!0;break;case"touch":n=s;break;case"pointer":i=c}})),i?new v:n&&e?new g:n?new f:e?new l:null}},4677:function(t,n,e){e.d(n,{n:function(){return s}});var i=e(8519),r=e(1229),a=e(7242),s=function(){function t(t,n){this.axes=[],this.element=null,this._pinchFlag=!1,this._enabled=!1,this._activeInput=null,this.element=(0,i.$)(t),this.options=Object.assign({scale:1,threshold:0,inputType:["touch","pointer"]},n),this._onPinchStart=this._onPinchStart.bind(this),this._onPinchMove=this._onPinchMove.bind(this),this._onPinchEnd=this._onPinchEnd.bind(this)}var n=t.prototype;return n.mapAxes=function(t){this.axes=t},n.connect=function(t){return this._activeInput&&this._detachEvent(),this._attachEvent(t),this._originalCssProps=(0,i.lH)(this.element),this},n.disconnect=function(){return this._detachEvent(),this._originalCssProps!==r.aE&&(0,i.lH)(this.element,this._originalCssProps),this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onPinchStart=function(t){if(this._activeInput.onEventStart(t),this._enabled&&2===this._activeInput.getTouches(t)){this._baseValue=this._observer.get(this)[this.axes[0]],this._observer.hold(this,t),this._pinchFlag=!0;var n=this._activeInput.extendEvent(t);this._activeInput.prevEvent=n}},n._onPinchMove=function(t){if(this._activeInput.onEventMove(t),this._pinchFlag&&this._enabled&&2===this._activeInput.getTouches(t)){var n=this._activeInput.extendEvent(t),e=this._getOffset(n.scale,this._activeInput.prevEvent.scale);this._observer.change(this,t,(0,a.m)(this.axes,[e])),this._activeInput.prevEvent=n}},n._onPinchEnd=function(t){this._activeInput.onEventEnd(t),!this._pinchFlag||!this._enabled||this._activeInput.getTouches(t)>=2||(this._observer.release(this,t,[0],0),this._baseValue=null,this._pinchFlag=!1,this._activeInput.prevEvent=null)},n._attachEvent=function(t){var n=this,e=(0,a.J)(this.options.inputType);if(!e)throw new Error("There is currently no inputType available for current device. There must be at least one available inputType.");this._observer=t,this._enabled=!0,this._activeInput=e,null==e||e.start.forEach((function(t){n.element.addEventListener(t,n._onPinchStart,!1)})),null==e||e.move.forEach((function(t){n.element.addEventListener(t,n._onPinchMove,!1)})),null==e||e.end.forEach((function(t){n.element.addEventListener(t,n._onPinchEnd,!1)}))},n._detachEvent=function(){var t=this,n=this._activeInput;null==n||n.start.forEach((function(n){t.element.removeEventListener(n,t._onPinchStart,!1)})),null==n||n.move.forEach((function(n){t.element.removeEventListener(n,t._onPinchMove,!1)})),null==n||n.end.forEach((function(n){t.element.removeEventListener(n,t._onPinchEnd,!1)})),this._enabled=!1,this._observer=null},n._getOffset=function(t,n){return void 0===n&&(n=1),this._baseValue*(t-n)*this.options.scale},t}()},728:function(t,n,e){e.d(n,{H:function(){return a}});var i=e(8519),r=e(7242),a=function(){function t(t,n){this.axes=[],this.element=null,this._enabled=!1,this._holding=!1,this._timer=null,this.element=(0,i.$)(t),this.options=Object.assign({},{scale:1,releaseDelay:300,useNormalized:!0},n),this._onWheel=this._onWheel.bind(this)}var n=t.prototype;return n.mapAxes=function(t){this.axes=t},n.connect=function(t){return this._detachEvent(),this._attachEvent(t),this},n.disconnect=function(){return this._detachEvent(),this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onWheel=function(t){var n=this;if(this._enabled&&(t.preventDefault(),0!==t.deltaY)){this._holding||(this._observer.hold(this,t),this._holding=!0);var e=(t.deltaY>0?-1:1)*this.options.scale*(this.options.useNormalized?1:Math.abs(t.deltaY));this._observer.change(this,t,(0,r.m)(this.axes,[e]),!0),clearTimeout(this._timer),this._timer=setTimeout((function(){n._holding&&(n._holding=!1,n._observer.release(n,t,[0]))}),this.options.releaseDelay)}},n._attachEvent=function(t){this._observer=t,this.element.addEventListener("wheel",this._onWheel),this._enabled=!0},n._detachEvent=function(){this.element.removeEventListener("wheel",this._onWheel),this._enabled=!1,this._observer=null,this._timer&&(clearTimeout(this._timer),this._timer=null)},t}()},8519:function(t,n,e){e.d(n,{$:function(){return s},Dg:function(){return p},Dw:function(){return x},QV:function(){return m},U7:function(){return l},UF:function(){return E},UI:function(){return v},Wx:function(){return f},_O:function(){return y},hX:function(){return g},il:function(){return M},lH:function(){return P},yW:function(){return d}});var i=e(9854),r=e(1229),a=function(t){for(var n=[],e=0,i=t.length;e<i;e++)n.push(t[e]);return n},s=function t(n,e){var r;if(void 0===e&&(e=!1),"string"==typeof n){if(n.match(/^<([a-z]+)\s*([^>]*)>/)){var s=document.createElement("div");s.innerHTML=n,r=a(s.childNodes)}else r=a(document.querySelectorAll(n));e||(r=r.length>=1?r[0]:void 0)}else n===i.u?r=n:!n.nodeName||1!==n.nodeType&&9!==n.nodeType?"jQuery"in i.u&&n instanceof jQuery||n.constructor.prototype.jquery?r=e?n.toArray():n.get(0):Array.isArray(n)&&(r=n.map((function(n){return t(n)})),e||(r=r.length>=1?r[0]:void 0)):r=n;return r},o=i.u.requestAnimationFrame||i.u.webkitRequestAnimationFrame,u=i.u.cancelAnimationFrame||i.u.webkitCancelAnimationFrame;if(o&&!u){var c={},h=o;o=function(t){var n=h((function(e){c[n]&&t(e)}));return c[n]=!0,n},u=function(t){delete c[t]}}else o&&u||(o=function(t){return i.u.setTimeout((function(){t(i.u.performance&&i.u.performance.now&&i.u.performance.now()||(new Date).getTime())}),16)},u=i.u.clearTimeout);var l=function(t){return o(t)},f=function(t){u(t)},v=function(t,n){var e={};for(var i in t)i&&(e[i]=n(t[i],i));return e},g=function(t,n){var e={};for(var i in t)i&&n(t[i],i)&&(e[i]=t[i]);return e},d=function(t,n){for(var e in t)if(e&&!n(t[e],e))return!1;return!0},p=function(t,n){return d(t,(function(t,e){return t===n[e]}))},_={},m=function(t,n){return _[n]||(_[n]=b(n)),_[n](t)},E=function(t,n){return t&&n?v(t,(function(t,e){return m(t,"number"==typeof n?n:n[e])})):t},M=function(t){if(!isFinite(t))return 0;var n=""+t;if(n.indexOf("e")>=0){for(var e=0,i=1;Math.round(t*i)/i!==t;)i*=10,e++;return e}return n.indexOf(".")>=0?n.length-n.indexOf(".")-1:0},x=function(t){return 1/Math.pow(10,t)},b=function(t){var n=t<1?Math.pow(10,M(t)):1;return function(e){return 0===t?0:Math.round(Math.round(e/t)*t*n)/n}},y=function(t,n){return 180*Math.atan2(n,t)/Math.PI},P=function(t,n){var e={};if(t&&t.style){var i=n||r.aE;Object.keys(i).forEach((function(n){e[n]=t.style[n],t.style[n]=i[n]}))}return e}}}]);