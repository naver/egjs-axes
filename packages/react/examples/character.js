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
        data-tooltip="You can zoom sun by mouse wheel (WheelInput)"
        data-axis={`zoom: ${pos.zoom}`}
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
        range: [0.7, 1.3],
        bounce: [0.2, 0.2],
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
        data-tooltip="You can zoom tree by mouse wheel (WheelInput)" data-axis={`zoom: ${pos.zoom}`}>
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
        }} data-tooltip="You can move cloud by mouse drag or touch (PanInput)" data-axis={`x: ${pos.x}, y: ${pos.y}`}>
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
    return (<div className={`character ${this.props.hair} ${this.props.look} ${this.left}`} style={
      {
        left: `${x / 96 * 80}%`,
		    marginBottom: `${(y * 3 + (8 - level) * 5)}px`,
      }
    } data-tooltip="You can move character by arrow key (MoveKeyInput)" data-axis={`x: ${x}, y: ${y}`}>
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

const hair = ["short", "baldhead", "bob"];
const look = ["", "grin", "angry", "absence"];

class App extends Component {
  constructor(prop) {
    super(prop);
    this.inputs = new MoveKeyInput({axis: "x y", scale: [2, 2]});
    this.state = {
      className: "",
      hair: 0,
      look: 0,
    };

    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
    this.changeHair = this.changeHair.bind(this);
    this.changeLook = this.changeLook.bind(this);
  }
  showInfo() {
    this.setState({className: "showInfo"});
  }
  hideInfo() {
    this.setState({className: ""});
  }
  changeHair() {
    this.setState({hair: (this.state.hair + 1) % hair.length});
  }
  changeLook() {
    this.setState({look: (this.state.look + 1) % look.length});
  }
  render() {
    return (
      <div>
        <Axes axis={{
          "x": [0, 100],
          "y": [0, 40],
        }} inputs = {this.inputs}>
          {({pos, delta}) => (
            <div className={`container ${this.state.className}`}>
              <Sun />
              <Cloud top="120px" left="70%"/>
              <Cloud top="80px" left="40%"/>
              <Cloud top="140px" left="20%"/>
              <div className="broad">
                <Tree right="40%" bottom="80%"/>
                <Character face="" pos={pos} delta={delta} hair={hair[this.state.hair]} look={look[this.state.look]}/>
                <Tree right="20%" bottom="30%"/>
                <Tree right="70%" bottom="30%"/>
              </div>
              <div className="controller">
              </div>
            </div>
          )}
        </Axes>
        <div className="buttons">
          <button onClick={this.showInfo}>Show Information</button>
          <button onClick={this.hideInfo}>Hide Information</button>
          <button onClick={this.changeHair}>Change Hair</button>
          <button onClick={this.changeLook}>Change A Look</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
