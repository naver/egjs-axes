"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[3237,891],{1315:function(e,t,n){n.d(t,{Z:function(){return C}});var a=n(7462),l=n(7294),c=n(6010),r={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},s={Prism:n(7410).default,theme:r};function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)}var m=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},p=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},d=function(e,t){var n=e.plain,a=Object.create(null),l=e.styles.reduce((function(e,n){var a=n.languages,l=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=i({},e[t],l);e[t]=n})),e}),a);return l.root=n,l.plain=i({},n,{backgroundColor:null}),l};function g(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}var f=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),o(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?d(e.theme,e.language):void 0;return t.themeDict=n})),o(this,"getLineProps",(function(e){var n=e.key,a=e.className,l=e.style,c=i({},g(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),r=t.getThemeDict(t.props);return void 0!==r&&(c.style=r.plain),void 0!==l&&(c.style=void 0!==c.style?i({},c.style,l):l),void 0!==n&&(c.key=n),a&&(c.className+=" "+a),c})),o(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,l=n.length,c=t.getThemeDict(t.props);if(void 0!==c){if(1===l&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===l&&!a)return c[n[0]];var r=a?{display:"inline-block"}:{},s=n.map((function(e){return c[e]}));return Object.assign.apply(Object,[r].concat(s))}})),o(this,"getTokenProps",(function(e){var n=e.key,a=e.className,l=e.style,c=e.token,r=i({},g(e,["key","className","style","token"]),{className:"token "+c.types.join(" "),children:c.content,style:t.getStyleForToken(c),key:void 0});return void 0!==l&&(r.style=void 0!==r.style?i({},r.style,l):l),void 0!==n&&(r.key=n),a&&(r.className+=" "+a),r})),o(this,"tokenize",(function(e,t,n,a){var l={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",l);var c=l.tokens=e.tokenize(l.code,l.grammar,l.language);return e.hooks.run("after-tokenize",l),c}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,l=e.children,c=this.getThemeDict(this.props),r=t.languages[n];return l({tokens:function(e){for(var t=[[]],n=[e],a=[0],l=[e.length],c=0,r=0,s=[],o=[s];r>-1;){for(;(c=a[r]++)<l[r];){var i=void 0,d=t[r],g=n[r][c];if("string"==typeof g?(d=r>0?d:["plain"],i=g):(d=p(d,g.type),g.alias&&(d=p(d,g.alias)),i=g.content),"string"==typeof i){var f=i.split(m),y=f.length;s.push({types:d,content:f[0]});for(var h=1;h<y;h++)u(s),o.push(s=[]),s.push({types:d,content:f[h]})}else r++,t.push(d),n.push(i),a.push(0),l.push(i.length)}r--,t.pop(),n.pop(),a.pop(),l.pop()}return u(s),o}(void 0!==r?this.tokenize(t,a,r,n):[a]),className:"prism-code language-"+n,style:void 0!==c?c.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(l.Component),y=f;var h=n(5999),b=n(3725),E="codeBlockContainer_I0IT",v="codeBlockContent_wNvx",k="codeBlockTitle_BvAR",N="codeBlock_jd64",Z="codeBlockStandalone_csWH",x="copyButton_wuS7",z="codeBlockLines_mRuA";function C(e){var t,n=e.children,r=e.className,o=void 0===r?"":r,i=e.metastring,m=e.title,u=e.language,p=(0,b.LU)().prism,d=(0,l.useState)(!1),g=d[0],f=d[1],C=(0,l.useState)(!1),w=C[0],O=C[1];(0,l.useEffect)((function(){O(!0)}),[]);var j=(0,b.bc)(i)||m,T=(0,b.pJ)();if(l.Children.toArray(n).some((function(e){return(0,l.isValidElement)(e)})))return l.createElement(y,(0,a.Z)({},s,{key:String(w),theme:T,code:"",language:"text"}),(function(e){var t=e.className,a=e.style;return l.createElement("pre",{tabIndex:0,className:(0,c.Z)(t,Z,"thin-scrollbar",E,o,b.kM.common.codeBlock),style:a},l.createElement("code",{className:z},n))}));var S=Array.isArray(n)?n.join(""):n,B=null!=(t=null!=u?u:(0,b.Vo)(o))?t:p.defaultLanguage,L=(0,b.nZ)(S,i,B),P=L.highlightLines,_=L.code,A=function(){!function(e,{target:t=document.body}={}){const n=document.createElement("textarea"),a=document.activeElement;n.value=e,n.setAttribute("readonly",""),n.style.contain="strict",n.style.position="absolute",n.style.left="-9999px",n.style.fontSize="12pt";const l=document.getSelection();let c=!1;l.rangeCount>0&&(c=l.getRangeAt(0)),t.append(n),n.select(),n.selectionStart=0,n.selectionEnd=e.length;let r=!1;try{r=document.execCommand("copy")}catch{}n.remove(),c&&(l.removeAllRanges(),l.addRange(c)),a&&a.focus()}(_),f(!0),setTimeout((function(){return f(!1)}),2e3)};return l.createElement(y,(0,a.Z)({},s,{key:String(w),theme:T,code:_,language:null!=B?B:"text"}),(function(e){var t,n=e.className,r=e.style,s=e.tokens,i=e.getLineProps,m=e.getTokenProps;return l.createElement("div",{className:(0,c.Z)(E,o,(t={},t["language-"+B]=B&&!o.includes("language-"+B),t),b.kM.common.codeBlock)},j&&l.createElement("div",{style:r,className:k},j),l.createElement("div",{className:(0,c.Z)(v,B)},l.createElement("pre",{tabIndex:0,className:(0,c.Z)(n,N,"thin-scrollbar"),style:r},l.createElement("code",{className:z},s.map((function(e,t){1===e.length&&"\n"===e[0].content&&(e[0].content="");var n=i({line:e,key:t});return P.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),l.createElement("span",(0,a.Z)({key:t},n),e.map((function(e,t){return l.createElement("span",(0,a.Z)({key:t},m({token:e,key:t})))})),l.createElement("br",null))})))),l.createElement("button",{type:"button","aria-label":(0,h.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,c.Z)(x,"clean-btn"),onClick:A},g?l.createElement(h.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):l.createElement(h.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},6214:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var a,l=n(4578),c=n(7294),r=n(6010),s=n(2773),o=n(9960),i=n(1315),m=["title","titleId"];function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},u.apply(this,arguments)}function p(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var d=function(e){var t=e.title,n=e.titleId,l=p(e,m);return c.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",width:453.333,height:453.333,viewBox:"0 0 340 340","aria-labelledby":n},l),t?c.createElement("title",{id:n},t):null,a||(a=c.createElement("path",{d:"M21 61.5V94l32.3-.2 32.2-.3.3-32.3L86 29H21v32.5zm60.8-.3-.3 28.3-28.2.3L25 90V33h57l-.2 28.2zM299.3 48.2c-2.9 1.4-2.9 1.4.4 8.8l2.6 6.1-6.9 7-6.8 6.9h4.6c4.2 0 4.9-.4 8.1-4.2l3.5-4.2 2.1 4.2c2 3.9 2.5 4.2 6.1 4.2 2.2 0 4-.2 4-.5s-1.1-2.7-2.4-5.3c-4.3-8.7-4.3-8.6 1.8-15.6 3.1-3.5 5.6-6.7 5.6-7 0-.3-1.7-.6-3.7-.6-3.2.1-4.3.7-6.8 4-1.6 2.1-3.2 3.9-3.6 4-.3 0-1.5-2-2.7-4.5-2.3-4.8-2.5-4.9-5.9-3.3zM108.1 60.7c0 1.2 13.9 12 38 29.6l37.9 27.9-26.2 20c-14.5 11-31.6 23.9-38 28.7-6.4 4.7-11.7 9.3-11.7 10.1-.1.9 9.5 7.8 23.4 16.9 13.8 9.1 23.4 16 23.1 16.7-.5 1.3-39.5 57.1-43.8 62.5-5.8 7.5-11.8 6.9 75.5 6.7 59.7-.2 78.2-.6 78.2-1.5 0-.6-17-12.5-37.9-26.3-20.8-13.8-37.6-25.3-37.4-25.5.2-.3 17.3-12 37.9-26.1 20.6-14 37.4-26 37.4-26.7 0-.6-11.5-9.6-25.5-19.9-14-10.4-25.4-19.1-25.4-19.4.1-.3 11.7-17 25.8-37 14.1-20.1 25.4-36.9 25.1-37.4-.4-.6-29.5-1-78.6-1-73.5 0-77.9.1-77.8 1.7zm146.4 3.9c-1.1.8-16.3 12.4-33.8 25.7-17.6 13.3-32.6 24.2-33.5 24.1-1.4 0-65.9-46.9-69.6-50.5-.6-.5 26.7-.9 69-.9 62.5.1 69.7.2 67.9 1.6zm-6.6 13.6c-2.8 4-12.3 17.7-21.2 30.5-8.9 12.8-16.5 23.2-16.8 23.2-.3.1-4.7-3-9.8-6.8l-9.2-6.9 12.3-9.4c33-25.3 49.3-37.8 49.6-37.8.1 0-2 3.3-4.9 7.2zm-50.4 49.9c5.8 4.3 9.4 7.7 9.1 8.4-.3.8-6 9.3-12.8 18.9-7.5 10.8-13.1 17.8-14.3 18-3.8.9-62.9 1.7-62.1.9 1.6-1.6 69.1-53.2 69.7-53.2.4-.1 5 3.1 10.4 7zm42.3 44c-22.2.8-52.8 1-52.8.3 0-.5 15.7-23.1 21.7-31.1l2.3-3.2 22.6 16.7 22.5 16.7-16.3.6zm15.1 4.3c-2.9 2.7-68.8 47-69.9 47-.8 0-6.6-3.3-12.8-7.3l-11.3-7.3 2.4-3.2c1.3-1.7 6.1-8.5 10.7-15.1s8.5-12.2 8.8-12.5c.2-.3 10.3-.7 22.5-1 33.5-.8 50.1-1 49.6-.6zm-86.7 15.5c-5.3 7.7-10 14-10.5 14-.4.1-9.8-6-20.9-13.4l-20.2-13.4 11.5-.4c6.3-.1 20-.4 30.6-.5l19.2-.2-9.7 13.9zm11.5 35.8c-1.8 1.7-59.9 41.4-60.2 41.1-.3-.2 29.8-43.5 37.5-54l2-2.8 11 7.3c8.4 5.5 10.6 7.5 9.7 8.4zm41 25.3 34.8 23H116.7l33.4-22.9c18.4-12.7 34-23 34.6-23 .7-.1 16.9 10.2 36 22.9zM34.3 166.8l-18.2 31.7 36.6.3c20.1.1 36.8 0 37-.2.5-.5-35.9-63.6-36.6-63.6-.3 0-8.8 14.3-18.8 31.8zm34.1 1.8c8.1 14.1 14.6 25.8 14.3 26-.2.2-13.7.3-30.1.2l-29.6-.3 14.7-25.7c8.2-14.2 15.1-25.7 15.4-25.8.3 0 7.2 11.5 15.3 25.6zM303.5 154l-4 1.7-1.9 10.7c-1.5 8.4-1.7 11.2-.8 13.1 1.5 3.2 4.8 4.5 8.5 3.4 2.8-.8 2.8-.7 2.1 2.4-1.2 5.8-3.2 8.7-6.1 8.7-1.5 0-3.5-.8-4.5-1.7-1.8-1.6-2-1.6-4.3 1.2l-2.4 3 2 1.7c1.4 1.2 3.8 1.8 7 1.8 4 0 5.4-.5 8.4-3.1 2-1.8 4.2-4.4 5-5.9 1.6-3.1 9.5-33.8 9.5-37v-2l-4 2c-3.8 1.9-4 2.3-5.7 10.2-1.3 6.4-2.4 9-4.6 11.2-4.7 4.8-5.3 2.3-2.2-10.4 1.4-6.1 2.5-11.5 2.3-11.9-.2-.5-2.1-.1-4.3.9zM46 244.4c-11.3 2.5-19.8 9.5-24.6 20.1-2.3 4.9-2.8 7.4-2.7 13.5.1 14.2 7.3 25.9 19.8 31.7 5.2 2.4 7.2 2.8 15 2.8 8.1-.1 9.6-.4 15-3.2 7.6-4 12.6-9.2 16.2-16.8 3.7-7.9 3.9-20.3.5-27.8-7-15.6-23.1-23.9-39.2-20.3zm17 4.8c8.7 2.4 16.8 11 19.6 20.5 5.9 20.4-10.7 40.8-32 39.1-20.9-1.7-34.2-24-25.4-42.9C32 251 46.7 244.5 63 249.2zM299 265.9c0 1.1-.3 2.6-.6 3.5-.5 1.3.2 1.6 4 1.6 2.5 0 4.6.3 4.6.7 0 .5-3.2 4.6-7 9.2-4.1 4.9-6.8 9.1-6.5 9.9.3.7.5 1.6.5 1.8 0 .2 4.7.4 10.5.4H315v-3c0-1.7.1-3.3.3-3.7.1-.4-2.4-.6-5.5-.4-3.2.1-5.8-.1-5.8-.5s2.6-3.9 5.8-7.7c8-9.9 8.3-10.3 7.6-12.1-.5-1.3-2.3-1.6-9.5-1.6-8.1 0-8.9.2-8.9 1.9z"})))},g="mainImg_gC9g",f="max400_OcVf",y="packageName_fLHg",h="badges_vovK",b="btnsWrapper_Sf2B",E=function(e){function t(){return e.apply(this,arguments)||this}return(0,l.Z)(t,e),t.prototype.render=function(){return c.createElement(s.Z,null,c.createElement("div",{className:"container pb-6"},c.createElement("div",{className:f},c.createElement(d,{className:g})),c.createElement("section",{className:"py-4"},c.createElement("div",{className:(0,r.Z)(y,"is-size-1","has-text-centered","mb-4")},"Axes"),c.createElement("div",{className:(0,r.Z)(h,"mb-2")},c.createElement("img",{alt:"npm (scoped)",src:"https://img.shields.io/npm/v/@egjs/axes?logo=npm"}),c.createElement("img",{alt:"License",src:"https://img.shields.io/github/license/naver/egjs-axes"}),c.createElement("img",{alt:"Typescript",src:"https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript"}),c.createElement("img",{alt:"GitHub Repo stars",src:"https://img.shields.io/github/stars/naver/egjs-axes?style=social"})),c.createElement(i.Z,{className:(0,r.Z)(f,"language-shell")},"npm install @egjs/axes"),c.createElement("div",{className:"subtitle has-text-centered"},"You can easily create a UI that responds to user actions."),c.createElement("div",{className:b},c.createElement(o.Z,{className:"button mr-2",to:"/docs"},"\ud83d\ude80 Get Started"),c.createElement(o.Z,{className:"button",to:"/docs/axes"},"\u2728 Demos"))),c.createElement("section",{className:"py-6"},c.createElement("div",{className:"title mb-6 has-text-centered"},"Demos"),c.createElement("ul",{className:"demo-list"},c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/axes"},c.createElement("p",null,c.createElement("img",{src:n(9726).Z})),c.createElement("p",null,"What is eg.Axes?"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/car360viewer"},c.createElement("p",null,c.createElement("img",{src:n(278).Z})),c.createElement("p",null,"Car 360\xba Viewer"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/cube"},c.createElement("p",null,c.createElement("img",{src:n(856).Z})),c.createElement("p",null,"Rotate a Cube"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/3dcarousel"},c.createElement("p",null,c.createElement("img",{src:n(3189).Z})),c.createElement("p",null,"3D Carousel"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/cardinhand"},c.createElement("p",null,c.createElement("img",{src:n(8440).Z})),c.createElement("p",null,"Cards in hands"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/pulltorefresh"},c.createElement("p",null,c.createElement("img",{src:n(2417).Z})),c.createElement("p",null,"Pull to Refresh"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/minimap"},c.createElement("p",null,c.createElement("img",{src:n(2724).Z})),c.createElement("p",null,"Mini Map"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/bubble"},c.createElement("p",null,c.createElement("img",{src:n(9045).Z})),c.createElement("p",null,"Bubble"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/subway"},c.createElement("p",null,c.createElement("img",{src:n(790).Z})),c.createElement("p",null,"Subway"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/schedule"},c.createElement("p",null,c.createElement("img",{src:n(6504).Z})),c.createElement("p",null,"Schedule"))),c.createElement("li",{className:"demo-item"},c.createElement("a",{href:"docs/nestedaxes"},c.createElement("p",null,c.createElement("img",{src:n(8342).Z})),c.createElement("p",null,"Nested Axes")))))))},t}(c.Component),v=E},9754:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var a=n(7294),l=n(6214);function c(){return a.createElement(l.default,null)}},3189:function(e,t,n){t.Z=n.p+"assets/images/3dcarousel-c26d6f525bc990118b26e43d7945bd34.gif"},9726:function(e,t,n){t.Z=n.p+"assets/images/axes-4a2cf07748b35dc49ab13fc31f9da298.gif"},9045:function(e,t,n){t.Z=n.p+"assets/images/bubble-3dc0bbe615cd40d19e6bc8f81b96834a.gif"},278:function(e,t,n){t.Z=n.p+"assets/images/car360viewer-d277517758ffda9e592ff70fff4b0280.gif"},8440:function(e,t,n){t.Z=n.p+"assets/images/cardinhand-00c709d2fa762fbecd99b1d770e44878.gif"},856:function(e,t,n){t.Z=n.p+"assets/images/cube-d46dc806c71ad337595250cedbf19067.gif"},2724:function(e,t,n){t.Z=n.p+"assets/images/minimap-30da6f1d0d1ef37631de2db4ea70c24f.gif"},8342:function(e,t,n){t.Z=n.p+"assets/images/nestedaxes-454958ecc10bae370ba6168aa3902563.gif"},2417:function(e,t,n){t.Z=n.p+"assets/images/pulltorefresh-16db3a253dec235ae527ace907cc0469.gif"},6504:function(e,t,n){t.Z=n.p+"assets/images/schedule-75bcd287a204db7f6b5cc4581dac21e5.gif"},790:function(e,t,n){t.Z=n.p+"assets/images/subway-41a57b06d987c29180b3f594ea01d061.gif"}}]);