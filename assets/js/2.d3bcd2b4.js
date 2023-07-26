"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[2],{876:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(2784);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),y=o,m=u["".concat(i,".").concat(y)]||u[y]||d[y]||a;return n?r.createElement(m,c(c({ref:t},p),{},{components:n})):r.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=y;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:o,c[1]=l;for(var s=2;s<a;s++)c[s]=n[s];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},2676:(e,t,n)=>{n.d(t,{Z:()=>b});var r=n(7896),o=n(2784),a=n(6277);const c={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var l={Prism:n(7175).default,theme:c};function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}var p=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},d=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)};function y(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}var m=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),i(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?function(e,t){var n=e.plain,r=Object.create(null),o=e.styles.reduce((function(e,n){var r=n.languages,o=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=s({},e[t],o);e[t]=n})),e}),r);return o.root=n,o.plain=s({},n,{backgroundColor:null}),o}(e.theme,e.language):void 0;return t.themeDict=n})),i(this,"getLineProps",(function(e){var n=e.key,r=e.className,o=e.style,a=s({},y(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),c=t.getThemeDict(t.props);return void 0!==c&&(a.style=c.plain),void 0!==o&&(a.style=void 0!==a.style?s({},a.style,o):o),void 0!==n&&(a.key=n),r&&(a.className+=" "+r),a})),i(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,o=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===o&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===o&&!r)return a[n[0]];var c=r?{display:"inline-block"}:{},l=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[c].concat(l))}})),i(this,"getTokenProps",(function(e){var n=e.key,r=e.className,o=e.style,a=e.token,c=s({},y(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==o&&(c.style=void 0!==c.style?s({},c.style,o):o),void 0!==n&&(c.key=n),r&&(c.className+=" "+r),c})),i(this,"tokenize",(function(e,t,n,r){var o={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",o);var a=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,o=e.children,a=this.getThemeDict(this.props),c=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],r=[0],o=[e.length],a=0,c=0,l=[],i=[l];c>-1;){for(;(a=r[c]++)<o[c];){var s=void 0,y=t[c],m=n[c][a];if("string"==typeof m?(y=c>0?y:["plain"],s=m):(y=d(y,m.type),m.alias&&(y=d(y,m.alias)),s=m.content),"string"==typeof s){var h=s.split(p),g=h.length;l.push({types:y,content:h[0]});for(var f=1;f<g;f++)u(l),i.push(l=[]),l.push({types:y,content:h[f]})}else c++,t.push(y),n.push(s),r.push(0),o.push(s.length)}c--,t.pop(),n.pop(),r.pop(),o.pop()}return u(l),i}(void 0!==c?this.tokenize(t,r,c,n):[r]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component);const h=m;var g=n(1077),f=n(9155);const v={codeBlockContainer:"codeBlockContainer_iq8S",codeBlockContent:"codeBlockContent_U58x",codeBlockTitle:"codeBlockTitle_bZYx",codeBlock:"codeBlock_UzyX",codeBlockStandalone:"codeBlockStandalone_TOuF",copyButton:"copyButton_YRtT",codeBlockLines:"codeBlockLines_WYyR"};function b(e){let{children:t,className:n="",metastring:c,title:i,language:s}=e;const{prism:p}=(0,f.LU)(),[u,d]=(0,o.useState)(!1),[y,m]=(0,o.useState)(!1);(0,o.useEffect)((()=>{m(!0)}),[]);const b=(0,f.bc)(c)||i,k=(0,f.pJ)();if(o.Children.toArray(t).some((e=>(0,o.isValidElement)(e))))return o.createElement(h,(0,r.Z)({},l,{key:String(y),theme:k,code:"",language:"text"}),(e=>{let{className:r,style:c}=e;return o.createElement("pre",{tabIndex:0,className:(0,a.Z)(r,v.codeBlockStandalone,"thin-scrollbar",v.codeBlockContainer,n,f.kM.common.codeBlock),style:c},o.createElement("code",{className:v.codeBlockLines},t))}));const E=Array.isArray(t)?t.join(""):t,O=s??(0,f.Vo)(n)??p.defaultLanguage,{highlightLines:Z,code:T}=(0,f.nZ)(E,c,O),N=()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";const a=document.getSelection(),c=a.rangeCount>0&&a.getRangeAt(0);n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;let l=!1;try{l=document.execCommand("copy")}catch{}r.remove(),c&&(a.removeAllRanges(),a.addRange(c)),o&&o.focus()}(T),d(!0),setTimeout((()=>d(!1)),2e3)};return o.createElement(h,(0,r.Z)({},l,{key:String(y),theme:k,code:T,language:O??"text"}),(e=>{let{className:t,style:c,tokens:l,getLineProps:i,getTokenProps:s}=e;return o.createElement("div",{className:(0,a.Z)(v.codeBlockContainer,n,{[`language-${O}`]:O&&!n.includes(`language-${O}`)},f.kM.common.codeBlock)},b&&o.createElement("div",{style:c,className:v.codeBlockTitle},b),o.createElement("div",{className:(0,a.Z)(v.codeBlockContent,O)},o.createElement("pre",{tabIndex:0,className:(0,a.Z)(t,v.codeBlock,"thin-scrollbar"),style:c},o.createElement("code",{className:v.codeBlockLines},l.map(((e,t)=>{1===e.length&&"\n"===e[0].content&&(e[0].content="");const n=i({line:e,key:t});return Z.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),o.createElement("span",(0,r.Z)({key:t},n),e.map(((e,t)=>o.createElement("span",(0,r.Z)({key:t},s({token:e,key:t}))))),o.createElement("br",null))})))),o.createElement("button",{type:"button","aria-label":(0,g.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,a.Z)(v.copyButton,"clean-btn"),onClick:N},u?o.createElement(g.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):o.createElement(g.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},2159:(e,t,n)=>{n.d(t,{Z:()=>p});var r=n(7896),o=n(2784),a=n(6277),c=n(1077),l=n(9155);const i={anchorWithStickyNavbar:"anchorWithStickyNavbar_UUsI",anchorWithHideOnScrollNavbar:"anchorWithHideOnScrollNavbar_oSsD"};function s(e){let{as:t,id:n,...s}=e;const{navbar:{hideOnScroll:p}}=(0,l.LU)();return n?o.createElement(t,(0,r.Z)({},s,{className:(0,a.Z)("anchor",{[i.anchorWithHideOnScrollNavbar]:p,[i.anchorWithStickyNavbar]:!p}),id:n}),s.children,o.createElement("a",{className:"hash-link",href:`#${n}`,title:(0,c.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):o.createElement(t,s)}function p(e){let{as:t,...n}=e;return"h1"===t?o.createElement("h1",(0,r.Z)({},n,{id:void 0}),n.children):o.createElement(s,(0,r.Z)({as:t},n))}},2163:(e,t,n)=>{n.d(t,{Z:()=>y});var r=n(7896),o=n(2784),a=n(9854),c=n(9817),l=n(2676),i=n(2159),s=n(6277),p=n(9155);const u="details_ZdG1";function d(e){let{...t}=e;return o.createElement(p.PO,(0,r.Z)({},t,{className:(0,s.Z)("alert alert--info",u,t.className)}))}const y={head:e=>{const t=o.Children.map(e.children,(e=>function(e){if(e?.props?.mdxType&&e?.props?.originalType){const{mdxType:t,originalType:n,...r}=e.props;return o.createElement(e.props.originalType,r)}return e}(e)));return o.createElement(a.Z,e,t)},code:e=>{const t=["a","b","big","i","span","em","strong","sup","sub","small"];return o.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")||o.isValidElement(e)&&t.includes(e.props.mdxType)))?o.createElement("code",e):o.createElement(l.Z,e)},a:e=>o.createElement(c.Z,e),pre:e=>o.createElement(l.Z,(0,o.isValidElement)(e.children)&&"code"===e.children.props.originalType?e.children?.props:{...e}),details:e=>{const t=o.Children.toArray(e.children),n=t.find((e=>"summary"===e?.props?.mdxType)),a=o.createElement(o.Fragment,null,t.filter((e=>e!==n)));return o.createElement(d,(0,r.Z)({},e,{summary:n}),a)},h1:e=>o.createElement(i.Z,(0,r.Z)({as:"h1"},e)),h2:e=>o.createElement(i.Z,(0,r.Z)({as:"h2"},e)),h3:e=>o.createElement(i.Z,(0,r.Z)({as:"h3"},e)),h4:e=>o.createElement(i.Z,(0,r.Z)({as:"h4"},e)),h5:e=>o.createElement(i.Z,(0,r.Z)({as:"h5"},e)),h6:e=>o.createElement(i.Z,(0,r.Z)({as:"h6"},e))}}}]);