"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9005],{876:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var a=n(2784);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,k=c["".concat(i,".").concat(m)]||c[m]||d[m]||l;return n?a.createElement(k,o(o({ref:t},u),{},{components:n})):a.createElement(k,o({ref:t},u))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[c]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<l;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5632:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var a=n(7896),r=(n(2784),n(876));const l={custom_edit_url:null},o=void 0,s={unversionedId:"api/MoveKeyInput",id:"api/MoveKeyInput",title:"MoveKeyInput",description:"A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.",source:"@site/docs/api/MoveKeyInput.mdx",sourceDirName:"api",slug:"/api/MoveKeyInput",permalink:"/egjs-axes/docs/api/MoveKeyInput",editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"Axes",permalink:"/egjs-axes/docs/api/Axes"},next:{title:"PanInput",permalink:"/egjs-axes/docs/api/PanInput"}},i={},p=[{value:"constructor",id:"constructor",level:2},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"enable",id:"enable",level:3},{value:"disable",id:"disable",level:3},{value:"isEnabled",id:"isEnabled",level:3}],u={toc:p},c="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class MoveKeyInput\n")),(0,r.kt)("div",{className:"bulma-tags"}),(0,r.kt)("p",null,"A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis."),(0,r.kt)("div",{className:"container"},(0,r.kt)("div",{className:"row mb-2"},(0,r.kt)("div",{className:"col col--12"},(0,r.kt)("strong",null,"Methods"))),(0,r.kt)("div",{className:"row"},(0,r.kt)("div",{className:"col col--12"},(0,r.kt)("a",{href:"#destroy"},"destroy"),(0,r.kt)("br",null),(0,r.kt)("a",{href:"#enable"},"enable"),(0,r.kt)("br",null),(0,r.kt)("a",{href:"#disable"},"disable"),(0,r.kt)("br",null),(0,r.kt)("a",{href:"#isEnabled"},"isEnabled")))),(0,r.kt)("h2",{id:"constructor"},"constructor"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new MoveKeyInput(element, options)\n")),(0,r.kt)("div",{className:"bulma-tags"}),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,r.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,r.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,r.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,r.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"element"),(0,r.kt)("td",{parentName:"tr",align:"center"},"HTMLElement ","|"," String ","|"," jQuery"),(0,r.kt)("td",{parentName:"tr",align:"center"}),(0,r.kt)("td",{parentName:"tr",align:"center"}),(0,r.kt)("td",{parentName:"tr",align:"center"},"An element to use the eg.Axes.MoveKeyInput module")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"options"),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("a",{parentName:"td",href:"MoveKeyInputOption"},"MoveKeyInputOption")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,r.kt)("td",{parentName:"tr",align:"center"}),(0,r.kt)("td",{parentName:"tr",align:"center"},"The option object of the eg.Axes.MoveKeyInput module")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const moveKey = new eg.Axes.MoveKeyInput("#area", {\n    scale: [1, 1]\n});\n\n// Connect \'x\', \'y\' axes when the moveKey is pressed.\naxes.connect(["x", "y"], moveKey);\n')),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"destroy"},"destroy"),(0,r.kt)("div",{className:"bulma-tags"}),(0,r.kt)("p",null,"Destroys elements, properties, and events used in a module."),(0,r.kt)("h3",{id:"enable"},"enable"),(0,r.kt)("div",{className:"bulma-tags"}),(0,r.kt)("p",null,"Enables input devices"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Returns"),": ",(0,r.kt)("a",{parentName:"p",href:"MoveKeyInput"},"MoveKeyInput")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,r.kt)("h3",{id:"disable"},"disable"),(0,r.kt)("div",{className:"bulma-tags"}),(0,r.kt)("p",null,"Disables input devices"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Returns"),": ",(0,r.kt)("a",{parentName:"p",href:"MoveKeyInput"},"MoveKeyInput")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,r.kt)("h3",{id:"isEnabled"},"isEnabled"),(0,r.kt)("div",{className:"bulma-tags"}),(0,r.kt)("p",null,"Returns whether to use an input device"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Returns"),": Boolean"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Whether to use an input device")))}d.isMDXComponent=!0}}]);