import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axes, {PanInput, MoveKeyInput, WheelInput} from "../index.js";

class Sun extends Component {
  constructor(props) {
    super(props);
    this.axis = {
      "zoom": {
        range: [1, 2],
        bounce: [0.2, 0.2],
      }
    };
    this.inputs = new WheelInput({axis: "zoom", useNormalized: false, scale: 0.1});  
  }
  render() {
    return (
      <Axes axis={this.axis} inputs = {this.inputs}>
      {({pos}) => (
        <div className="sun" style={{transform:`scale(${pos.zoom})`}}
        data-tooltip="Mouse Wheel (WheelInput)"
        ></div>
      )}
      </Axes>
    );
  }
}
class Tree extends Component {
  constructor(props) {
    super(props);
    this.axis = {
      "zoom": {
        range: [1, 1.6],
        bounce: [0.5, 0.5],
      }
    };
    this.inputs = new WheelInput({axis: "zoom", useNormalized: false, scale: 0.1});  
  }
  render() {
    const {right, bottom} = this.props;
    return (
      <Axes axis={this.axis} inputs = {this.inputs}>
      {({pos}) => (
        <div className="tree" style={{right, bottom, transform:`scale(${pos.zoom})`}}
        data-tooltip="Mouse Wheel (WheelInput)">
          <div className="leaves leaves1"></div>
          <div className="leaves leaves2"></div>
          <div className="leaves leaves3"></div>
          <div className="trunk"></div>
        </div>
      )}
      </Axes>
    );
  }
}

class Cloud extends Component {
  constructor(props) {
    super(props);
    this.axis = {
      "x": {
        range: [0, 300],
        bounce: [100, 100],
      },
      "y": {
        range: [0, 100],
        bounce: [100, 100],
      }
    };
    this.inputs = new PanInput({axis: "x y"});  
  }
  render() {
    return (
      <Axes axis={this.axis} inputs = {this.inputs}>
      {({pos}) => (
        <div className="cloud" style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          left: this.props.left,
          top: this.props.top,
        }} data-tooltip="Mouse Drag Or Touch (PanInput)">
          <div className="c1"></div>
          <div className="c2"></div>
          <div className="c3"></div>
          <div className="c4"></div>
          <div className="bottom"></div>
        </div>
      )}
      </Axes>
    );
  }
}
class Character extends Component {
  constructor(props) {
    super(props);
    this.left = "";
  }
  render() {
    const {pos, delta} = this.props;
    const {x, y} = pos;
    const level = Math.abs((x + y) % 16 -8);

    if (delta.x < 0) {
			this.left = "left";
		} else if (delta.x > 0) {
			this.left = "";
		}
    return (<div className={`character short ${this.left}`} style={
      {
        left: `${x / 96 * 80}%`,
		    marginBottom: `${(y * 3 + (8 - level) * 5)}px`,
      }
    } data-tooltip="Keyboard Arrow Key (MoveKeyInput)">
    <div className="inner">
      <div className="hair-back">
          <div className="hair hair1"></div>
          <div className="hair hair2"></div>
          <div className="hair hair3"></div>
          <div className="hair hair4"></div>
      </div>
      <div className="head">
          <div className="ear"></div>
          <div className="cheek"></div>
          <div className="head-front">
              <div className="hair-front">
                  <div className="hairs"></div>
                  <div className="hair hair1"></div>
                  <div className="hair hair2"></div>
                  <div className="hair hair3"></div>
                  <div className="hair hair4"></div>
                  <div className="hair hair5"></div>
                  <div className="hair hair6"></div>
                  <div className="hair hair7"></div>
                  <div className="hair hair8"></div>
              </div>
              <div className="hair-front-tail right"></div>
              <div className="hair-front-tail left"></div>
              <div className="eyes">
                  <div className="eye left"></div>
                  <div className="eye right"></div>
              </div>
              <div className="mouth"></div>
          </div>
      </div>
      <div className="body">
          <div className="body-front"></div>
          <div className="arm left" style={{transform:`rotate(${(9 - level) * 12}deg)`}}>
              <div className="arm-front"></div><div className="fist"></div>
          </div>
          <div className="arm right" style={{transform:`rotate(${-(9 - level) * 12}deg)`}}>
              <div className="arm-front"></div><div className="fist"></div>
          </div>
          <div className="legs">
              <div className="leg left" style={{transform: `rotate(${(8 - level) * 10}deg)`}}>
                  <div className="leg-front"></div><div className="foot"></div>
              </div>
              <div className="leg right" style={{transform: `rotate(${-(8 - level) * 12}deg)`}}>
                  <div className="leg-front"></div><div className="foot"></div>
              </div>
          </div>
      </div>
    </div>
</div>);
  }
}

class App extends Component {
  constructor(prop) {
    super(prop);
    this.inputs = new MoveKeyInput({axis: "x y", scale: [2, 2]});
  }
  render() {
    return (
        <Axes axis={{
          "x": [0, 100],
          "y": [0, 40],
        }} inputs = {this.inputs}>
          {({pos, delta}) => (
            <div className="container">
              <Sun />
              <Cloud top="120px" left="70%"/>
              <Cloud top="80px" left="40%"/>
              <Cloud top="140px" left="20%"/>
              <div className="broad"></div>
              <Tree right="40%" bottom="200px"/>
              <Character face="" pos={pos} delta={delta}/>
              <Tree right="20%" bottom="100px"/>
              <Tree right="70%" bottom="100px"/>
              <div className="controller">
              </div>
            </div>
          )}
        </Axes>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
