"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9866],{876:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(2784);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),i=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=i(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=i(n),m=o,y=d["".concat(s,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(y,l(l({ref:t},u),{},{components:n})):r.createElement(y,l({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var i=2;i<a;i++)l[i]=n[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2676:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(7896),o=n(2784),a=n(6277);const l={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var c={Prism:n(7175).default,theme:l};function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}var u=/\r\n|\r|\n/,p=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},d=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},m=function(e,t){var n=e.plain,r=Object.create(null),o=e.styles.reduce((function(e,n){var r=n.languages,o=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=i({},e[t],o);e[t]=n})),e}),r);return o.root=n,o.plain=i({},n,{backgroundColor:null}),o};function y(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}const f=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),s(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?m(e.theme,e.language):void 0;return t.themeDict=n})),s(this,"getLineProps",(function(e){var n=e.key,r=e.className,o=e.style,a=i({},y(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(a.style=l.plain),void 0!==o&&(a.style=void 0!==a.style?i({},a.style,o):o),void 0!==n&&(a.key=n),r&&(a.className+=" "+r),a})),s(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,o=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===o&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===o&&!r)return a[n[0]];var l=r?{display:"inline-block"}:{},c=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[l].concat(c))}})),s(this,"getTokenProps",(function(e){var n=e.key,r=e.className,o=e.style,a=e.token,l=i({},y(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==o&&(l.style=void 0!==l.style?i({},l.style,o):o),void 0!==n&&(l.key=n),r&&(l.className+=" "+r),l})),s(this,"tokenize",(function(e,t,n,r){var o={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",o);var a=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,o=e.children,a=this.getThemeDict(this.props),l=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],r=[0],o=[e.length],a=0,l=0,c=[],s=[c];l>-1;){for(;(a=r[l]++)<o[l];){var i=void 0,m=t[l],y=n[l][a];if("string"==typeof y?(m=l>0?m:["plain"],i=y):(m=d(m,y.type),y.alias&&(m=d(m,y.alias)),i=y.content),"string"==typeof i){var f=i.split(u),g=f.length;c.push({types:m,content:f[0]});for(var v=1;v<g;v++)p(c),s.push(c=[]),c.push({types:m,content:f[v]})}else l++,t.push(m),n.push(i),r.push(0),o.push(i.length)}l--,t.pop(),n.pop(),r.pop(),o.pop()}return p(c),s}(void 0!==l?this.tokenize(t,r,l,n):[r]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component);var g=n(1077),v=n(9155);const h="codeBlockContainer_iq8S",b="codeBlockContent_U58x",k="codeBlockTitle_bZYx",E="codeBlock_UzyX",O="codeBlockStandalone_TOuF",T="copyButton_YRtT",N="codeBlockLines_WYyR";function w(e){var t;let{children:n,className:l="",metastring:s,title:i,language:u}=e;const{prism:p}=(0,v.LU)(),[d,m]=(0,o.useState)(!1),[y,w]=(0,o.useState)(!1);(0,o.useEffect)((()=>{w(!0)}),[]);const j=(0,v.bc)(s)||i,x=(0,v.pJ)();if(o.Children.toArray(n).some((e=>(0,o.isValidElement)(e))))return o.createElement(f,(0,r.Z)({},c,{key:String(y),theme:x,code:"",language:"text"}),(e=>{let{className:t,style:r}=e;return o.createElement("pre",{tabIndex:0,className:(0,a.Z)(t,O,"thin-scrollbar",h,l,v.kM.common.codeBlock),style:r},o.createElement("code",{className:N},n))}));const P=Array.isArray(n)?n.join(""):n,C=null!=(t=null!=u?u:(0,v.Vo)(l))?t:p.defaultLanguage,{highlightLines:Z,code:D}=(0,v.nZ)(P,s,C),S=()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;const r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";const a=document.getSelection();let l=!1;a.rangeCount>0&&(l=a.getRangeAt(0)),n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}r.remove(),l&&(a.removeAllRanges(),a.addRange(l)),o&&o.focus()}(D),m(!0),setTimeout((()=>m(!1)),2e3)};return o.createElement(f,(0,r.Z)({},c,{key:String(y),theme:x,code:D,language:null!=C?C:"text"}),(e=>{let{className:t,style:n,tokens:c,getLineProps:s,getTokenProps:i}=e;return o.createElement("div",{className:(0,a.Z)(h,l,{["language-"+C]:C&&!l.includes("language-"+C)},v.kM.common.codeBlock)},j&&o.createElement("div",{style:n,className:k},j),o.createElement("div",{className:(0,a.Z)(b,C)},o.createElement("pre",{tabIndex:0,className:(0,a.Z)(t,E,"thin-scrollbar"),style:n},o.createElement("code",{className:N},c.map(((e,t)=>{1===e.length&&"\n"===e[0].content&&(e[0].content="");const n=s({line:e,key:t});return Z.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),o.createElement("span",(0,r.Z)({key:t},n),e.map(((e,t)=>o.createElement("span",(0,r.Z)({key:t},i({token:e,key:t}))))),o.createElement("br",null))})))),o.createElement("button",{type:"button","aria-label":(0,g.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,a.Z)(T,"clean-btn"),onClick:S},d?o.createElement(g.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):o.createElement(g.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},1846:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(2784);function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",hidden:n,className:o},t)}},4034:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(7896),o=n(2784),a=n(9741),l=n(9155),c=n(6277);const s="tabItem_yrY8";function i(e){var t,n,a;const{lazy:i,block:u,defaultValue:p,values:d,groupId:m,className:y}=e,f=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=d?d:f.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),v=(0,l.lx)(g,((e,t)=>e.value===t.value));if(v.length>0)throw new Error('Docusaurus error: Duplicate values "'+v.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const h=null===p?p:null!=(t=null!=p?p:null==(n=f.find((e=>e.props.default)))?void 0:n.props.value)?t:null==(a=f[0])?void 0:a.props.value;if(null!==h&&!g.some((e=>e.value===h)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+h+'" but none of its children has the corresponding value. Available values are: '+g.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:b,setTabGroupChoices:k}=(0,l.UB)(),[E,O]=(0,o.useState)(h),T=[],{blockElementScrollPositionUntilNextRender:N}=(0,l.o5)();if(null!=m){const e=b[m];null!=e&&e!==E&&g.some((t=>t.value===e))&&O(e)}const w=e=>{const t=e.currentTarget,n=T.indexOf(t),r=g[n].value;r!==E&&(N(t),O(r),null!=m&&k(m,r))},j=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=T.indexOf(e.currentTarget)+1;n=T[t]||T[0];break}case"ArrowLeft":{const t=T.indexOf(e.currentTarget)-1;n=T[t]||T[T.length-1];break}}null==(t=n)||t.focus()};return o.createElement("div",{className:"tabs-container"},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":u},y)},g.map((e=>{let{value:t,label:n,attributes:a}=e;return o.createElement("li",(0,r.Z)({role:"tab",tabIndex:E===t?0:-1,"aria-selected":E===t,key:t,ref:e=>T.push(e),onKeyDown:j,onFocus:w,onClick:w},a,{className:(0,c.Z)("tabs__item",s,null==a?void 0:a.className,{"tabs__item--active":E===t})}),null!=n?n:t)}))),i?(0,o.cloneElement)(f.filter((e=>e.props.value===E))[0],{className:"margin-vert--md"}):o.createElement("div",{className:"margin-vert--md"},f.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==E})))))}function u(e){const t=(0,a.Z)();return o.createElement(i,(0,r.Z)({key:String(t)},e))}}}]);