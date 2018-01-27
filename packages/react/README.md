# react-axes [![npm version](https://badge.fury.io/js/%40egjs%2Freact-axes.svg)](https://badge.fury.io/js/%40egjs%2Freact-axes)

Use Axes to 
react component used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates.  


- [API Documents](https://github.com/naver/egjs-axes/wiki/Axes-API-for-react-(react-axes))
- [Demo](https://naver.github.io/egjs-axes/)


## Install
```bash
$ npm install @egjs/react-axes
```

## Usage
```jsx
import Axes, {PanInput, WheelInput, MoveKeyInput} from "@egjs/react-axes";

<Axes axis={{
    x: {
        range: [0, 100],
        bounce: [20, 50],
    },
    y: {
        range: [0, 100],
        bounce: [20, 50],
    },
    z: {
        range: [0.2, 1.2],
    }
},
inputs={[
    new MoveKeyInput({axis: "x y", scale: [10, -10]}),
    new PanInput({axis: "x y"}),
    new WheelInput({axis: "z"})
]}>
({pos, delta, holding, inputEvent}) => (<div style={{left: `${pos.x}px`, top: `${pox.y}px`, transform: `scale(${pos.z})`}}></div>)
</Axes>
```

## API
### props
|name|type|description|
|---|---------------|---|
|axis|Map(key: string, value: [AxisOption](https://naver.github.io/egjs-axes/release/latest/doc/global.html#AxisOption))|The key of the axis specifies the name to use as the logical virtual coordinate system.|
|inputs|InputType[] or InputType| The inputType instance to associate with the axis of eg.Axes|
|other props||[AxesOption](https://naver.github.io/egjs-axes/release/latest/doc/global.html#AxesOptionObject)|

> #### InputTypes
> All inputTypes provide an `axis` property that represents the axis.
>
> * MoveKeyInput(options: [MoveKeyInputOption](https://naver.github.io/egjs-axes/release/latest/doc/global.html#MoveKeyInputOption))
> * PanInput(options: [PanInputOption](https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption))
> * PinchInput(options: [PinchInput](https://naver.github.io/egjs-axes/release/latest/doc/global.html#PinchInputOption))
> * WheelInput(options: [WheelInputOption](https://naver.github.io/egjs-axes/release/latest/doc/global.html#WheelInputOption))


## Supported Browsers
The following are the supported browsers.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|



## Development

```bash
# Run rc-tools server and see examples for development
$ npm run start
```


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-axes/issues) page on GitHub.


## License
react-axes is released under the [MIT license](https://github.com/naver/egjs-axes/blob/master/LICENSE).


```
Copyright (c) 2017 NAVER Corp.

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
