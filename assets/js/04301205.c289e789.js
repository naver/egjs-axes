"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[6118],{3360:function(t,n,e){e.r(n);var i=e(7294),r=e(4010),s=e(6389),a=e(4003);n.default=function(){return(0,i.useEffect)((function(){var t=1280,n=1677,e=1.31015625,i=document.getElementById("rawImage"),o=document.getElementById("imageView"),u=o.getBoundingClientRect().width;o.style.height=u*e+"px";var h=o.getBoundingClientRect(),c=document.getElementById("minimap").getBoundingClientRect(),l=document.getElementById("minimap-pointer"),v=u/t*128;l.style.width=v+"px",l.style.height=v*e+"px";var d=l.getBoundingClientRect(),f=[(c.width-d.width)/(t-h.width),(c.height-d.height)/(n-h.height)],g=new r.ZP({rawX:{range:[0,t-h.width],bounce:100},rawY:{range:[0,n-h.height],bounce:100}},{deceleration:.0024});g.on("change",(function(t){var n=t.pos;i.style[r.ZP.TRANSFORM]="translate3d("+-n.rawX+"px, "+-n.rawY+"px, 0)",l.style[r.ZP.TRANSFORM]="translate3d("+n.rawX*f[0]+"px, "+n.rawY*f[1]+"px, 0)"})),g.connect("rawX rawY",new s.Ju(o,{scale:[-1,-1]})).connect("rawX rawY",new a.f3(o,{scale:[10,-10]}))}),[]),i.createElement("div",{className:"demobox"},i.createElement("p",null,"You can create a scrollable minimap using two axes."),i.createElement("div",{style:{position:"relative"}},i.createElement("div",{id:"imageView"},i.createElement("div",{id:"rawImage"})),i.createElement("div",{id:"minimap"},i.createElement("div",{id:"minimap-pointer"}))))}},1520:function(t,n,e){e.d(n,{Z:function(){return x}});var i=e(7326),r=e(4578),s=e(2921),a=function(t,n,e,i){var r=t,s=[e[0]?n[0]:i?n[0]-i[0]:n[0],e[1]?n[1]:i?n[1]+i[1]:n[1]];return r=Math.max(s[0],r),r=Math.min(s[1],r)},o=function(t,n){return t<n[0]||t>n[1]},u=function(t,n,e){return e[1]&&t>n[1]||e[0]&&t<n[0]},h=function(t,n,e){var i=t,r=n[0],s=n[1],a=s-r;return e[1]&&t>s&&(i=(i-s)%a+r),e[0]&&t<r&&(i=(i-r)%a+s),i},c=e(8519),l=function(t,n,e){return Math.max(Math.min(t,e),n)},v=function(){function t(t){var n=t.options,e=t.interruptManager,i=t.eventManager,r=t.axisManager;this._options=n,this.interruptManager=e,this.eventManager=i,this.axisManager=r,this.animationEnd=this.animationEnd.bind(this)}var n=t.prototype;return n.getDuration=function(t,n,e){var i,r=this;if(void 0!==e)i=e;else{var s=(0,c.UI)(n,(function(n,e){return function(t,n){var e=Math.sqrt(t/n*2);return e<100?0:e}(Math.abs(n-t[e]),r._options.deceleration)}));i=Object.keys(s).reduce((function(t,n){return Math.max(t,s[n])}),-1/0)}return l(i,this._options.minimumDuration,this._options.maximumDuration)},n.getDisplacement=function(t){var n=Math.pow(t.reduce((function(t,n){return t+n*n}),0),1/t.length),e=Math.abs(n/-this._options.deceleration);return t.map((function(t){return t/2*e}))},n.interpolate=function(t,n){var e=this.easing(1e-5)/1e-5;return this.easing(t/(n*e))*n},n.stopAnimation=function(t){if(this._animateParam){var n=this.axisManager.get(),e=this.axisManager.map(n,(function(t,n){return h(t,n.range,n.circular)}));(0,c.yW)(e,(function(t,e){return n[e]===t}))||this.eventManager.triggerChange(e,n,t,!!t),this._animateParam=null,this._raf&&(0,c.Wx)(this._raf),this._raf=null,this.eventManager.triggerAnimationEnd(!(null==t||!t.event))}},n.getEventInfo=function(){return this._animateParam&&this._animateParam.input&&this._animateParam.inputEvent?{input:this._animateParam.input,event:this._animateParam.inputEvent}:null},n.restore=function(t){var n=this.axisManager.get(),e=this.axisManager.map(n,(function(t,n){return Math.min(n.range[1],Math.max(n.range[0],t))}));this.stopAnimation(),this.animateTo(e,this.getDuration(n,e),t)},n.animationEnd=function(){var t=this.getEventInfo();this._animateParam=null;var n=this.axisManager.filter(this.axisManager.get(),(function(t,n){return u(t,n.range,n.circular)}));Object.keys(n).length>0&&this.setTo(this.axisManager.map(n,(function(t,n){return h(t,n.range,n.circular)}))),this.interruptManager.setInterrupt(!1),this.eventManager.triggerAnimationEnd(!!t),this.axisManager.isOutside()?this.restore(t):this.finish(!!t)},n.finish=function(t){this._animateParam=null,this.interruptManager.setInterrupt(!1),this.eventManager.triggerFinish(t)},n.getUserControl=function(t){var n=t.setTo();return n.destPos=this.axisManager.get(n.destPos),n.duration=l(n.duration,this._options.minimumDuration,this._options.maximumDuration),n},n.animateTo=function(t,n,e){var i=this;this.stopAnimation();var r=this._createAnimationParam(t,n,e),s=Object.assign({},r.depaPos),a=this.eventManager.triggerAnimationStart(r),o=this.getUserControl(r);if(!a&&this.axisManager.every(o.destPos,(function(t,n){return u(t,n.range,n.circular)}))&&console.warn("You can't stop the 'animation' event when 'circular' is true."),a&&!(0,c.Dg)(o.destPos,s)){var h=(null==e?void 0:e.event)||null;this._animateLoop({depaPos:s,destPos:o.destPos,duration:o.duration,delta:this.axisManager.getDelta(s,o.destPos),isTrusted:!!h,inputEvent:h,input:(null==e?void 0:e.input)||null},(function(){return i.animationEnd()}))}},n.easing=function(t){return t>1?1:this._options.easing(t)},n.setTo=function(t,n){void 0===n&&(n=0);var e=Object.keys(t),i=this.axisManager.get(e);if((0,c.Dg)(t,i))return this;this.interruptManager.setInterrupt(!0);var r=(0,c.hX)(t,(function(t,n){return i[n]!==t}));return Object.keys(r).length?(r=this.axisManager.map(r,(function(t,n){var e=n.range,i=n.circular;return i&&(i[0]||i[1])?t:a(t,e,i)})),(0,c.Dg)(r,i)||(n>0?this.animateTo(r,n):(this.stopAnimation(),this.eventManager.triggerChange(r),this.finish(!1))),this):this},n.setBy=function(t,n){return void 0===n&&(n=0),this.setTo((0,c.UI)(this.axisManager.get(Object.keys(t)),(function(n,e){return n+t[e]})),n)},n.updateAnimation=function(t){var n=this._animateParam;if(n){var e=(new Date).getTime()-n.startTime,i=(null==t?void 0:t.destPos)||n.destPos,r=(null==t?void 0:t.duration)||n.duration;if(null!=t&&t.restart||r<=e)this.setTo(i,r-e);else{if(null!=t&&t.destPos){var s=this.axisManager.get();this._initialEasingPer=this._prevEasingPer,n.delta=this.axisManager.getDelta(s,i),n.destPos=i}if(null!=t&&t.duration){var a=(e+this._durationOffset)/n.duration;this._durationOffset=a*r-e,n.duration=r}}}},n._createAnimationParam=function(t,n,e){var i=this.axisManager.get(),r=t,s=(null==e?void 0:e.event)||null;return{depaPos:i,destPos:r,duration:l(n,this._options.minimumDuration,this._options.maximumDuration),delta:this.axisManager.getDelta(i,r),inputEvent:s,input:(null==e?void 0:e.input)||null,isTrusted:!!s,done:this.animationEnd}},n._animateLoop=function(t,n){var e=this;if(t.duration){var i=t.depaPos;this._initialEasingPer=0,this._prevEasingPer=0,this._durationOffset=0,this._animateParam=Object.assign({},t,{startTime:(new Date).getTime()});var r=(0,c.UI)(i,(function(n,e){return n<=t.destPos[e]?1:-1})),s=(0,c.UI)(t.destPos,(function(t){return t}));!function t(){var a=e._animateParam,o=((new Date).getTime()-a.startTime+e._durationOffset)/a.duration,u=e.easing(o);e._raf=null;var l=e.axisManager.map(i,(function(t,n,s){var c=o>=1?a.destPos[s]:t+a.delta[s]*(u-e._prevEasingPer)/(1-e._initialEasingPer),l=h(c,n.range,n.circular);if(c!==l){var v=r[s]*(n.range[1]-n.range[0]);a.destPos[s]-=v,i[s]-=v}return l})),v=!e.eventManager.triggerChange(l,i);if(i=l,e._prevEasingPer=u,u>=1)return a.destPos=e._getFinalPos(a.destPos,s),(0,c.Dg)(a.destPos,e.axisManager.get(Object.keys(a.destPos)))||e.eventManager.triggerChange(a.destPos,i),void n();v?e.finish(!1):e._raf=(0,c.U7)(t)}()}else this.eventManager.triggerChange(t.destPos),n()},n._getFinalPos=function(t,n){var e=this,i=1e-6;return(0,c.UI)(t,(function(t,r){if(t>=n[r]-i&&t<=n[r]+i)return n[r];var s=e._getRoundUnit(t,r);return(0,c.QV)(t,s)}))},n._getRoundUnit=function(t,n){var e=this._options.round,i=null;if(!e){var r=this.axisManager.getAxisOptions(n);i=(0,c.Dw)(Math.max((0,c.il)(r.range[0]),(0,c.il)(r.range[1]),(0,c.il)(t)))}return i||e},t}(),d=function(){function t(t){this._axes=t}var n=t.prototype;return n.hold=function(t,n){var e=this._getRoundPos(t).roundPos;this._axes.trigger(new s.L("hold",{pos:e,input:n.input||null,inputEvent:n.event||null,isTrusted:!0}))},n.triggerRelease=function(t){var n=this._getRoundPos(t.destPos,t.depaPos),e=n.roundPos,i=n.roundDepa;t.destPos=e,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration),this._axes.trigger(new s.L("release",Object.assign({},t,{bounceRatio:this._getBounceRatio(e)})))},n.triggerChange=function(t,n,e,i){void 0===i&&(i=!1);var r=this.animationManager,a=r.axisManager,o=r.getEventInfo(),u=this._getRoundPos(t,n),h=u.roundPos,c=u.roundDepa,l=a.moveTo(h,c),v=(null==e?void 0:e.event)||(null==o?void 0:o.event)||null,d={pos:l.pos,delta:l.delta,bounceRatio:this._getBounceRatio(l.pos),holding:i,inputEvent:v,isTrusted:!!v,input:(null==e?void 0:e.input)||(null==o?void 0:o.input)||null,set:v?this._createUserControll(l.pos):function(){}},f=new s.L("change",d);return this._axes.trigger(f),v&&a.set(d.set().destPos),!f.isCanceled()},n.triggerAnimationStart=function(t){var n=this._getRoundPos(t.destPos,t.depaPos),e=n.roundPos,i=n.roundDepa;t.destPos=e,t.depaPos=i,t.setTo=this._createUserControll(t.destPos,t.duration);var r=new s.L("animationStart",t);return this._axes.trigger(r),!r.isCanceled()},n.triggerAnimationEnd=function(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("animationEnd",{isTrusted:t}))},n.triggerFinish=function(t){void 0===t&&(t=!1),this._axes.trigger(new s.L("finish",{isTrusted:t}))},n.setAnimationManager=function(t){this.animationManager=t},n.destroy=function(){this._axes.off()},n._createUserControll=function(t,n){void 0===n&&(n=0);var e={destPos:Object.assign({},t),duration:n};return function(t,n){return t&&(e.destPos=Object.assign({},t)),void 0!==n&&(e.duration=n),e}},n._getRoundPos=function(t,n){var e=this._axes.options.round;return{roundPos:(0,c.UF)(t,e),roundDepa:(0,c.UF)(n,e)}},n._getBounceRatio=function(t){return this._axes.axisManager.map(t,(function(t,n){return t<n.range[0]&&0!==n.bounce[0]?(n.range[0]-t)/n.bounce[0]:t>n.range[1]&&0!==n.bounce[1]?(t-n.range[1])/n.bounce[1]:0}))},t}(),f=function(){function t(t){this._prevented=!1,this._options=t}var n=t.prototype;return n.isInterrupting=function(){return this._options.interruptable||this._prevented},n.isInterrupted=function(){return!this._options.interruptable&&this._prevented},n.setInterrupt=function(t){this._options.interruptable||(this._prevented=t)},t}(),g=function(){function t(t){var n=this;this._axis=t,this._complementOptions(),this._pos=Object.keys(this._axis).reduce((function(t,e){return t[e]=n._axis[e].range[0],t}),{})}var n=t.prototype;return n.getDelta=function(t,n){var e=this.get(t);return(0,c.UI)(this.get(n),(function(t,n){return t-e[n]}))},n.get=function(t){var n=this;return t&&Array.isArray(t)?t.reduce((function(t,e){return e&&e in n._pos&&(t[e]=n._pos[e]),t}),{}):Object.assign({},this._pos,t||{})},n.moveTo=function(t,n){void 0===n&&(n=this._pos);var e=(0,c.UI)(this._pos,(function(e,i){return i in t&&i in n?t[i]-n[i]:0}));return this.set(this.map(t,(function(t,n){return n?h(t,n.range,n.circular):0}))),{pos:Object.assign({},this._pos),delta:e}},n.set=function(t){for(var n in t)n&&n in this._pos&&(this._pos[n]=t[n])},n.every=function(t,n){var e=this._axis;return(0,c.yW)(t,(function(t,i){return n(t,e[i],i)}))},n.filter=function(t,n){var e=this._axis;return(0,c.hX)(t,(function(t,i){return n(t,e[i],i)}))},n.map=function(t,n){var e=this._axis;return(0,c.UI)(t,(function(t,i){return n(t,e[i],i)}))},n.isOutside=function(t){return!this.every(t?this.get(t):this._pos,(function(t,n){return!o(t,n.range)}))},n.getAxisOptions=function(t){return this._axis[t]},n._complementOptions=function(){var t=this;Object.keys(this._axis).forEach((function(n){t._axis[n]=Object.assign({},{range:[0,100],bounce:[0,0],circular:[!1,!1]},t._axis[n]),["bounce","circular"].forEach((function(e){var i=t._axis,r=i[n][e];/string|number|boolean/.test(typeof r)&&(i[n][e]=[r,r])}))}))},t}(),_=e(7242),p=function(){function t(t){var n=t.options,e=t.interruptManager,i=t.eventManager,r=t.axisManager,s=t.animationManager;this._isOutside=!1,this._moveDistance=null,this._isStopped=!1,this.options=n,this._interruptManager=e,this._eventManager=i,this._axisManager=r,this._animationManager=s}var n=t.prototype;return n.get=function(t){return this._axisManager.get(t.axes)},n.hold=function(t,n){if(!this._interruptManager.isInterrupted()&&t.axes.length){var e={input:t,event:n};this._isStopped=!1,this._interruptManager.setInterrupt(!0),this._animationManager.stopAnimation(e),this._moveDistance||this._eventManager.hold(this._axisManager.get(),e),this._isOutside=this._axisManager.isOutside(t.axes),this._moveDistance=this._axisManager.get(t.axes)}},n.change=function(t,n,e,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&!this._axisManager.every(e,(function(t){return 0===t}))){var r=n.srcEvent?n.srcEvent:n;if(!r.__childrenAxesAlreadyChanged){var s,a=this._moveDistance||this._axisManager.get(t.axes);s=(0,c.UI)(a,(function(t,n){return t+(e[n]||0)})),this._moveDistance&&(this._moveDistance=this._axisManager.map(s,(function(t,n){var e=n.circular,i=n.range;return e&&(e[0]||e[1])?h(t,i,e):t}))),this._isOutside&&this._axisManager.every(a,(function(t,n){return!o(t,n.range)}))&&(this._isOutside=!1),a=this._atOutside(a),s=this._atOutside(s),this.options.nested&&this._isEndofAxis(e,a,s)||(r.__childrenAxesAlreadyChanged=!0);var u={input:t,event:n};if(i){var l=this._animationManager.getDuration(s,a);this._animationManager.animateTo(s,l,u)}else{!this._eventManager.triggerChange(s,a,u,!0)&&(this._isStopped=!0,this._moveDistance=null,this._animationManager.finish(!1))}}}},n.release=function(t,n,e,i){if(!this._isStopped&&this._interruptManager.isInterrupting()&&this._moveDistance){var r=n.srcEvent?n.srcEvent:n;r.__childrenAxesAlreadyReleased&&(e=e.map((function(){return 0})));var s=this._axisManager.get(t.axes),o=this._axisManager.get(),u=this._animationManager.getDisplacement(e),h=(0,_.m)(t.axes,u),l=this._axisManager.get(this._axisManager.map(h,(function(t,n,e){return n.circular&&(n.circular[0]||n.circular[1])?s[e]+t:a(s[e]+t,n.range,n.circular,n.bounce)})));r.__childrenAxesAlreadyReleased=!0;var v=this._animationManager.getDuration(l,s,i);0===v&&(l=Object.assign({},o));var d={depaPos:o,destPos:l,duration:v,delta:this._axisManager.getDelta(o,l),inputEvent:n,input:t,isTrusted:!0};this._eventManager.triggerRelease(d),this._moveDistance=null;var f=this._animationManager.getUserControl(d),g=(0,c.Dg)(f.destPos,o),p={input:t,event:n};g||0===f.duration?(g||this._eventManager.triggerChange(f.destPos,o,p,!0),this._interruptManager.setInterrupt(!1),this._axisManager.isOutside()?this._animationManager.restore(p):this._eventManager.triggerFinish(!0)):this._animationManager.animateTo(f.destPos,f.duration,p)}},n._atOutside=function(t){var n=this;return this._isOutside?this._axisManager.map(t,(function(t,n){var e=n.range[0]-n.bounce[0],i=n.range[1]+n.bounce[1];return t>i?i:t<e?e:t})):this._axisManager.map(t,(function(t,e){var i=e.range[0],r=e.range[1],s=e.bounce,a=e.circular;return a&&(a[0]||a[1])?t:t<i?i-n._animationManager.interpolate(i-t,s[0]):t>r?r+n._animationManager.interpolate(t-r,s[1]):t}))},n._isEndofAxis=function(t,n,e){return this._axisManager.every(n,(function(i,r,s){return 0===t[s]||n[s]===e[s]&&(a=i,o=r.range,u=r.bounce,!(h=r.circular)[0]&&a===o[0]-u[0]||!h[1]&&a===o[1]+u[1]);var a,o,u,h}))},t}(),m=e(1229),E=function(t){function n(n,e,r){var s;return void 0===n&&(n={}),void 0===e&&(e={}),void 0===r&&(r=null),(s=t.call(this)||this)._inputs=[],s.axis=n,s.options=Object.assign({},{easing:function(t){return 1-Math.pow(1-t,3)},interruptable:!0,maximumDuration:1/0,minimumDuration:0,deceleration:6e-4,round:null,nested:!1},e),s.interruptManager=new f(s.options),s.axisManager=new g(s.axis),s.eventManager=new d((0,i.Z)(s)),s.animationManager=new v((0,i.Z)(s)),s.inputObserver=new p((0,i.Z)(s)),s.eventManager.setAnimationManager(s.animationManager),r&&s.eventManager.triggerChange(r),s}(0,r.Z)(n,t);var e=n.prototype;return e.connect=function(t,n){var e;return e="string"==typeof t?t.split(" "):t.concat(),~this._inputs.indexOf(n)&&this.disconnect(n),n.mapAxes(e),n.connect(this.inputObserver),this._inputs.push(n),this},e.disconnect=function(t){if(t){var n=this._inputs.indexOf(t);n>=0&&(this._inputs[n].disconnect(),this._inputs.splice(n,1))}else this._inputs.forEach((function(t){return t.disconnect()})),this._inputs=[];return this},e.get=function(t){return this.axisManager.get(t)},e.setTo=function(t,n){return void 0===n&&(n=0),this.animationManager.setTo(t,n),this},e.setBy=function(t,n){return void 0===n&&(n=0),this.animationManager.setBy(t,n),this},e.stopAnimation=function(){return this.animationManager.stopAnimation(),this},e.updateAnimation=function(t){return this.animationManager.updateAnimation(t),this},e.isBounceArea=function(t){return this.axisManager.isOutside(t)},e.destroy=function(){this.disconnect(),this.eventManager.destroy()},n}(s.Z);E.VERSION="#__VERSION__#",E.TRANSFORM=m.Up,E.DIRECTION_NONE=m.j9,E.DIRECTION_LEFT=m.AV,E.DIRECTION_RIGHT=m.EM,E.DIRECTION_UP=m.uO,E.DIRECTION_DOWN=m.C2,E.DIRECTION_HORIZONTAL=m.Xv,E.DIRECTION_VERTICAL=m.Et,E.DIRECTION_ALL=m.oM;var x=E},9854:function(t,n,e){var i;e.d(n,{u:function(){return i}}),i="undefined"==typeof window?{navigator:{userAgent:""}}:window},1229:function(t,n,e){e.d(n,{AV:function(){return a},C2:function(){return c},EM:function(){return o},Et:function(){return l},Up:function(){return m},Xv:function(){return u},YS:function(){return g},aE:function(){return E},ab:function(){return p},ej:function(){return f},j9:function(){return s},kZ:function(){return _},oM:function(){return v},sH:function(){return d},uO:function(){return h}});var i=e(3308),r=e(9854),s=1,a=2,o=4,u=6,h=8,c=16,l=24,v=30,d="left",f="right",g="middle",_=30,p="ontouchstart"in r.u&&"safari"===(0,i.Z)().browser.name,m=function(){if("undefined"==typeof document)return"";for(var t=(document.head||document.getElementsByTagName("head")[0]).style,n=["transform","webkitTransform","msTransform","mozTransform"],e=0,i=n.length;e<i;e++)if(n[e]in t)return n[e];return""}(),E={"touch-action":"none","user-select":"none","-webkit-user-drag":"none"}},4010:function(t,n,e){var i=e(1520);n.ZP=i.Z},7242:function(t,n,e){e.d(n,{J:function(){return p},m:function(){return _}});var i=e(4578),r=e(8519),s=e(9854),a=e(1229),o="ontouchstart"in s.u,u="PointerEvent"in s.u,h="MSPointerEvent"in s.u,c=u||h,l=function(){function t(){var t=this;this._stopContextMenu=function(n){n.preventDefault(),s.u.removeEventListener("contextmenu",t._stopContextMenu)}}var n=t.prototype;return n.extendEvent=function(t){var n=this.prevEvent,e=this._getCenter(t),i=n?this._getMovement(t):{x:0,y:0},s=n?this._getScale(t):1,a=n?(0,r._O)(e.x-n.center.x,e.y-n.center.y):0,o=n?n.deltaX+i.x:i.x,u=n?n.deltaY+i.y:i.y,h=n?o-n.deltaX:0,c=n?u-n.deltaY:0,l=n?t.timeStamp-n.srcEvent.timeStamp:0;return{srcEvent:t,scale:s,angle:a,center:e,deltaX:o,deltaY:u,offsetX:h,offsetY:c,velocityX:n&&0!==l?h/l:0,velocityY:n&&0!==l?c/l:0,preventSystemEvent:!0}},n._getDistance=function(t,n){var e=n.clientX-t.clientX,i=n.clientY-t.clientY;return Math.sqrt(e*e+i*i)},n._getButton=function(t){var n={1:a.sH,2:a.ej,4:a.YS},e=this._isTouchEvent(t)?a.sH:n[t.buttons];return e||null},n._isTouchEvent=function(t){return t.type.indexOf("touch")>-1},n._isValidButton=function(t,n){return n.indexOf(t)>-1},n._preventMouseButton=function(t,n){n===a.ej?s.u.addEventListener("contextmenu",this._stopContextMenu):n===a.YS&&t.preventDefault()},t}(),v=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["mousedown"],n.move=["mousemove"],n.end=["mouseup"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t,n){var e=this._getButton(t);return n&&!this._isValidButton(e,n)?null:(this._preventMouseButton(t,e),this.extendEvent(t))},e.onEventMove=function(t,n){return n&&!this._isValidButton(this._getButton(t),n)?null:this.extendEvent(t)},e.onEventEnd=function(){},e.onRelease=function(){this.prevEvent=null},e.getTouches=function(){return 0},e._getScale=function(){return 1},e._getCenter=function(t){return{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return{x:t.pageX-n.pageX,y:t.pageY-n.pageY}},n}(l),d=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["touchstart"],n.move=["touchmove"],n.end=["touchend","touchcancel"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t){return this._baseTouches=t.touches,this.extendEvent(t)},e.onEventMove=function(t){return this.extendEvent(t)},e.onEventEnd=function(t){this._baseTouches=t.touches},e.onRelease=function(){this.prevEvent=null,this._baseTouches=null},e.getTouches=function(t){return t.touches.length},e._getScale=function(t){return 2!==t.touches.length||this._baseTouches.length<2?null:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1])},e._getCenter=function(t){return{x:t.touches[0].clientX,y:t.touches[0].clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return t.touches[0].identifier!==n.touches[0].identifier?{x:0,y:0}:{x:t.touches[0].pageX-n.touches[0].pageX,y:t.touches[0].pageY-n.touches[0].pageY}},n}(l),f=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=u?["pointerdown"]:["MSPointerDown"],n.move=u?["pointermove"]:["MSPointerMove"],n.end=u?["pointerup","pointercancel"]:["MSPointerUp","MSPointerCancel"],n._firstInputs=[],n._recentInputs=[],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t,n){var e=this._getButton(t);return n&&!this._isValidButton(e,n)?null:(this._preventMouseButton(t,e),this._updatePointerEvent(t),this.extendEvent(t))},e.onEventMove=function(t,n){return n&&!this._isValidButton(this._getButton(t),n)?null:(this._updatePointerEvent(t),this.extendEvent(t))},e.onEventEnd=function(t){this._removePointerEvent(t)},e.onRelease=function(){this.prevEvent=null,this._firstInputs=[],this._recentInputs=[]},e.getTouches=function(){return this._recentInputs.length},e._getScale=function(){return 2!==this._recentInputs.length?null:this._getDistance(this._recentInputs[0],this._recentInputs[1])/this._getDistance(this._firstInputs[0],this._firstInputs[1])},e._getCenter=function(t){return{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this.prevEvent.srcEvent;return t.pointerId!==n.pointerId?{x:0,y:0}:{x:t.pageX-n.pageX,y:t.pageY-n.pageY}},e._updatePointerEvent=function(t){var n=this,e=!1;this._recentInputs.forEach((function(i,r){i.pointerId===t.pointerId&&(e=!0,n._recentInputs[r]=t)})),e||(this._firstInputs.push(t),this._recentInputs.push(t))},e._removePointerEvent=function(t){this._firstInputs=this._firstInputs.filter((function(n){return n.pointerId!==t.pointerId})),this._recentInputs=this._recentInputs.filter((function(n){return n.pointerId!==t.pointerId}))},n}(l),g=function(t){function n(){for(var n,e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))||this).start=["mousedown","touchstart"],n.move=["mousemove","touchmove"],n.end=["mouseup","touchend","touchcancel"],n}(0,i.Z)(n,t);var e=n.prototype;return e.onEventStart=function(t,n){var e=this._getButton(t);return this._isTouchEvent(t)&&(this._baseTouches=t.touches),n&&!this._isValidButton(e,n)?null:(this._preventMouseButton(t,e),this.extendEvent(t))},e.onEventMove=function(t,n){return n&&!this._isValidButton(this._getButton(t),n)?null:this.extendEvent(t)},e.onEventEnd=function(t){this._isTouchEvent(t)&&(this._baseTouches=t.touches)},e.onRelease=function(){this.prevEvent=null,this._baseTouches=null},e.getTouches=function(t){return this._isTouchEvent(t)?t.touches.length:0},e._getScale=function(t){return this._isTouchEvent(t)?2!==t.touches.length||this._baseTouches.length<2?1:this._getDistance(t.touches[0],t.touches[1])/this._getDistance(this._baseTouches[0],this._baseTouches[1]):this.prevEvent.scale},e._getCenter=function(t){return this._isTouchEvent(t)?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},e._getMovement=function(t){var n=this,e=this.prevEvent.srcEvent,i=[t,e].map((function(e){return n._isTouchEvent(t)?{id:e.touches[0].identifier,x:e.touches[0].pageX,y:e.touches[0].pageY}:{id:null,x:e.pageX,y:e.pageY}})),r=i[0],s=i[1];return r.id===s.id?{x:r.x-s.x,y:r.y-s.y}:{x:0,y:0}},n}(l),_=function(t,n){return n.reduce((function(n,e,i){return t[i]&&(n[t[i]]=e),n}),{})},p=function(t){void 0===t&&(t=[]);var n=!1,e=!1,i=!1;return t.forEach((function(t){switch(t){case"mouse":e=!0;break;case"touch":n=o;break;case"pointer":i=c}})),i?new f:n&&e?new g:n?new d:e?new v:null}},4003:function(t,n,e){e.d(n,{f3:function(){return s}});var i=e(8519),r=e(7242),s=function(){function t(t,n){this.axes=[],this.element=null,this._enabled=!1,this._holding=!1,this._timer=null,this.element=(0,i.$)(t),this.options=Object.assign({},{scale:[1,1]},n),this._onKeydown=this._onKeydown.bind(this),this._onKeyup=this._onKeyup.bind(this)}var n=t.prototype;return n.mapAxes=function(t){this.axes=t},n.connect=function(t){return this._detachEvent(),"0"!==this.element.getAttribute("tabindex")&&this.element.setAttribute("tabindex","0"),this._attachEvent(t),this},n.disconnect=function(){return this._detachEvent(),this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onKeydown=function(t){if(this._enabled){var n=!0,e=1,i=-1;switch(t.keyCode){case 37:case 65:e=-1;break;case 39:case 68:break;case 40:case 83:e=-1,i=1;break;case 38:case 87:i=1;break;default:n=!1}if((-1===i&&!this.axes[0]||1===i&&!this.axes[1])&&(n=!1),n){t.preventDefault();var s=-1===i?[+this.options.scale[0]*e,0]:[0,+this.options.scale[1]*e];this._holding||(this._observer.hold(this,t),this._holding=!0),clearTimeout(this._timer),this._observer.change(this,t,(0,r.m)(this.axes,s))}}},n._onKeyup=function(t){var n=this;this._holding&&(clearTimeout(this._timer),this._timer=setTimeout((function(){n._observer.release(n,t,[0,0]),n._holding=!1}),80))},n._attachEvent=function(t){this._observer=t,this.element.addEventListener("keydown",this._onKeydown,!1),this.element.addEventListener("keypress",this._onKeydown,!1),this.element.addEventListener("keyup",this._onKeyup,!1),this._enabled=!0},n._detachEvent=function(){this.element.removeEventListener("keydown",this._onKeydown,!1),this.element.removeEventListener("keypress",this._onKeydown,!1),this.element.removeEventListener("keyup",this._onKeyup,!1),this._enabled=!1,this._observer=null},t}()},6389:function(t,n,e){e.d(n,{Ju:function(){return o}});var i=e(8519),r=e(1229),s=e(7242),a=function(t,n,e){return e?!!(n===r.oM||n&t&&e&t):!!(n&t)},o=function(){function t(t,n){var e=this;this.axes=[],this.element=null,this._enabled=!1,this._activeEvent=null,this._atRightEdge=!1,this._rightEdgeTimer=0,this._forceRelease=function(){var t=e._activeEvent;e._detachWindowEvent(t),e._observer.release(e,t.prevEvent,[0,0]),t.onRelease()},this.element=(0,i.$)(t),this.options=Object.assign({inputType:["touch","mouse","pointer"],inputButton:[r.sH],scale:[1,1],thresholdAngle:45,threshold:0,iOSEdgeSwipeThreshold:r.kZ,releaseOnScroll:!1},n),this._onPanstart=this._onPanstart.bind(this),this._onPanmove=this._onPanmove.bind(this),this._onPanend=this._onPanend.bind(this)}var n=t.prototype;return n.mapAxes=function(t){var n=!!t[0],e=!!t[1];this._direction=n&&e?r.oM:n?r.Xv:e?r.Et:r.j9,this.axes=t},n.connect=function(t){return this._activeEvent&&(this._detachElementEvent(),this._detachWindowEvent(this._activeEvent)),this._attachElementEvent(t),this._originalCssProps=(0,i.lH)(this.element),this},n.disconnect=function(){return this._detachElementEvent(),this._detachWindowEvent(this._activeEvent),this._originalCssProps!==r.aE&&(0,i.lH)(this.element,this._originalCssProps),this._direction=r.j9,this},n.destroy=function(){this.disconnect(),this.element=null},n.enable=function(){return this._enabled=!0,this},n.disable=function(){return this._enabled=!1,this},n.isEnabled=function(){return this._enabled},n._onPanstart=function(t){var n=this._activeEvent,e=n.onEventStart(t,this.options.inputButton);if(e&&this._enabled&&!(n.getTouches(t)>1)&&!1!==e.srcEvent.cancelable){var i=this.options.iOSEdgeSwipeThreshold;this._observer.hold(this,e),this._atRightEdge=r.ab&&e.center.x>window.innerWidth-i,this._attachWindowEvent(n),n.prevEvent=e}},n._onPanmove=function(t){var n=this,e=this._activeEvent,i=e.onEventMove(t,this.options.inputButton);if(i&&this._enabled&&!(e.getTouches(t)>1)){var o=this.options,u=o.iOSEdgeSwipeThreshold,h=o.releaseOnScroll,c=function(t,n){if(n<0||n>90)return r.j9;var e=Math.abs(t);return e>n&&e<180-n?r.Et:r.Xv}(i.angle,this.options.thresholdAngle);if(!h||i.srcEvent.cancelable){if(e.prevEvent&&r.ab){if(i.center.x<0)return void this._forceRelease();this._atRightEdge&&(clearTimeout(this._rightEdgeTimer),i.deltaX<-u?this._atRightEdge=!1:this._rightEdgeTimer=window.setTimeout((function(){return n._forceRelease()}),100))}var l=this._getOffset([i.offsetX,i.offsetY],[a(r.Xv,this._direction,c),a(r.Et,this._direction,c)]),v=l.some((function(t){return 0!==t}));v&&(!1!==i.srcEvent.cancelable&&i.srcEvent.preventDefault(),i.srcEvent.stopPropagation()),i.preventSystemEvent=v,v&&this._observer.change(this,i,(0,s.m)(this.axes,l)),e.prevEvent=i}else this._onPanend(t)}},n._onPanend=function(t){var n=this._activeEvent;if(n.onEventEnd(t),this._enabled&&0===n.getTouches(t)){this._detachWindowEvent(n),clearTimeout(this._rightEdgeTimer);var e=n.prevEvent,i=this._getOffset([Math.abs(e.velocityX)*(e.offsetX<0?-1:1),Math.abs(e.velocityY)*(e.offsetY<0?-1:1)],[a(r.Xv,this._direction),a(r.Et,this._direction)]);this._observer.release(this,e,i),n.onRelease()}},n._attachWindowEvent=function(t){var n=this;null==t||t.move.forEach((function(t){window.addEventListener(t,n._onPanmove)})),null==t||t.end.forEach((function(t){window.addEventListener(t,n._onPanend)}))},n._detachWindowEvent=function(t){var n=this;null==t||t.move.forEach((function(t){window.removeEventListener(t,n._onPanmove)})),null==t||t.end.forEach((function(t){window.removeEventListener(t,n._onPanend)}))},n._attachElementEvent=function(t){var n=this,e=(0,s.J)(this.options.inputType);if(!e)throw new Error("There is currently no inputType available for current device. There must be at least one available inputType.");this._observer=t,this._enabled=!0,this._activeEvent=e,null==e||e.start.forEach((function(t){var e;null==(e=n.element)||e.addEventListener(t,n._onPanstart)}))},n._detachElementEvent=function(){var t=this,n=this._activeEvent;null==n||n.start.forEach((function(n){var e;null==(e=t.element)||e.removeEventListener(n,t._onPanstart)})),this._enabled=!1,this._observer=null},n._getOffset=function(t,n){var e=[0,0],i=this.options.scale;return n[0]&&(e[0]=t[0]*i[0]),n[1]&&(e[1]=t[1]*i[1]),e},t}()},8519:function(t,n,e){e.d(n,{$:function(){return a},Dg:function(){return _},Dw:function(){return M},QV:function(){return m},U7:function(){return l},UF:function(){return E},UI:function(){return d},Wx:function(){return v},_O:function(){return b},hX:function(){return f},il:function(){return x},lH:function(){return P},yW:function(){return g}});var i=e(9854),r=e(1229),s=function(t){for(var n=[],e=0,i=t.length;e<i;e++)n.push(t[e]);return n},a=function t(n,e){var r;if(void 0===e&&(e=!1),"string"==typeof n){if(n.match(/^<([a-z]+)\s*([^>]*)>/)){var a=document.createElement("div");a.innerHTML=n,r=s(a.childNodes)}else r=s(document.querySelectorAll(n));e||(r=r.length>=1?r[0]:void 0)}else n===i.u?r=n:!n.nodeName||1!==n.nodeType&&9!==n.nodeType?"jQuery"in i.u&&n instanceof jQuery||n.constructor.prototype.jquery?r=e?n.toArray():n.get(0):Array.isArray(n)&&(r=n.map((function(n){return t(n)})),e||(r=r.length>=1?r[0]:void 0)):r=n;return r},o=i.u.requestAnimationFrame||i.u.webkitRequestAnimationFrame,u=i.u.cancelAnimationFrame||i.u.webkitCancelAnimationFrame;if(o&&!u){var h={},c=o;o=function(t){var n=c((function(e){h[n]&&t(e)}));return h[n]=!0,n},u=function(t){delete h[t]}}else o&&u||(o=function(t){return i.u.setTimeout((function(){t(i.u.performance&&i.u.performance.now&&i.u.performance.now()||(new Date).getTime())}),16)},u=i.u.clearTimeout);var l=function(t){return o(t)},v=function(t){u(t)},d=function(t,n){var e={};for(var i in t)i&&(e[i]=n(t[i],i));return e},f=function(t,n){var e={};for(var i in t)i&&n(t[i],i)&&(e[i]=t[i]);return e},g=function(t,n){for(var e in t)if(e&&!n(t[e],e))return!1;return!0},_=function(t,n){return g(t,(function(t,e){return t===n[e]}))},p={},m=function(t,n){return p[n]||(p[n]=y(n)),p[n](t)},E=function(t,n){return t&&n?d(t,(function(t,e){return m(t,"number"==typeof n?n:n[e])})):t},x=function(t){if(!isFinite(t))return 0;var n=""+t;if(n.indexOf("e")>=0){for(var e=0,i=1;Math.round(t*i)/i!==t;)i*=10,e++;return e}return n.indexOf(".")>=0?n.length-n.indexOf(".")-1:0},M=function(t){return 1/Math.pow(10,t)},y=function(t){var n=t<1?Math.pow(10,x(t)):1;return function(e){return 0===t?0:Math.round(Math.round(e/t)*t*n)/n}},b=function(t,n){return 180*Math.atan2(n,t)/Math.PI},P=function(t,n){var e={};if(t&&t.style){var i=n||r.aE;Object.keys(i).forEach((function(n){e[n]=t.style[n],t.style[n]=i[n]}))}return e}}}]);