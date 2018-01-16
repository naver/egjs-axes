import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axes, {MoveKeyInput} from "../index.js";

class App extends Component {
  constructor(prop) {
    super(prop);
    this.axis = {
      "x": {
        range: [0, 100],
        bounce: [50, 50],
      },
      "y": {
        range: [0, 100],
        bounce: [50, 50],
      },
    };
    this.inputs = new MoveKeyInput({axis: "x y", scale: [25,-25]});
  }
  render() {
    return (
      <Axes axis={this.axis} inputs = {this.inputs}>
        {({pos, delta, holding}) => {
          return (
          <div className="target" onClick={e => {this.setState({test:"1"})}} style={{
            position: "absolute",
            left: `${100 + pos.x}px`,
            top: `${100 + pos.y}px`,
          }}>NiceMeet</div>
        )}}
      </Axes>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
