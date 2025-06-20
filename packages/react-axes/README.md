<h1 align="center" style="max-width: 100%;">
  <img width="256" alt="Axes Logo" src="https://raw.githubusercontent.com/naver/egjs-axes/master/packages/demo/static/img/axes.svg" style="max-width: 256px;" /><br/>
  <a href="https://naver.github.io/egjs-axes/">React Axes</a>
</h1>

<p align="center" style="line-height: 2;">
  <a href="https://www.npmjs.com/package/@egjs/react-axes" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/react-axes.svg?style=flat-square&color=007acc&label=version&logo=NPM" alt="version" /></a>
  <a href="https://www.npmjs.com/package/@egjs/react-axes" target="_blank"><img alt="npm weekly downloads" src="https://img.shields.io/npm/dw/@egjs/react-axes?logo=npm&style=flat-square&color=007acc" /></a>
  <a href="https://www.npmjs.com/package/@egjs/react-axes" target="_blank"><img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/react-axes.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc" /></a>
  <a href="https://github.com/naver/egjs-axes/actions/workflows/run-unit.yml" target="_blank"><img alt="Run tests" src="https://github.com/naver/egjs-axes/actions/workflows/run-unit.yml/badge.svg" /></a>
  <a href="https://coveralls.io/github/naver/egjs-axes?branch=master&style=flat-square" target="_blank"><img alt="Coveralls github" src="https://img.shields.io/coveralls/github/naver/egjs-axes.svg?style=flat-square&label=%E2%9C%85%20coverage" /></a>
  <a href="https://github.com/naver/egjs-axes/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/static/v1?style=flat-square&label=%F0%9F%93%9C%20license&message=MIT&color=08CE5D" /></a>
  <img src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript" />
</p>

<h3 align="center">
  <a href="https://naver.github.io/egjs-axes/">Demo</a> / <a href="https://naver.github.io/egjs-axes/docs/api/Axes">Documentation</a> / <a href="https://naver.github.io/egjs/"><img height="20" src="https://naver.github.io/egjs/img/logo.svg"/> Other components</a>
</h3>

<p align="center">
  <b>You can easily create a UI that responds to user actions.</b><br />
</p>

-----

<img src="https://github.com/naver/egjs-axes/raw/master/packages/demo/static/img/demos/structure.png" style="width:100%">

## ✨ Features
- Axes translate user action entered by various input devices into the virtual coordinate system.
- You can create an UI that responds to user actions.
- Provides five input types. These can be associated with a user interface.
  - [PanInput](https://naver.github.io/egjs-axes/docs/api/PanInput)
  - [RotatePanInput](https://naver.github.io/egjs-axes/docs/api/RotatePanInput)
  - [PinchInput](https://naver.github.io/egjs-axes/docs/api/PinchInput)
  - [WheelInput](https://naver.github.io/egjs-axes/docs/api/WheelInput)
  - [MoveKeyInput](https://naver.github.io/egjs-axes/docs/api/MoveKeyInput)
- Provides six types of events generated by InputTypes.
  - [hold](https://naver.github.io/egjs-axes/docs/api/Axes#event-hold)
  - [change](https://naver.github.io/egjs-axes/docs/api/Axes#event-change)
  - [release](https://naver.github.io/egjs-axes/docs/api/Axes#event-release)
  - [animationStart](https://naver.github.io/egjs-axes/docs/api/Axes#event-animationStart)
  - [animationEnd](https://naver.github.io/egjs-axes/docs/api/Axes#event-animationEnd)
  - [finish](https://naver.github.io/egjs-axes/docs/api/Axes#event-finish)
- Moreover, you can create your own custom InputTypes!

## ⚙️ Installation
#### npm
```bash
$ npm install @egjs/react-axes
```

## 🏃 Quick Start

### Using reactive properties from useAxes
* You can change the value of the axis through touch screen, mouse or anything else.
* You can use the names of each axis as reactive properties.
* Connect axis with various InputTypes inside useEffect.

```jsx
import { PanInput, useAxes } from "@egjs/react-axes";

function App() {
  const area = useRef<HTMLDivElement>(null);
  const { connect, rotateX, rotateY } = useAxes(
    {
      rotateX: {
        range: [0, 360],
        circular: true,
        startPos: 0,
      },
      rotateY: {
        range: [0, 360],
        circular: true,
        startPos: 0,
      },
    },
    {
      deceleration: 0.0024,
    },
  );

  useEffect(() => {
    connect("rotateX rotateY", new PanInput(area));
  }, []);

  return (
    <div className="App">
      <div id="area" ref={area} style={{ transform: `rotateY(${rotateX}deg) rotateX(${rotateY}deg)` }}>
        <div id="item"></div>
      </div>
    </div>
  );
}
```

### Using Events with useAxes
- useAxes provides hooks to define callback functions for each event.
- If the callback function references any values, please pass them in the dependency array.
- For a detailed description of the event object passed to the callback functions, please refer to [Events](https://naver.github.io/egjs-axes/docs/api/Axes#events).
```js
const {
    onHold,
    onChange,
    onRelease,
    onAnimationStart,
    onAnimationEnd,
    onFinish,
    ...
} = useAxes({...});

// `hold` Event Hook
onHold(callback, dependencies);

// `change` Event Hook
onChange(callback, dependencies);

// `release` Event Hook
onRelease(callback, dependencies);

// `animationStart` Event Hook
onAnimationStart(callback, dependencies);

// `animationEnd` Event Hook
onAnimationEnd(callback, dependencies);

// `finish` Event Hook
onFinish(callback, dependencies);
```

## 🌐 Supported Browsers
|<img width="20" src="https://simpleicons.org/icons/internetexplorer.svg" alt="IE" />|<img width="20" src="https://simpleicons.org/icons/googlechrome.svg" alt="Chrome" />|<img width="20" src="https://simpleicons.org/icons/firefoxbrowser.svg" alt="Firefox" />|<img width="20" src="https://simpleicons.org/icons/safari.svg" alt="Safari" />|<img width="20" src="https://simpleicons.org/icons/apple.svg" alt="iOS" />|<img width="20" src="https://simpleicons.org/icons/android.svg" alt="Android" />|
|:---:|:---:|:---:|:---:|:---:|:---:|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|

## 🔧 Dependency
egjs-axes has the dependencies for the following libraries:

|[eg.Component](http://github.com/naver/egjs-component)|[eg.Agent](http://github.com/naver/egjs-agent)|
|----|----|
|3.0.1+|2.2.1+|

## 📼 Demos
Check our [Demos](https://naver.github.io/egjs-axes/).

## 📖 Documentation
See [Documentation](https://naver.github.io/egjs-axes/docs/api/Axes) page.

## 🙌 Contributing
See [CONTRIBUTING.md](https://github.com/naver/egjs-axes/blob/master/CONTRIBUTING.md).

## 📝 Feedback & Bug Report
Please file an [Issue](https://github.com/naver/egjs-axes/issues).

## 📜 License
@egjs/react-axes is released under the [MIT license](https://github.com/naver/egjs-axes/blob/master/LICENSE).

```
Copyright (c) 2015 NAVER Corp.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<p align="center">
  <a href="https://naver.github.io/egjs/"><img height="50" src="https://naver.github.io/egjs/img/logotype1_black.svg" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/naver"><img height="50" src="https://naver.github.io/OpenSourceGuide/book/assets/naver_logo.png" /></a>
</p>
