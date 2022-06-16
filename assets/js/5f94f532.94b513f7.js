"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[8081],{9614:function(t,n,e){e.r(n);var i=e(7294),r=e(4010),s=e(4677),a=e(728),o=e(6389);n.default=function(){return(0,i.useEffect)((function(){var t=function(t,n,e){return-(t/n-t/e)},n="ontouchstart"in window,e=document.getElementById("zoomWrapper"),i=e.getBoundingClientRect().width;e.style.height=i+"px";var u=document.getElementById("subway"),c=i/3e3,h=new r.ZP({x:{range:[0,0],bounce:100},y:{range:[0,0],bounce:100},zoom:{range:[c,1]}},{deceleration:.003,interrutable:!1},{zoom:1});h.on("change",(function(e){var s=e.pos,a=e.delta,o=e.inputEvent,c=e.set;if(o&&a.zoom){var l=n?o.center:{x:o.layerX,y:o.layerY},v=s.zoom-a.zoom,f=s.x+t(l.x,s.zoom,v),d=s.y+t(l.y,s.zoom,v);c({x:f,y:d}),u.style[r.ZP.TRANSFORM]="scale("+s.zoom+") translate3d("+-f+"px, "+-d+"px, 0)",h.axis.y.range[1]=h.axis.x.range[1]=h.axis.x.range[1]+t(i,s.zoom,v)}else u.style[r.ZP.TRANSFORM]="scale("+s.zoom+") translate3d("+-s.x+"px, "+-s.y+"px, 0)"}),[]),h.connect("zoom",n?new s.n(e):new a.H(e,{scale:Math.abs(c)})).connect("x y",new o.J(e,{scale:[-1,-1]}))})),i.createElement("div",{className:"demobox"},i.createElement("p",null,"You can create maps that can zoom using three axes."),i.createElement("div",{id:"zoomWrapper"},i.createElement("img",{id:"subway",src:e(8387).Z})))}},5719:function(t,n,e){e.d(n,{Z:function(){return x}});var i=e(7326),r=e(4578),s=e(2921),a=e(8519),o=function(){function t(t){this._axes=t}var n=t.prototype;return n.hold=function(t,n){var e=this._getRoundPos(t).roundPos;this._axes.trigger(new s.L("hold",{pos:e,input:n.input||null,inputEvent:n.event||null,isTrusted:!0}))},n.triggerRelease=function(t){var n=this._getRoundPos(t.destPos,t.depaPos),e=n.roundPos,i=n.roundDepa;t.destPos=e,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new s.L("release",Object.assign({},t,{bounceRatio:this._getBounceRatio(e)})))},n.triggerChange=function(t,n,e,i){void 0===i&&(i=!1);var r=this.animationManager,a=r.axisManager,o=r.getEventInfo(),u=this._getRoundPos(t,n),c=u.roundPos,h=u.roundDepa,l=a.moveTo(c,h),v=(null==e?void 0:e.event)||(null==o?void 0:o.event)||null,f={pos:l.pos,delta:l.delta,bounceRatio:this._getBounceRatio(l.pos),holding:i,inputEvent:v,isTrusted:!!v,input:(null==e?void 0:e.input)||(null==o?void 0:o.input)||null,set:v?this._createUserControll(l.pos):function(){}},d=new s.L("change",f);return this._axes.trigger(d),v&&a.set(f.set().destPos),!d.isCanceled()},n.triggerAnimationStart=function(t){var n=this._getRoundPos(t.destPos,t.depaPos),e=n.roundPos,i=n.roundDepa;t.destPos=e,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration);var r=new s.L("animationStart",t);return this._axes.trigger(r),!r.isCanceled()},n.triggerAnimationEnd=function(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("animationEnd",{isTrusted:t}))},n.triggerFinish=function(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("finish",{isTrusted:t}))},n.setAnimationManager=function(t){this.animationManager=t},n.destroy=function(){this._axes.off()},n._createUserControll=function(t,n){void 0===n&&(n=0);var e={destPos:Object.assign({},t),duration:n};return function(t,n){return t&&(e.destPos=Object.assign({},t)),void 0!==n&&(e.duration=n),e}},n._getRoundPos=function(t,n){var e=this._axes.options.round;return{roundPos:(0,a.UF)(t,e),roundDepa:(0,a.UF)(n,e)}},n._getBounceRatio=function(t){return this._axes.axisManager.map(t,(function(t,n){return t<n.range[0]&&0!==n.bounce[0]?(n.range[0]-t)/n.bounce[0]:t>n.range[1]&&0!==n.bounce[1]?(t-n.range[1])/n.bounce[1]:0}))},t}(),u=function(){function t(t){this._prevented=!1,this._options=t}var n=t.prototype;return n.isInterrupting=function(){return this._options.interruptable||this._prevented},n.isInterrupted=function(){return!this._options.interruptable&&this._prevented},n.setInterrupt=function(t){this._options.interruptable||(this._prevented=t)},t}(),c=function(t,n,e,i){var r=t,s=[e[0]?n[0]:i?n[0]-i[0]:n[0],e[1]?n[1]:i?n[1]+i[1]:n[1]];return r=Math.max(s[0],r),r=Math.min(s[1],r)},h=function(t,n){return t<n[0]||t>n[1]},l=function(t,n,e){return e[1]&&t>n[1]||e[0]&&t<n[0]},v=function(t,n,e){var i=t,r=n[0],s=n[1],a=s-r;return e[1]&&t>s&&(i=(i-s)%a+r),e[0]&&t<r&&(i=(i-r)%a+s),i},f=function(){function t(t){var n=this;this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce((function(t,e){return t[e]=n._axis[e].range[0],t}),{})}var n=t.prototype;return n.getDelta=function(t,n){var e=this.get(t);return(0,a.UI)(this.get(n),(function(t,n){return t-e[n]}))},n.get=function(t){var n=this;return t&&Array.isArray(t)?t.reduce((function(t,e){return e&&e in n._pos&&(t[e]=n._pos[e]),t}),{}):Object.assign({},this._pos,t||{})},n.moveTo=function(t,n){void 0===n&&(n=this._pos);var e=(0,a.UI)(this._pos,(function(e,i){return i in t&&i in n?t[i]-n[i]:0}));return this.set(this.map(t,(function(t,n){return n?v(t,n.range,n.circular):0}))),{pos:Object.assign({},this._pos),delta:e}},n.set=function(t){for(var n in t)n&&n in this._pos&&(this._pos[n]=t[n])},n.every=function(t,n){var e=this._axis;return(0,a.yW)(t,(function(t,i){return n(t,e[i],i)}))},n.filter=function(t,n){var e=this._axis;return(0,a.hX)(t,(function(t,i){return n(t,e[i],i)}))},n.map=function(t,n){var e=this._axis;return(0,a.UI)(t,(function(t,i){return n(t,e[i],i)}))},n.isOutside=function(t){return!this.every(t?this.get(t):this._pos,(function(t,n){return!h(t,n.range)}))},n.getAxisOptions=function(t){return this._axis[t]},n._complementOptions=function(){var t=this;Object.keys(this._axis).forEach((function(n){t._axis[n]=Object.assign({},{range:[0,100],bounce:[0,0],circular:[!1,!1]},t._axis[n]),["bounce","circular"].forEach((function(e){var i=t._axis,r=i[n][e];/string|number|boolean/.test(typeof r)&&(i[n][e]=[r,r])}))}))},t}(),d=e(7242),_=function(){function t(t){var n=t.options,e=t.interruptManager,i=t.eventManager,r=t.axisManager,s=t.animationManager;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=n,this._interruptManager=e,this._eventManager=i,this._axisManager=r,this._animationManager=s}var n=t.prototype;return n.get=function(t){return this._axisManager.get(t.axes)},n.hold=function(t,n){if(!this._interruptManager.isInterrupted()&&t.axes.length){var e={input:t,event:n};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(e),this._moveDistance||this._eventManager.hold(this._axisManager.get(),e),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}},n.change=function(t,n,e,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&!this._axisManager.every(e,(function(t){return 0===t}))){var r=n.srcEvent?n.srcEvent:n;if(!r.__childrenAxesAlreadyChanged){var s,o=this._moveDistance||this._axisManager.get(t.axes);s=(0,a.UI)(o,(function(t,n){return t+(e[n]||0)})),this._moveDistance&&(this._moveDistance=this._axisManager.map(s,(function(t,n){var e=n.circular,i=n.range;return e&&(e[0]||e[1])?v(t,i,e):t}))),this._isOutside&&this._axisManager.every(o,(function(t,n){return!h(t,n.range)}))&&(this._isOutside=!1),o=this._atOutside(o),s=this._atOutside(s),this.options.nested&&this._isEndofAxis(e,o,s)||(r.__childrenAxesAlreadyChanged=!0);var u={input:t,event:n};if(i){var c=this._animationManager.getDuration(s,o);this._animationManager.animateTo(s,c,u)}else{!this._eventManager.triggerChange(s,o,u,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}}},n.release=function(t,n,e,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&this._moveDistance){var r=n.srcEvent?n.srcEvent:n;r.__childrenAxesAlreadyReleased&&(e=e.map((function(){return 0})));var s=this._axisManager.get(t.axes),o=this._axisManager.get(),u=this._animationManager.getDisplacement(e),h=(0,d.m)(t.axes,u),l=this._axisManager.get(this._axisManager.map(h,(function(t,n,e){return n.circular&&(n.circular[0]||n.circular[1])?s[e]+t:c(s[e]+t,n.range,n.circular,n.bounce)})));r.__childrenAxesAlreadyReleased=!0;var v=this._animationManager.getDuration(l,s,i);0===v&&(l=Object.assign({},o));var f={depaPos:o,destPos:l,duration:v,delta:this._axisManager.getDelta(o,l),inputEvent:n,input:t,isTrusted:!0};this._eventManager.triggerRelease(f),this._moveDistance=null;var _=this._animationManager.getUserControl(f),g=(0,a.Dg)(_.destPos,o),p={input:t,event:n};g||0===_.duration?(g||this._eventManager.triggerChange(_.destPos,o,p,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(p):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(_.destPos,_.duration,p)}},n._atOutside=function(t){var n=this;return this._isOutside?this._axisManager.map(t,(function(t,n){var e=n.range[0]-n.bounce[0],i=n.range[1]+n.bounce[1];return t>i?i:t<e?e:t})):this._axisManager.map(t,(function(t,e){var i=e.range[0],r=e.range[1],s=e.bounce,a=e.circular;return a&&(a[0]||a[1])?t:t<i?i-n._animationManager.interpolate(i-t,s[0]):t>r?r+n._animationManager.interpolate(t-r,s[1]):t}))},n._isEndofAxis=function(t,n,e){return this._axisManager.every(n,(function(i,r,s){return 0===t[s]||n[s]===e[s]&&(a=i,o=r.range,u=r.bounce,!(c=r.circular)[0]&&a===o[0]-u[0]||!c[1]&&a===o[1]+u[1]);var a,o,u,c}))},t}(),g=e(1229),p=function(t,n,e){return Math.max(Math.min(t,e),n)},m=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this)._useDuration=!0,n}(0,r.Z)(n,t);var e=n.prototype;return e.interpolate=function(t,n){var e=this._easing(1e-5)/1e-5;return this._easing(t/(n*e))*n},e.updateAnimation=function(t){var n=this._animateParam;if(n){var e=(new Date).getTime()-n.startTime,i=(null==t?void 0:t.destPos)||n.destPos,r=(null==t?void 0:t.duration)||n.duration;if(null!=t&&t.restart||r<=e)this.setTo(i,r-e);else{if(null!=t&&t.destPos){var s=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,n.delta=this.axisManager.getDelta(s,i),n.destPos=i}if(null!=t&&t.duration){var a=(e+this._durationOffset)/n.duration;this._durationOffset=a*r-e,n.duration=r}}}},e._initState=function(t){return this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,{pos:t.depaPos,easingPer:0,finished:!1}},e._getNextState=function(t){var n=this,e=this._animateParam,i=t.pos,r=e.destPos,s=(0,a.UI)(i,(function(t,n){return t<=r[n]?1:-1})),o=((new Date).getTime()-e.startTime+this._durationOffset)/e.duration,u=this._easing(o),c=this.axisManager.map(i,(function(t,a,c){var h=o>=1?r[c]:t+e.delta[c]*(u-n._prevEasingPer)/(1-n._initialEasingPer),l=v(h,a.range,a.circular);if(h!==l){var f=s[c]*(a.range[1]-a.range[0]);r[c]-=f,i[c]-=f}return l}));return this._prevEasingPer=u,{pos:c,easingPer:u,finished:u>=1}},e._easing=function(t){return t>1?1:this._options.easing(t)},n}(function(){function t(t){var n=t.options,e=t.interruptManager,i=t.eventManager,r=t.axisManager;this._options=n,this.interruptManager=e,this.eventManager=i,this.axisManager=r,this.animationEnd=this.animationEnd.bind(this)}var n=t.prototype;return n.getDuration=function(t,n,e){var i,r=this;if(void 0!==e)i=e;else{var s=(0,a.UI)(n,(function(n,e){return function(t,n){var e=Math.sqrt(t/n*2);return e<100?0:e}(Math.abs(n-t[e]),r._options.deceleration)}));i=Object.keys(s).reduce((function(t,n){return Math.max(t,s[n])}),-1/0)}return p(i,this._options.minimumDuration,this._options.maximumDuration)},n.getDisplacement=function(t){var n=Math.pow(t.reduce((function(t,n){return t+n*n}),0),1/t.length),e=Math.abs(n/-this._options.deceleration);return t.map((function(t){return t/2*e}))},n.stopAnimation=function(t){if(this._animateParam){var n=this.axisManager.get(),e=this.axisManager.map(n,(function(t,n){return v(t,n.range,n.circular)}));(0,a.yW)(e,(function(t,e){return n[e]===t}))||this.eventManager.triggerChange(e,n,t,!!t),this._animateParam=null,this._raf&&(0,a.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}},n.getEventInfo=function(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null},n.restore=function(t){var n=this.axisManager.get(),e=this.axisManager.map(n,(function(t,n){return Math.min(n.range[1],Math.max(n.range[0],t))}));this.stopAnimation(),this.animateTo(e,this.getDuration(n,e),t)},n.animationEnd=function(){var t=this.getEventInfo();this._animateParam=null;var n=this.axisManager.filter(this.axisManager.get(),(function(t,n){return l(t,n.range,n.circular)}));Object.keys(n).length>0&&this.setTo(this.axisManager.map(n,(function(t,n){return v(t,n.range,n.circular)}))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)},n.finish=function(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)},n.getUserControl=function(t){var n=t.setTo();return n.destPos=this.axisManager.get(n.destPos),n.duration=p(n.duration,this._options.minimumDuration,this._options.maximumDuration),n},n.animateTo=function(t,n,e){var i=this;this.stopAnimation();var r=this._createAnimationParam(t,n,e),s=Object.assign({},r.depaPos),o=this.eventManager.triggerAnimationStart(r),u=this.getUserControl(r);if(!o&&this.axisManager.every(u.destPos,(function(t,n){return l(t,n.range,n.circular)}))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),o&&!(0,a.Dg)(u.destPos,s)){var c=(null==e?void 0:e.event)||null;this._animateLoop({depaPos:s,destPos:u.destPos,duration:u.duration,delta:this.axisManager.getDelta(s,u.destPos),isTrusted:!!c,inputEvent:c,input:(null==e?void 0:e.input)||null},(function(){return i.animationEnd()}))}},n.setTo=function(t,n){void 0===n&&(n=0);var e=Object.keys(t),i=this.axisManager.get(e);if((0,a.Dg)(t,i))return this;this.interruptManager.setInterrupt(!0);var r=(0,a.hX)(t,(function(t,n){return i[n]!==t}));return Object.keys(r).length?(r=this.axisManager.map(r,(function(t,n){var e=n.range,i=n.circular;return i&&(i[0]||i[1])?t:c(t,e,i)})),(0,a.Dg)(r,i)||(n>0?this.animateTo(r,n):(this.stopAnimation(),this.eventManager.triggerChange(r),this.finish(!1))),this):this},n.setBy=function(t,n){return void 0===n&&(n=0),this.setTo((0,a.UI)(this.axisManager.get(Object.keys(t)),(function(n,e){return n+t[e]})),n)},n._createAnimationParam=function(t,n,e){var i=this.axisManager.get(),r=t,s=(null==e?void 0:e.event)||null;return{depaPos:i,destPos:r,duration:p(n,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(i,r),inputEvent:s,input:(null==e?void 0:e.input)||null,isTrusted:!!s,done:this.animationEnd}},n._animateLoop=function(t,n){var e=this;if(t.duration){this._animateParam=Object.assign({},t,{startTime:(new Date).getTime()});var i=(0,a.UI)(t.destPos,(function(t){return t})),r=this._initState(this._animateParam);!function t(){e._raf=null;var s=e._animateParam,o=e._getNextState(r),u=!e.eventManager.triggerChange(o.pos,r.pos);if(r=o,o.finished)return s.destPos=e._getFinalPos(s.destPos,i),(0,a.Dg)(s.destPos,e.axisManager.get(Object.keys(s.destPos)))||e.eventManager.triggerChange(s.destPos,o.pos),void n();u?e.finish(!1):e._raf=(0,a.U7)(t)}()}else this.eventManager.triggerChange(t.destPos),n()},n._getFinalPos=function(t,n){var e=this,i=1e-6;return(0,a.UI)(t,(function(t,r){if(t>=n[r]-i&&t<=n[r]+i)return n[r];var s=e._getRoundUnit(t,r);return(0,a.QV)(t,s)}))},n._getRoundUnit=function(t,n){var e=this._options.round,i=null;if(!e){var r=this.axisManager.getAxisOptions(n);i=(0,a.Dw)(Math.max((0,a.il)(r.range[0]),(0,a.il)(r.range[1]),(0,a.il)(t)))}return i||e},t}()),E=function(t){function n(n,e,r){var s;return void 0===n&&(n={}),void 0===e&&(e={}),void 0===r&&(r=null),(s=t.call(this)||this)._inputs=[],s.axis=n,s.options=Object.assign({},{easing:function(t){return 1-Math.pow(1-t,3)},interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1},e),s.interruptManager=new u(s.options),s.axisManager=new f(s.axis),s.eventManager=new o((0,i.Z)(s)),s.animationManager=new m((0,i.Z)(s)),s.inputObserver=new _((0,i.Z)(s)),s.eventManager.setAnimationManager(s.animationManager),r&&s.eventManager.triggerChange(r),s}(0,r.Z)(n,t);var e=n.prototype;return e.connect=function(t,n){var e;return e="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(n)&&this.disconnect(n),n.mapAxes(e),n.connect(this.inputObserver),this._inputs.push(n),this},e.disconnect=function(t){if(t){var n=this._inputs.indexOf(t);n>=0&&(this._inputs[n].disconnect(),this._inputs.splice(n,1))}else this._inputs.forEach((function(t){return t.disconnect()})),this._inputs=[];return this},e.get=function(t){return this.axisManager.get(t)},e.setTo=function(t,n){return void 0===n&&(n=0),this.animationManager.setTo(t,n),this},e.setBy=function(t,n){return void 0===n&&(n=0),this.animationManager.setBy(t,n),this},e.stopAnimation=function(){return this.animationManager.stopAnimation(),this},e.updateAnimation=function(t){return this.animationManager.updateAnimation(t),this},e.isBounceArea=function(t){return this.axisManager.isOutside(t)},e.destroy=function(){this.disconnect(),this.eventManager.destroy()},n}(s.Z);E.VERSION="#__VERSION__#",E.TRANSFORM=g.Up,E.DIRECTION_NONE=g.j9,E.DIRECTION_LEFT=g.AV,E.DIRECTION_RIGHT=g.EM,E.DIRECTION_UP=g.uO,E.DIRECTION_DOWN=g.C2,E.DIRECTION_HORIZONTAL=g.Xv,E.DIRECTION_VERTICAL=g.Et,E.DIRECTION_ALL=g.oM;var x=E},9854:function(t,n,e){var i;e.d(n,{u:function(){return i}}),i="undefined"==typeof window?{navigator:{userAgent:""}}:window},1229:function(t,n,e){e.d(n,{AV:function(){return a},C2:function(){return h},EM:function(){return o},Et:function(){return l},Up:function(){return E},Xv:function(){return u},YS:function(){return _},ZL:function(){return x},ab:function(){return m},ej:function(){return d},gk:function(){return g},j9:function(){return s},kZ:function(){return p},oM:function(){return v},sH:function(){return f},uO:function(){return c}});var i=e(3308),r=e(9854),s=1,a=2,o=4,u=6,c=8,h=16,l=24,v=30,f="left",d="right",_="middle",g=16,p=30,m="ontouchstart"in r.u&&"safari"===(0,i.Z)().browser.name,E=function(){if("undefined"==typeof document)return"";for(var t=(document.head||document.getElementsByTagName("head")[0]).style,n=["transform","webkitTransform","msTransform","mozTransform"],e=0,i=n.length;e<i;e++)if(n[e]in t)return n[e];return""}(),x={"user-select":"none","-webkit-user-drag":"none"}},4010:function(t,n,e){var i=e(5719);n.ZP=i.Z},7242:function(t,n,e){e.d(n,{J:function(){return p},m:function(){return g}});var i=e(4578),r=e(8519),s=e(9854),a=e(1229),o="ontouchstart"in s.u,u="PointerEvent"in s.u,c="MSPointerEvent"in s.u,h=u||c,l=function(){function t(){var t=this;this._stopContextMenu=function(n){n.preventDefault(),s.u.removeEventListener("contextmenu",t._stopContextMenu)}}var n=t.prototype;return n.extendEvent=function(t){var n=this.prevEvent,e=this._getCenter(t),i=n?this._getMovement(t):{x:0,y:0},s=n?this._getScale(t):1,o=n?(0,r._O)(e.x-n.center.x,e.y-n.center.y):0,u=n?n.deltaX+i.x:i.x,c=n?n.deltaY+i.y:i.y,h=i.x,l=i.y,v=this._latestInterval,f=Date.now(),d=v?f-v.timestamp:0,_=n?n.velocityX:0,g=n?n.velocityY:0;return(!v||d>=a.gk)&&(v&&(_=(u-v.deltaX)/d,g=(c-v.deltaY)/d),this._latestInterval={timestamp:f,deltaX:u,deltaY:c}),{srcEvent:t,scale:s,angle:o,center:e,deltaX:u,deltaY:c,offsetX:h,offsetY:l,velocityX:_,velocityY:g,preventSystemEvent:!0}},n._getDistance=function(t,n){var e=n.clientX-t.clientX,i=n.clientY-t.clientY;return Math.sqrt(e*e+i*i)},n._getButton=function(t){var n={1:a.sH,2:a.ej,4:a.YS},e=this._isTouchEvent(t)?a.sH:n[t.buttons];return e||null},n._isTouchEvent=function(t){return t.type.indexOf("touch")>-1},n._isValidButton=function(t,n){return n.indexOf(t)>-1},n._preventMouseButton=function(t,n){n===a.ej?s.u.addEventListener("contextmenu",this._stopContextMenu):n===a.YS&&t.preventDefault()},t}(),v=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["mousedown"],n.move=["mousemove"],n.end=["mouseup"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t,n){var e=this._getButton(t);return n&&!this._isValidButton(e,n)?null:(this._preventMouseButton(t,e),this.extendEvent(t))},e.onEventMove=function(t,n){return n&&!this._isValidButton(this._getButton(t),n)?null:this.extendEvent(t)},e.onEventEnd=function(){},e.onRelease=function(){this.prevEvent=null},e.getTouches=function(){return 0},e._getScale=function(){return 1},e._getCenter=function(t){return{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return{x:t.clientX-n.clientX,y:t.clientY-n.clientY}},n}(l),f=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["touchstart"],n.move=["touchmove"],n.end=["touchend","touchcancel"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t){return this._baseTouches=t.touches,this.extendEvent(t)},e.onEventMove=function(t){return this.extendEvent(t)},e.onEventEnd=function(t){this._baseTouches=t.touches},e.onRelease=function(){this.prevEvent=null,this._baseTouches=null},e.getTouches=function(t){return t.touches.length},e._getScale=function(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])},e._getCenter=function(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return t.touches[0].identifier!==n.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].clientX-n.touches[0].clientX,y:t.touches[0].clientY-n.touches[0].clientY}},n}(l),d=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=u?["pointerdown"]:["MSPointerDown"],n.move=u?["pointermove"]:["MSPointerMove"],n.end=u?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],n._firstInputs=[],n._recentInputs=[],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t,n){var e=this._getButton(t);return n&&!this._isValidButton(e,n)?null:(this._preventMouseButton(t,e),this._updatePointerEvent(t),this.extendEvent(t))},e.onEventMove=function(t,n){return n&&!this._isValidButton(this._getButton(t),n)?null:(this._updatePointerEvent(t),this.extendEvent(t))},e.onEventEnd=function(t){this._removePointerEvent(t)},e.onRelease=function(){this.prevEvent=null,this._firstInputs=[],this._recentInputs=[]},e.getTouches=function(){return this._recentInputs.length},e._getScale=function(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])},e._getCenter=function(t){return{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return t.pointerId!==n.pointerId?{x:0,y:0}:{x:t.clientX-n.clientX,y:t.clientY-n.clientY}},e._updatePointerEvent=function(t){var n=this,e=!1;this._recentInputs.forEach((function(i,r){i.pointerId===t.pointerId&&(e=!0,n._recentInputs[r]=t)})),e||(this._firstInputs.push(t),this._recentInputs.push(t))},e._removePointerEvent=function(t){this._firstInputs=this._firstInputs.filter((function(n){return n.pointerId!==t.pointerId})),this._recentInputs=this._recentInputs.filter((function(n){return n.pointerId!==t.pointerId}))},n}(l),_=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["mousedown","touchstart"],n.move=["mousemove","touchmove"],n.end=["mouseup","touchend","touchcancel"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t,n){var e=this._getButton(t);return this._isTouchEvent(t)&&(this._baseTouches=t.touches),n&&!this._isValidButton(e,n)?null:(this._preventMouseButton(t,e),this.extendEvent(t))},e.onEventMove=function(t,n){return n&&!this._isValidButton(this._getButton(t),n)?null:this.extendEvent(t)},e.onEventEnd=function(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)},e.onRelease=function(){this.prevEvent=null,this._baseTouches=null},e.getTouches=function(t){return this._isTouchEvent(t)?t.touches.length:0},e._getScale=function(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale},e._getCenter=function(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this,e=[t,this.prevEvent.srcEvent].map((function(t){return n._isTouchEvent(t)?{id:t.touches[0].identifier,x:t.touches[0].clientX,y:t.touches[0].clientY}:{id:null,x:t.clientX,y:t.clientY}})),i=e[0],r=e[1];return i.id===r.id?{x:i.x-r.x,y:i.y-r.y}:{x:0,y:0}},n}(l),g=function(t,n){return n.reduce((function(n,e,i){return t[i]&&(n[t[i]]=e),n}),{})},p=function(t){void 0===t&&(t=[]);var n=!1,e=!1,i=!1;return t.forEach((function(t){switch(t){case"mouse":e=!0;break;case"touch":n=o;break;case"pointer":i=h}})),i?new d:n&&e?new _:n?new f:e?new v:null}},6389:function(t,n,e){e.d(n,{J:function(){return a}});var i=e(8519),r=e(1229),s=e(7242),a=function(){function t(t,n){var e=this;this.axes=[],this.element=null,this._enabled=!1,this._activeEvent=null,this._atRightEdge=!1,this._rightEdgeTimer=0,this._forceRelease=function(){var t=e._activeEvent,n=t.prevEvent;t.onRelease(),e._observer.release(e,n,[0,0]),e._detachWindowEvent(t)},this._voidFunction=function(){},this.element=(0,i.$)(t),this.options=Object.assign({inputType:["touch","mouse","pointer"],inputButton:[r.sH],scale:[1,1],thresholdAngle:45,threshold:0,iOSEdgeSwipeThreshold:r.kZ,releaseOnScroll:!1,touchAction:null},n),this._onPanstart=this._onPanstart.bind(this),this._onPanmove=this._onPanmove.bind(this),this._onPanend=this._onPanend.bind(this)}var n=t.prototype;return n.mapAxes=function(t){this._direction=(0,i.Mg)(!!t[0],!!t[1]),this.axes=t},n.connect=function(t){return this._activeEvent&&(this._detachElementEvent(),this._detachWindowEvent(this._activeEvent)),this._attachElementEvent(t),this._originalCssProps=(0,i.lH)(this.element,this.options,this._direction),this},n.disconnect=function(){return this._detachElementEvent(),this._detachWindowEvent(this._activeEvent),(0,i.fx)(this._originalCssProps)||(0,i.tF)(this.element,this._originalCssProps),this._direction=r.j9,this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onPanstart=function(t){var n=this._activeEvent,e=n.onEventStart(t,this.options.inputButton);if(e&&this._enabled&&!(n.getTouches(t)>1)&&!1!==e.srcEvent.cancelable){var i=this.options.iOSEdgeSwipeThreshold;this._observer.hold(this,e),this._atRightEdge=r.ab&&e.center.x>window.innerWidth-i,this._attachWindowEvent(n),n.prevEvent=e}},n._onPanmove=function(t){var n=this,e=this._activeEvent,a=e.onEventMove(t,this.options.inputButton);if(a&&this._enabled&&!(e.getTouches(t)>1)){var o=this.options,u=o.iOSEdgeSwipeThreshold,c=o.releaseOnScroll,h=function(t,n){if(n<0||n>90)return r.j9;var e=Math.abs(t);return e>n&&e<180-n?r.Et:r.Xv}(a.angle,this.options.thresholdAngle);if(!c||a.srcEvent.cancelable){if(e.prevEvent&&r.ab){if(a.center.x<0)return void this._forceRelease();this._atRightEdge&&(clearTimeout(this._rightEdgeTimer),a.deltaX<-u?this._atRightEdge=!1:this._rightEdgeTimer=window.setTimeout((function(){return n._forceRelease()}),100))}var l=this._getOffset([a.offsetX,a.offsetY],[(0,i.gm)(r.Xv,this._direction,h),(0,i.gm)(r.Et,this._direction,h)]),v=l.some((function(t){return 0!==t}));v&&(!1!==a.srcEvent.cancelable&&a.srcEvent.preventDefault(),a.srcEvent.stopPropagation()),a.preventSystemEvent=v,v&&this._observer.change(this,a,(0,s.m)(this.axes,l)),e.prevEvent=a}else this._onPanend(t)}},n._onPanend=function(t){var n=this._activeEvent;if(n.onEventEnd(t),this._enabled&&0===n.getTouches(t)){this._detachWindowEvent(n),clearTimeout(this._rightEdgeTimer);var e=n.prevEvent,s=this._getOffset([Math.abs(e.velocityX)*(e.offsetX<0?-1:1),Math.abs(e.velocityY)*(e.offsetY<0?-1:1)],[(0,i.gm)(r.Xv,this._direction),(0,i.gm)(r.Et,this._direction)]);n.onRelease(),this._observer.release(this,e,s)}},n._attachWindowEvent=function(t){var n=this;null==t||t.move.forEach((function(t){window.addEventListener(t,n._onPanmove,{passive:!1})})),null==t||t.end.forEach((function(t){window.addEventListener(t,n._onPanend,{passive:!1})}))},n._detachWindowEvent=function(t){var n=this;null==t||t.move.forEach((function(t){window.removeEventListener(t,n._onPanmove)})),null==t||t.end.forEach((function(t){window.removeEventListener(t,n._onPanend)}))},n._getOffset=function(t,n){var e=this.options.scale;return[n[0]?t[0]*e[0]:0,n[1]?t[1]*e[1]:0]},n._attachElementEvent=function(t){var n=this,e=(0,s.J)(this.options.inputType);e&&(this._observer=t,this._enabled=!0,this._activeEvent=e,e.start.forEach((function(t){var e;null==(e=n.element)||e.addEventListener(t,n._onPanstart)})),e.move.forEach((function(t){var e;null==(e=n.element)||e.addEventListener(t,n._voidFunction)})))},n._detachElementEvent=function(){var t=this,n=this._activeEvent;null==n||n.start.forEach((function(n){var e;null==(e=t.element)||e.removeEventListener(n,t._onPanstart)})),null==n||n.move.forEach((function(n){var e;null==(e=t.element)||e.removeEventListener(n,t._voidFunction)})),this._enabled=!1,this._observer=null},t}()},4677:function(t,n,e){e.d(n,{n:function(){return a}});var i=e(8519),r=e(1229),s=e(7242),a=function(){function t(t,n){this.axes=[],this.element=null,this._pinchFlag=!1,this._enabled=!1,this._activeEvent=null,this.element=(0,i.$)(t),this.options=Object.assign({scale:1,threshold:0,inputType:["touch","pointer"],touchAction:"none"},n),this._onPinchStart=this._onPinchStart.bind(this),this._onPinchMove=this._onPinchMove.bind(this),this._onPinchEnd=this._onPinchEnd.bind(this)}var n=t.prototype;return n.mapAxes=function(t){this.axes=t},n.connect=function(t){return this._activeEvent&&this._detachEvent(),this._attachEvent(t),this._originalCssProps=(0,i.lH)(this.element,this.options,r.oM),this},n.disconnect=function(){return this._detachEvent(),(0,i.fx)(this._originalCssProps)||(0,i.tF)(this.element,this._originalCssProps),this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onPinchStart=function(t){var n=this._activeEvent,e=n.onEventStart(t);e&&this._enabled&&2===n.getTouches(t)&&(this._baseValue=this._observer.get(this)[this.axes[0]],this._observer.hold(this,t),this._pinchFlag=!0,n.prevEvent=e)},n._onPinchMove=function(t){var n=this._activeEvent,e=n.onEventMove(t);if(e&&this._pinchFlag&&this._enabled&&2===n.getTouches(t)){var i=this._getOffset(e.scale,n.prevEvent.scale);this._observer.change(this,t,(0,s.m)(this.axes,[i])),n.prevEvent=e}},n._onPinchEnd=function(t){var n=this._activeEvent;n.onEventEnd(t),!this._pinchFlag||!this._enabled||n.getTouches(t)>=2||(n.onRelease(),this._observer.release(this,t,[0],0),this._baseValue=null,this._pinchFlag=!1)},n._attachEvent=function(t){var n=this,e=(0,s.J)(this.options.inputType);e&&(this._observer=t,this._enabled=!0,this._activeEvent=e,e.start.forEach((function(t){n.element.addEventListener(t,n._onPinchStart,!1)})),e.move.forEach((function(t){n.element.addEventListener(t,n._onPinchMove,!1)})),e.end.forEach((function(t){n.element.addEventListener(t,n._onPinchEnd,!1)})))},n._detachEvent=function(){var t=this,n=this._activeEvent;null==n||n.start.forEach((function(n){t.element.removeEventListener(n,t._onPinchStart,!1)})),null==n||n.move.forEach((function(n){t.element.removeEventListener(n,t._onPinchMove,!1)})),null==n||n.end.forEach((function(n){t.element.removeEventListener(n,t._onPinchEnd,!1)})),this._enabled=!1,this._observer=null},n._getOffset=function(t,n){return void 0===n&&(n=1),this._baseValue*(t-n)*this.options.scale},t}()},728:function(t,n,e){e.d(n,{H:function(){return a}});var i=e(8519),r=e(1229),s=e(7242),a=function(){function t(t,n){this.axes=[],this.element=null,this._enabled=!1,this._holding=!1,this._timer=null,this.element=(0,i.$)(t),this.options=Object.assign({},{scale:1,releaseDelay:300,useNormalized:!0,useAnimation:!1},n),this._onWheel=this._onWheel.bind(this)}var n=t.prototype;return n.mapAxes=function(t){this._direction=(0,i.Mg)(!!t[1],!!t[0]),this.axes=t},n.connect=function(t){return this._detachEvent(),this._attachEvent(t),this},n.disconnect=function(){return this._detachEvent(),this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onWheel=function(t){var n=this;if(this._enabled){var e=this._getOffset([t.deltaY,t.deltaX],[(0,i.gm)(r.Et,this._direction),(0,i.gm)(r.Xv,this._direction)]);0===e[0]&&0===e[1]||(t.preventDefault(),this._holding||(this._observer.hold(this,t),this._holding=!0),this._observer.change(this,t,(0,s.m)(this.axes,e),this.options.useAnimation),clearTimeout(this._timer),this._timer=setTimeout((function(){n._holding&&(n._holding=!1,n._observer.release(n,t,[0]))}),this.options.releaseDelay))}},n._getOffset=function(t,n){var e=this.options.scale,i=this.options.useNormalized;return[n[0]&&t[0]?(t[0]>0?-1:1)*(i?1:Math.abs(t[0]))*e:0,n[1]&&t[1]?(t[1]>0?-1:1)*(i?1:Math.abs(t[1]))*e:0]},n._attachEvent=function(t){this._observer=t,this.element.addEventListener("wheel",this._onWheel),this._enabled=!0},n._detachEvent=function(){this.element.removeEventListener("wheel",this._onWheel),this._enabled=!1,this._observer=null,this._timer&&(clearTimeout(this._timer),this._timer=null)},t}()},8519:function(t,n,e){e.d(n,{$:function(){return a},Dg:function(){return g},Dw:function(){return M},Mg:function(){return T},QV:function(){return m},U7:function(){return l},UF:function(){return E},UI:function(){return f},Wx:function(){return v},_O:function(){return y},fx:function(){return P},gm:function(){return O},hX:function(){return d},il:function(){return x},lH:function(){return w},tF:function(){return I},yW:function(){return _}});var i=e(9854),r=e(1229),s=function(t){for(var n=[],e=0,i=t.length;e<i;e++)n.push(t[e]);return n},a=function t(n,e){var r;if(void 0===e&&(e=!1),"string"==typeof n){if(n.match(/^<([a-z]+)\s*([^>]*)>/)){var a=document.createElement("div");a.innerHTML=n,r=s(a.childNodes)}else r=s(document.querySelectorAll(n));e||(r=r.length>=1?r[0]:void 0)}else n===i.u?r=n:!n.nodeName||1!==n.nodeType&&9!==n.nodeType?"jQuery"in i.u&&n instanceof jQuery||n.constructor.prototype.jquery?r=e?n.toArray():n.get(0):Array.isArray(n)&&(r=n.map((function(n){return t(n)})),e||(r=r.length>=1?r[0]:void 0)):r=n;return r},o=i.u.requestAnimationFrame||i.u.webkitRequestAnimationFrame,u=i.u.cancelAnimationFrame||i.u.webkitCancelAnimationFrame;if(o&&!u){var c={},h=o;o=function(t){var n=h((function(e){c[n]&&t(e)}));return c[n]=!0,n},u=function(t){delete c[t]}}else o&&u||(o=function(t){return i.u.setTimeout((function(){t(i.u.performance&&i.u.performance.now&&i.u.performance.now()||(new Date).getTime())}),16)},u=i.u.clearTimeout);var l=function(t){return o(t)},v=function(t){u(t)},f=function(t,n){var e={};for(var i in t)i&&(e[i]=n(t[i],i));return e},d=function(t,n){var e={};for(var i in t)i&&n(t[i],i)&&(e[i]=t[i]);return e},_=function(t,n){for(var e in t)if(e&&!n(t[e],e))return!1;return!0},g=function(t,n){return _(t,(function(t,e){return t===n[e]}))},p={},m=function(t,n){return p[n]||(p[n]=b(n)),p[n](t)},E=function(t,n){return t&&n?f(t,(function(t,e){return m(t,"number"==typeof n?n:n[e])})):t},x=function(t){if(!isFinite(t))return 0;var n=""+t;if(n.indexOf("e")>=0){for(var e=0,i=1;Math.round(t*i)/i!==t;)i*=10,e++;return e}return n.indexOf(".")>=0?n.length-n.indexOf(".")-1:0},M=function(t){return 1/Math.pow(10,t)},b=function(t){var n=t<1?Math.pow(10,x(t)):1;return function(e){return 0===t?0:Math.round(Math.round(e/t)*t*n)/n}},y=function(t,n){return 180*Math.atan2(n,t)/Math.PI},P=function(t){var n=!0;return Object.keys(r.ZL).forEach((function(e){t&&t[e]===r.ZL[e]||(n=!1)})),n},T=function(t,n){return t&&n?r.oM:t?r.Xv:n?r.Et:r.j9},O=function(t,n,e){return e?!!(n===r.oM||n&t&&e&t):!!(n&t)},w=function(t,n,e){var i,s=((i={})[r.j9]="auto",i[r.oM]="none",i[r.Et]="pan-x",i[r.Xv]="pan-y",i),a={};if(t&&t.style){var o=n.touchAction?n.touchAction:s[e],u=Object.assign({},r.ZL,{"touch-action":"none"===t.style["touch-action"]?"none":o});Object.keys(u).forEach((function(n){a[n]=t.style[n],t.style[n]=u[n]}))}return a},I=function(t,n){t&&t.style&&n&&Object.keys(n).forEach((function(e){t.style[e]=n[e]}))}},8387:function(t,n,e){n.Z=e.p+"assets/images/subway-fa01b988e8f2b8d966cf1c81b0f36dbd.png"}}]);