import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axes, {PanInput} from "../../src/index.js";

class App extends Component {
  constructor(prop) {
    super(prop);
    this.axis = {
      "x": [0, 100],
      "y": [0, 100],
    };
    this.inputs = new PanInput({axis: "x y"});
  }
  render() {
    return (
      <Axes axis={this.axis} inputs = {this.inputs}>
        {({pos, delta, holding}) => (
          <div className="target" style={{
            position: "absolute",
            left: `${100 + pos.x}px`,
            top: `${100 + pos.y}px`,
          }}>Target</div>
        )}
      </Axes>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
