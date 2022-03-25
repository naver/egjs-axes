"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[8052],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=u(n),d=r,h=m["".concat(i,".").concat(d)]||m[d]||p[d]||o;return n?a.createElement(h,s(s({ref:t},c),{},{components:n})):a.createElement(h,s({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var u=2;u<o;u++)s[u]=n[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},298:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return p}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),s=["components"],l={custom_edit_url:null},i=void 0,u={unversionedId:"api/PanInput",id:"api/PanInput",title:"PanInput",description:"A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.",source:"@site/docs/api/PanInput.mdx",sourceDirName:"api",slug:"/api/PanInput",permalink:"/egjs-axes/docs/api/PanInput",editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",previous:{title:"MoveKeyInput",permalink:"/egjs-axes/docs/api/MoveKeyInput"},next:{title:"PinchInput",permalink:"/egjs-axes/docs/api/PinchInput"}},c={},p=[{value:"constructor",id:"constructor",level:2},{value:"Methods",id:"methods",level:2},{value:"destroy",id:"destroy",level:3},{value:"enable",id:"enable",level:3},{value:"disable",id:"disable",level:3},{value:"isEnabled",id:"isEnabled",level:3}],m={toc:p};function d(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class PanInput\n")),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes."),(0,o.kt)("div",{className:"container"},(0,o.kt)("div",{className:"row mb-2"},(0,o.kt)("div",{className:"col col--12"},(0,o.kt)("strong",null,"Methods"))),(0,o.kt)("div",{className:"row"},(0,o.kt)("div",{className:"col col--12"},(0,o.kt)("a",{href:"#destroy"},"destroy"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#enable"},"enable"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#disable"},"disable"),(0,o.kt)("br",null),(0,o.kt)("a",{href:"#isEnabled"},"isEnabled")))),(0,o.kt)("h2",{id:"constructor"},"constructor"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new PanInput(element, options)\n")),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,o.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,o.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"element"),(0,o.kt)("td",{parentName:"tr",align:"center"},"HTMLElement ","|"," String ","|"," jQuery"),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"}),(0,o.kt)("td",{parentName:"tr",align:"center"},"An element to use the eg.Axes.PanInput module")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},"options"),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"PanInputOption"},"PanInputOption")),(0,o.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,o.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,o.kt)("td",{parentName:"tr",align:"center"},"The option object of the eg.Axes.PanInput module")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const pan = new eg.Axes.PanInput("#area", {\n        inputType: ["touch"],\n        scale: [1, 1.3],\n});\n\n// Connect the \'something2\' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.\n// Connect the \'somethingN\' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.\naxes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);\n\n// Connect only one \'something1\' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.\naxes.connect(["something1"], pan); // or axes.connect("something1", pan);\n\n// Connect only one \'something2\' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.\naxes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);\n')),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("h3",{id:"destroy"},"destroy"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Destroys elements, properties, and events used in a module."),(0,o.kt)("h3",{id:"enable"},"enable"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Enables input devices"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": ",(0,o.kt)("a",{parentName:"p",href:"PanInput"},"PanInput")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,o.kt)("h3",{id:"disable"},"disable"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Disables input devices"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": ",(0,o.kt)("a",{parentName:"p",href:"PanInput"},"PanInput")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,o.kt)("h3",{id:"isEnabled"},"isEnabled"),(0,o.kt)("div",{className:"bulma-tags"}),(0,o.kt)("p",null,"Returns whether to use an input device"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Returns"),": Boolean"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Whether to use an input device")))}d.isMDXComponent=!0}}]);