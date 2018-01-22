import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axes, {PanInput, MoveKeyInput, WheelInput} from "../index.js";

class Sun extends Component {
  constructor(props) {
    super(props);
    this.axis = {
      "zoom": {
        range: [1, 1.8],
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
        range: [0.6, 1.2],
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
        <div className={`tree ${this.props.mediaHide ? "mediaHide" : ""}`} style={{right, bottom, transform:`scale(${pos.zoom})`}}
        data-tooltip="Mouse Wheel (WheelInput)" data-axis={`zoom: ${pos.zoom}`}>
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
        range: [0, 100],
        bounce: [100, 100],
      },
      "y": {
        range: [0, 120],
        bounce: [100, 100],
      }
    };
    this.inputs = new PanInput({axis: "x y", scale: [0.5, 1]});  
  }
  render() {
    return (
      <Axes axis={this.axis} inputs = {this.inputs}>
      {({pos, inputEvent}) => (
        <div className={`cloud ${this.props.mediaHide ? "mediaHide" : ""}`} style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          left: this.props.left,
          top: this.props.top,
        }} data-tooltip="Mouse Drag or Touch (PanInput)" data-axis={`x: ${pos.x}, y: ${pos.y}`}>
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

const hair = ["short", "baldhead", "bob"];
const look = ["", "grin", "angry", "absence"];

class Character extends Component {
  constructor(props) {
    super(props);
    this.left = "";
    this.state = {
      hair: 0,
      look: 0,
    };
    this.changeHair = this.changeHair.bind(this);
  }
  changeHair() {
    this.setState({hair: (this.state.hair + 1) % hair.length});
  }
  render() {
    const {pos, delta} = this.props;
    const {x, y} = pos;
    const level = Math.abs((x + y) % 16 -8);
    const face = parseInt(x / 25.1);

    if (delta.x < 0) {
			this.left = "left";
		} else if (delta.x > 0) {
			this.left = "";
		}
    return (<div className={`character ${hair[this.state.hair]} ${look[face]} ${this.left}`} style={
      {
        left: `${x / 96 * 80}%`,
		    marginBottom: `${(y / 10 + (8 - level) * 1)}%`,
      }
    } data-tooltip="Keyboard Arrow Key (MoveKeyInput)" data-axis={`x: ${x}, y: ${y}`}>
    <div className="inner">
      <div className="hair-back">
          <div className="hair hair1"></div>
          <div className="hair hair2"></div>
          <div className="hair hair3"></div>
          <div className="hair hair4"></div>
      </div>
      <div className="head" onClick= {this.changeHair}>
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
    this.state = {
      className: "",

    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }
  toggleInfo() {
    this.setState({className: this.state.className ? "" : "showInfo"});
  }
  render() {
    return (
        <Axes axis={{
          "x": [0, 100],
          "y": [0, 40],
        }} inputs = {this.inputs}>
          {({pos, delta, inputEvent}) => {
            inputEvent && inputEvent.preventDefault();
            return (
            <div className={`container ${this.state.className}`}>
              <Sun />
              <Cloud top="60px" left="60%" />
              <Cloud top="20px" left="45%" mediaHide/>
              <Cloud top="80px" left="200px"/>
              <div className="broad">
                <Tree right="40%" bottom="80%" mediaHide/>
                <Character face="" pos={pos} delta={delta}/>
                <Tree right="20%" bottom="30%" />
                <Tree right="70%" bottom="30%" />
              </div>
              <div className="buttons">
              <button onClick={this.toggleInfo}>Toggle Information</button>
            </div>
            </div>
          );
        }
        }
        </Axes>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
