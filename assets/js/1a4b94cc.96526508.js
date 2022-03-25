"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[6250],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=r,k=d["".concat(s,".").concat(u)]||d[u]||m[u]||i;return n?a.createElement(k,o(o({ref:t},p),{},{components:n})):a.createElement(k,o({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5229:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return u},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return m}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={custom_edit_url:null},s=void 0,c={unversionedId:"api/Axes",id:"api/Axes",title:"Axes",description:"A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.",source:"@site/docs/api/Axes.mdx",sourceDirName:"api",slug:"/api/Axes",permalink:"/egjs-axes/docs/api/Axes",editUrl:null,tags:[],version:"current",frontMatter:{custom_edit_url:null},sidebar:"api",next:{title:"MoveKeyInput",permalink:"/egjs-axes/docs/api/MoveKeyInput"}},p={},m=[{value:"constructor",id:"constructor",level:2},{value:"Methods",id:"methods",level:2},{value:"connect",id:"connect",level:3},{value:"disconnect",id:"disconnect",level:3},{value:"get",id:"get",level:3},{value:"setTo",id:"setTo",level:3},{value:"setBy",id:"setBy",level:3},{value:"stopAnimation",id:"stopAnimation",level:3},{value:"updateAnimation",id:"updateAnimation",level:3},{value:"isBounceArea",id:"isBounceArea",level:3},{value:"destroy",id:"destroy",level:3},{value:"Events",id:"events",level:2},{value:"hold",id:"event-hold",level:3},{value:"release",id:"event-release",level:3},{value:"change",id:"event-change",level:3},{value:"animationStart",id:"event-animationStart",level:3},{value:"animationEnd",id:"event-animationEnd",level:3},{value:"finish",id:"event-finish",level:3}],d={toc:m};function u(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"class Axes extends eg.Component\n")),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions."),(0,i.kt)("div",{className:"container"},(0,i.kt)("div",{className:"row mb-2"},(0,i.kt)("div",{className:"col col--6"},(0,i.kt)("strong",null,"Methods")),(0,i.kt)("div",{className:"col col--6"},(0,i.kt)("strong",null,"Events"))),(0,i.kt)("div",{className:"row"},(0,i.kt)("div",{className:"col col--6"},(0,i.kt)("a",{href:"#connect"},"connect"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#disconnect"},"disconnect"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#get"},"get"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#setTo"},"setTo"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#setBy"},"setBy"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#stopAnimation"},"stopAnimation"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#updateAnimation"},"updateAnimation"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#isBounceArea"},"isBounceArea"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#destroy"},"destroy")),(0,i.kt)("div",{className:"col col--6"},(0,i.kt)("a",{href:"#event-hold"},"hold"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#event-release"},"release"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#event-change"},"change"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#event-animationStart"},"animationStart"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#event-animationEnd"},"animationEnd"),(0,i.kt)("br",null),(0,i.kt)("a",{href:"#event-finish"},"finish")))),(0,i.kt)("h2",{id:"constructor"},"constructor"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"new Axes(axis, options, startPos)\n")),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"axis"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, AxisOption",">"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"options"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"AxesOption"},"AxesOption")),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"},"{}"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The option object of the eg.Axes module")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"startPos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinates to be moved when creating an instance. not triggering change event.")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'// 1. Initialize eg.Axes\nconst axes = new eg.Axes({\n    something1: {\n        range: [0, 150],\n        bounce: 50\n    },\n    something2: {\n        range: [0, 200],\n        bounce: 100\n    },\n    somethingN: {\n        range: [1, 10],\n    }\n}, {\n deceleration : 0.0024\n});\n\n// 2. attach event handler\naxes.on({\n    "hold" : function(evt) {\n    },\n    "release" : function(evt) {\n    },\n    "animationStart" : function(evt) {\n    },\n    "animationEnd" : function(evt) {\n    },\n    "change" : function(evt) {\n    }\n});\n\n// 3. Initialize inputTypes\nconst panInputArea = new eg.Axes.PanInput("#area", {\n    scale: [0.5, 1]\n});\nconst panInputHmove = new eg.Axes.PanInput("#hmove");\nconst panInputVmove = new eg.Axes.PanInput("#vmove");\nconst pinchInputArea = new eg.Axes.PinchInput("#area", {\n    scale: 1.5\n});\n\n// 4. Connect eg.Axes and InputTypes\n// [PanInput] When the mouse or touchscreen is down and moved.\n// Connect the \'something2\' axis to the mouse or touchscreen x position and\n// connect the \'somethingN\' axis to the mouse or touchscreen y position.\naxes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);\n\n// Connect only one \'something1\' axis to the mouse or touchscreen x position.\naxes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);\n\n// Connect only one \'something2\' axis to the mouse or touchscreen y position.\naxes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);\n\n// [PinchInput] Connect \'something2\' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).\naxes.connect("something2", pinchInputArea);\n')),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"connect"},"connect"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Connect the axis of eg.Axes to the inputType."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": eg.Axes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"axes"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Array","<","String",">"," ","|"," String"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The name of the axis to associate with inputType")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"inputType"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The inputType instance to associate with the axis of eg.Axes")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "xOther": {\n     range: [-100, 100]\n  }\n});\n\naxes.connect("x", new eg.Axes.PanInput("#area1"))\n   .connect("x xOther", new eg.Axes.PanInput("#area2"))\n   .connect(" xOther", new eg.Axes.PanInput("#area3"))\n   .connect(["x"], new eg.Axes.PanInput("#area4"))\n   .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))\n   .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));\n')),(0,i.kt)("h3",{id:"disconnect"},"disconnect"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Disconnect the axis of eg.Axes from the inputType."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": eg.Axes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"inputType"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"An inputType instance associated with the axis of eg.Axes")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "xOther": {\n     range: [-100, 100]\n  }\n});\n\nconst input1 = new eg.Axes.PanInput("#area1");\nconst input2 = new eg.Axes.PanInput("#area2");\nconst input3 = new eg.Axes.PanInput("#area3");\n\naxes.connect("x", input1);\n   .connect("x xOther", input2)\n   .connect(["xOther", "x"], input3);\n\naxes.disconnect(input1); // disconnects input1\naxes.disconnect(); // disconnects all of them\n')),(0,i.kt)("h3",{id:"get"},"get"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Returns the current position of the coordinates."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": Object","<","string, number",">"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Axis coordinate information")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"axes"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The names of the axis")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "xOther": {\n     range: [-100, 100]\n  },\n     "zoom": {\n     range: [50, 30]\n  }\n});\n\naxes.get(); // {"x": 0, "xOther": -100, "zoom": 50}\naxes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}\n')),(0,i.kt)("h3",{id:"setTo"},"setTo"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Moves an axis to specific coordinates."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": eg.Axes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"pos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinate to move to")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"duration"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Number"),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"},"0"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Duration of the animation (unit: ms)")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "xOther": {\n     range: [-100, 100]\n  },\n     "zoom": {\n     range: [50, 30]\n  }\n});\n\naxes.setTo({"x": 30, "zoom": 60});\naxes.get(); // {"x": 30, "xOther": -100, "zoom": 60}\n\naxes.setTo({"x": 100, "xOther": 60}, 1000); // animatation\n\n// after 1000 ms\naxes.get(); // {"x": 100, "xOther": 60, "zoom": 60}\n')),(0,i.kt)("h3",{id:"setBy"},"setBy"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Moves an axis from the current coordinates to specific coordinates."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": eg.Axes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"pos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinate to move to")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"duration"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Number"),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"},"0"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Duration of the animation (unit: ms)")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "xOther": {\n     range: [-100, 100]\n  },\n     "zoom": {\n     range: [50, 30]\n  }\n});\n\naxes.setBy({"x": 30, "zoom": 10});\naxes.get(); // {"x": 30, "xOther": -100, "zoom": 60}\n\naxes.setBy({"x": 70, "xOther": 60}, 1000); // animatation\n\n// after 1000 ms\naxes.get(); // {"x": 100, "xOther": -40, "zoom": 60}\n')),(0,i.kt)("h3",{id:"stopAnimation"},"stopAnimation"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Stop an animation in progress."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": eg.Axes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n});\n\naxes.setTo({"x": 10}, 1000); // start animatation\n\n// after 500 ms\naxes.stopAnimation(); // stop animation during movement.\n')),(0,i.kt)("h3",{id:"updateAnimation"},"updateAnimation"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Change the destination of an animation in progress."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": eg.Axes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An instance of a module itself")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"pos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"UpdateAnimationOption"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinate to move to")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 200]\n  },\n  "y": {\n     range: [0, 200]\n  }\n});\n\naxes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo\n\n// after 500 ms\naxes.updateAnimation({destPos: {"x": 100, "y": 100}}); // animation will end after 500 ms, at {"x": 100, "y": 100}\n\n// after 500 ms\naxes.setTo({"x": 50, "y": 50}, 1000); // trigger animation by setTo\n\n// after 700 ms\naxes.updateAnimation({destPos: {"x": 100, "y": 100}, duration: 1500, restart: true}); // this works same as axes.setTo({"x": 100, "y": 100}, 800) since restart is true.\n')),(0,i.kt)("h3",{id:"isBounceArea"},"isBounceArea"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Returns whether there is a coordinate in the bounce area of \u200b\u200bthe target axis."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns"),": Boolen"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Whether the bounce area exists.")),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PARAMETER"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"OPTIONAL"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DEFAULT"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"axes"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f"),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"center"},"The names of the axis")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "xOther": {\n     range: [-100, 100]\n  },\n     "zoom": {\n     range: [50, 30]\n  }\n});\n\naxes.isBounceArea(["x"]);\naxes.isBounceArea(["x", "zoom"]);\naxes.isBounceArea();\n')),(0,i.kt)("h3",{id:"destroy"},"destroy"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"Destroys properties, and events used in a module and disconnect all connections to inputTypes."),(0,i.kt)("h2",{id:"events"},"Events"),(0,i.kt)("h3",{id:"event-hold"},"hold"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"This event is fired when a user holds an element on the screen of the device."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"pos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"coordinate")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"input"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The instance of inputType where the event occurred")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"inputEvent"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The event object received from inputType")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isTrusted"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Returns true if an event was generated by the user action, or false if it was caused by a script or API call")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "zoom": {\n     range: [50, 30]\n  }\n}).on("hold", function(event) {\n  // event.pos\n  // event.input\n  // event.inputEvent\n  // isTrusted\n});\n')),(0,i.kt)("h3",{id:"event-release"},"release"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"This event is fired when a user release an element on the screen of the device."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"depaPos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinates when releasing an element")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"destPos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinates to move to after releasing an element")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"delta"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The movement variation of coordinate")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"inputEvent"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The event object received from inputType")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"input"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The instance of inputType where the event occurred")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"setTo"),(0,i.kt)("td",{parentName:"tr",align:"center"},"setTo"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Specifies the animation coordinates to move after the event")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isTrusted"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Returns true if an event was generated by the user action, or false if it was caused by a script or API call")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "zoom": {\n     range: [50, 30]\n  }\n}).on("release", function(event) {\n  // event.depaPos\n  // event.destPos\n  // event.delta\n  // event.input\n  // event.inputEvent\n  // event.setTo\n  // event.isTrusted\n\n  // if you want to change the animation coordinates to move after the \'release\' event.\n  event.setTo({x: 10}, 2000);\n});\n')),(0,i.kt)("h3",{id:"event-change"},"change"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"This event is fired when coordinate changes."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"pos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinate")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"delta"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The movement variation of coordinate")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"holding"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Indicates whether a user holds an element on the screen of the device.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"input"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"inputEvent"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The event object received from inputType. If the value is changed by animation, it returns 'null'.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"set"),(0,i.kt)("td",{parentName:"tr",align:"center"},"set"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Specifies the coordinates to move after the event. It works when the holding value is true")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isTrusted"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Returns true if an event was generated by the user action, or false if it was caused by a script or API call")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "zoom": {\n     range: [50, 30]\n  }\n}).on("change", function(event) {\n  // event.pos\n  // event.delta\n  // event.input\n  // event.inputEvent\n  // event.holding\n  // event.set\n  // event.isTrusted\n\n  // if you want to change the coordinates to move after the \'change\' event.\n  // it works when the holding value of the change event is true.\n  event.holding && event.set({x: 10});\n});\n')),(0,i.kt)("h3",{id:"event-animationStart"},"animationStart"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"This event is fired when animation starts."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"depaPos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinates when animation starts")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"destPos"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The coordinates to move to. If you change this value, you can run the animation")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"delta"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object","<","string, number",">"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The movement variation of coordinate")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"duration"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Number"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"input"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"inputEvent"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Object"),(0,i.kt)("td",{parentName:"tr",align:"center"},"The event object received from inputType")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"setTo"),(0,i.kt)("td",{parentName:"tr",align:"center"},"setTo"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Specifies the animation coordinates to move after the event")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isTrusted"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Returns true if an event was generated by the user action, or false if it was caused by a script or API call")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "zoom": {\n     range: [50, 30]\n  }\n}).on("release", function(event) {\n  // event.depaPos\n  // event.destPos\n  // event.delta\n  // event.input\n  // event.inputEvent\n  // event.setTo\n  // event.isTrusted\n\n  // if you want to change the animation coordinates to move after the \'animationStart\' event.\n  event.setTo({x: 10}, 2000);\n});\n')),(0,i.kt)("h3",{id:"event-animationEnd"},"animationEnd"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"This event is fired when animation ends."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isTrusted"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Returns true if an event was generated by the user action, or false if it was caused by a script or API call")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "zoom": {\n     range: [50, 30]\n  }\n}).on("animationEnd", function(event) {\n  // event.isTrusted\n});\n')),(0,i.kt)("h3",{id:"event-finish"},"finish"),(0,i.kt)("div",{className:"bulma-tags"}),(0,i.kt)("p",null,"This event is fired when all actions have been completed."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Type"),": object"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"PROPERTY"),(0,i.kt)("th",{parentName:"tr",align:"center"},"TYPE"),(0,i.kt)("th",{parentName:"tr",align:"center"},"DESCRIPTION"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},"isTrusted"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Boolean"),(0,i.kt)("td",{parentName:"tr",align:"center"},"Returns true if an event was generated by the user action, or false if it was caused by a script or API call")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const axes = new eg.Axes({\n  "x": {\n     range: [0, 100]\n  },\n  "zoom": {\n     range: [50, 30]\n  }\n}).on("finish", function(event) {\n  // event.isTrusted\n});\n')))}u.isMDXComponent=!0}}]);