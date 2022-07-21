"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9931],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,y=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(y,l(l({ref:t},u),{},{components:n})):a.createElement(y,l({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1736:function(e,t,n){n.d(t,{Z:function(){return j}});var a=n(7462),r=n(7294),o=n(6010),l={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},i={Prism:n(7410).default,theme:l};function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},c.apply(this,arguments)}var u=/\r\n|\r|\n/,p=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},d=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},m=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=c({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=c({},n,{backgroundColor:null}),r};function y(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}var g=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),s(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?m(e.theme,e.language):void 0;return t.themeDict=n})),s(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,o=c({},y(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==r&&(o.style=void 0!==o.style?c({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),s(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return o[n[0]];var l=a?{display:"inline-block"}:{},i=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(i))}})),s(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,o=e.token,l=c({},y(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?c({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),s(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var o=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],o=0,l=0,i=[],s=[i];l>-1;){for(;(o=a[l]++)<r[l];){var c=void 0,m=t[l],y=n[l][o];if("string"==typeof y?(m=l>0?m:["plain"],c=y):(m=d(m,y.type),y.alias&&(m=d(m,y.alias)),c=y.content),"string"==typeof c){var g=c.split(u),f=g.length;i.push({types:m,content:g[0]});for(var v=1;v<f;v++)p(i),s.push(i=[]),i.push({types:m,content:g[v]})}else l++,t.push(m),n.push(c),a.push(0),r.push(c.length)}l--,t.pop(),n.pop(),a.pop(),r.pop()}return p(i),s}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(r.Component),f=g;var v=n(5999),h=n(3725),k="codeBlockContainer_I0IT",b="codeBlockContent_wNvx",T="codeBlockTitle_BvAR",x="codeBlock_jd64",N="codeBlockStandalone_csWH",w="copyButton_wuS7",E="codeBlockLines_mRuA";function j(e){var t,n=e.children,l=e.className,s=void 0===l?"":l,c=e.metastring,u=e.title,p=e.language,d=(0,h.LU)().prism,m=(0,r.useState)(!1),y=m[0],g=m[1],j=(0,r.useState)(!1),O=j[0],P=j[1];(0,r.useEffect)((function(){P(!0)}),[]);var C=(0,h.bc)(c)||u,I=(0,h.pJ)();if(r.Children.toArray(n).some((function(e){return(0,r.isValidElement)(e)})))return r.createElement(f,(0,a.Z)({},i,{key:String(O),theme:I,code:"",language:"text"}),(function(e){var t=e.className,a=e.style;return r.createElement("pre",{tabIndex:0,className:(0,o.Z)(t,N,"thin-scrollbar",k,s,h.kM.common.codeBlock),style:a},r.createElement("code",{className:E},n))}));var Z=Array.isArray(n)?n.join(""):n,D=null!=(t=null!=p?p:(0,h.Vo)(s))?t:d.defaultLanguage,B=(0,h.nZ)(Z,c,D),L=B.highlightLines,S=B.code,_=function(){!function(e,t){var n=(void 0===t?{}:t).target,a=void 0===n?document.body:n,r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";var l=document.getSelection(),i=!1;l.rangeCount>0&&(i=l.getRangeAt(0)),a.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;var s=!1;try{s=document.execCommand("copy")}catch(c){}r.remove(),i&&(l.removeAllRanges(),l.addRange(i)),o&&o.focus()}(S),g(!0),setTimeout((function(){return g(!1)}),2e3)};return r.createElement(f,(0,a.Z)({},i,{key:String(O),theme:I,code:S,language:null!=D?D:"text"}),(function(e){var t,n=e.className,l=e.style,i=e.tokens,c=e.getLineProps,u=e.getTokenProps;return r.createElement("div",{className:(0,o.Z)(k,s,(t={},t["language-"+D]=D&&!s.includes("language-"+D),t),h.kM.common.codeBlock)},C&&r.createElement("div",{style:l,className:T},C),r.createElement("div",{className:(0,o.Z)(b,D)},r.createElement("pre",{tabIndex:0,className:(0,o.Z)(n,x,"thin-scrollbar"),style:l},r.createElement("code",{className:E},i.map((function(e,t){1===e.length&&"\n"===e[0].content&&(e[0].content="");var n=c({line:e,key:t});return L.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),r.createElement("span",(0,a.Z)({key:t},n),e.map((function(e,t){return r.createElement("span",(0,a.Z)({key:t},u({token:e,key:t})))})),r.createElement("br",null))})))),r.createElement("button",{type:"button","aria-label":(0,v.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,o.Z)(w,"clean-btn"),onClick:_},y?r.createElement(v.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):r.createElement(v.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},3895:function(e,t,n){n.r(t),n.d(t,{assets:function(){return k},contentTitle:function(){return v},default:function(){return x},frontMatter:function(){return f},metadata:function(){return h},toc:function(){return b}});var a=n(7462),r=n(3366),o=n(7294),l=n(3905),i=n(2389),s=n(3725),c=n(6010),u="tabItem_LplD";function p(e){var t,n,r,l=e.lazy,i=e.block,p=e.defaultValue,d=e.values,m=e.groupId,y=e.className,g=o.Children.map(e.children,(function(e){if((0,o.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),f=null!=d?d:g.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),v=(0,s.lx)(f,(function(e,t){return e.value===t.value}));if(v.length>0)throw new Error('Docusaurus error: Duplicate values "'+v.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var h=null===p?p:null!=(t=null!=p?p:null==(n=g.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(r=g[0])?void 0:r.props.value;if(null!==h&&!f.some((function(e){return e.value===h})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+h+'" but none of its children has the corresponding value. Available values are: '+f.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var k=(0,s.UB)(),b=k.tabGroupChoices,T=k.setTabGroupChoices,x=(0,o.useState)(h),N=x[0],w=x[1],E=[],j=(0,s.o5)().blockElementScrollPositionUntilNextRender;if(null!=m){var O=b[m];null!=O&&O!==N&&f.some((function(e){return e.value===O}))&&w(O)}var P=function(e){var t=e.currentTarget,n=E.indexOf(t),a=f[n].value;a!==N&&(j(t),w(a),null!=m&&T(m,a))},C=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=E.indexOf(e.currentTarget)+1;n=E[a]||E[0];break;case"ArrowLeft":var r=E.indexOf(e.currentTarget)-1;n=E[r]||E[E.length-1]}null==(t=n)||t.focus()};return o.createElement("div",{className:"tabs-container"},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":i},y)},f.map((function(e){var t=e.value,n=e.label,r=e.attributes;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,key:t,ref:function(e){return E.push(e)},onKeyDown:C,onFocus:P,onClick:P},r,{className:(0,c.Z)("tabs__item",u,null==r?void 0:r.className,{"tabs__item--active":N===t})}),null!=n?n:t)}))),l?(0,o.cloneElement)(g.filter((function(e){return e.props.value===N}))[0],{className:"margin-vert--md"}):o.createElement("div",{className:"margin-vert--md"},g.map((function(e,t){return(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==N})}))))}function d(e){var t=(0,i.Z)();return o.createElement(p,(0,a.Z)({key:String(t)},e))}function m(e){var t=e.children,n=e.hidden,a=e.className;return o.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}var y=n(1736),g=["components"],f={title:"Installation",id:"installation",slug:"/",sidebar_position:1},v=void 0,h={unversionedId:"tutorials/installation",id:"tutorials/installation",title:"Installation",description:"\ud83d\udce6 Package managers (recommended)",source:"@site/docs/tutorials/Installiation.mdx",sourceDirName:"tutorials",slug:"/",permalink:"/egjs-axes/docs/",editUrl:"https://github.com/naver/egjs-axes/edit/master/packages/demo/docs/tutorials/Installiation.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Installation",id:"installation",slug:"/",sidebar_position:1},sidebar:"docs",next:{title:"Getting Started",permalink:"/egjs-axes/docs/getting-started"}},k={},b=[{value:"\ud83d\udce6 Package managers (recommended)",id:"-package-managers-recommended",level:2},{value:"\ud83d\udd17 CDN Links",id:"-cdn-links",level:2},{value:"Minified &amp; Packaged (with dependencies)",id:"minified--packaged-with-dependencies",level:3},{value:"Packaged (with dependencies)",id:"packaged-with-dependencies",level:3}],T={toc:b};function x(e){var t=e.components,n=(0,r.Z)(e,g);return(0,l.kt)("wrapper",(0,a.Z)({},T,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"-package-managers-recommended"},"\ud83d\udce6 Package managers (recommended)"),(0,l.kt)("p",null,"You can easily install Flicking with package managers like ",(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/"},"npm")," or ",(0,l.kt)("a",{parentName:"p",href:"https://classic.yarnpkg.com/en/"},"yarn")),(0,l.kt)(d,{groupId:"pm",defaultValue:"npm",lazy:!0,values:[{label:"npm",value:"npm"},{label:"yarn",value:"yarn"}],mdxType:"Tabs"},(0,l.kt)(m,{value:"npm",mdxType:"TabItem"},(0,l.kt)(y.Z,{className:"language-shell",mdxType:"CodeBlock"},"npm install @egjs/axes")),(0,l.kt)(m,{value:"yarn",mdxType:"TabItem"},(0,l.kt)(y.Z,{className:"language-shell",mdxType:"CodeBlock"},"yarn add @egjs/axes"))),(0,l.kt)("h2",{id:"-cdn-links"},"\ud83d\udd17 CDN Links"),(0,l.kt)("h3",{id:"minified--packaged-with-dependencies"},"Minified & Packaged (with dependencies)"),(0,l.kt)(d,{groupId:"cdn",defaultValue:"url",lazy:!0,values:[{label:"URL",value:"url"},{label:"HTML <script>",value:"html"}],mdxType:"Tabs"},(0,l.kt)(m,{value:"url",mdxType:"TabItem"},(0,l.kt)(y.Z,{className:"language-shell",mdxType:"CodeBlock"},"https://unpkg.com/@egjs/axes@latest/dist/axes.pkgd.min.js")),(0,l.kt)(m,{value:"html",mdxType:"TabItem"},(0,l.kt)(y.Z,{className:"language-html",mdxType:"CodeBlock"},'<script src="https://unpkg.com/@egjs/axes@latest/dist/axes.pkgd.min.js"><\/script>'))),(0,l.kt)("h3",{id:"packaged-with-dependencies"},"Packaged (with dependencies)"),(0,l.kt)(d,{groupId:"cdn",defaultValue:"url",lazy:!0,values:[{label:"URL",value:"url"},{label:"HTML <script>",value:"html"}],mdxType:"Tabs"},(0,l.kt)(m,{value:"url",mdxType:"TabItem"},(0,l.kt)(y.Z,{className:"language-shell",mdxType:"CodeBlock"},"https://unpkg.com/@egjs/axes@latest/dist/axes.pkgd.js")),(0,l.kt)(m,{value:"html",mdxType:"TabItem"},(0,l.kt)(y.Z,{className:"language-html",mdxType:"CodeBlock"},'<script src="https://unpkg.com/@egjs/axes@latest/dist/axes.pkgd.js"><\/script>'))))}x.isMDXComponent=!0}}]);