import {Component} from "react";
import NativeAxes from "@egjs/axes";
import ReactDOM from 'react-dom';
import InputType from "./inputTypes/InputType";
import PanInput from "./inputTypes/PanInput";
import TouchInput from "./inputTypes/TouchInput";
import MoveKeyInput from "./inputTypes/MoveKeyInput";
import WheelInput from "./inputTypes/WheelInput";
import PropTypes from 'prop-types';

function toZeroAxis(axis) {
    const value = {};

    for (const name in axis) {
        value[name] = 0;
    }
    return value;
}
export default class Axes extends Component {
    static propTypes = {
        axis: PropTypes.object,
        inputs: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
    };
    static optionsTypes = {
        easing: PropTypes.func,
        maximumDuration: PropTypes.number,
        minimumDuration: PropTypes.number,
        deceleration: PropTypes.number,
        interruptable: PropTypes.boolean,
    }
    constructor(props) {
        super(props);
        const events = {};
        const options = {};

        for (const name in props) {
            if (name in Axes.propTypes) {
                continue;
            } else if(name in Axes.optionsTypes) {
                options[name] = props[name];
            } else if (~name.search(/^on/)) {
                events[name.replace("on", "").toLowerCase()] = props[name];
            }
        }
        this.axes = new NativeAxes(this.props.axis, options);
        for (const name in events) {
            this.axes.on(name, events[name]);
        }
        this.axes.on("change", this.onChange.bind(this));
        this.axes.on("hold", this.onHold.bind(this));
        const pos = this.axes.get();

        this.state = {
            pos,
            delta: toZeroAxis(this.axes.axis),
            holding: false,
            isTrusted: false,
        };
    }
    onChange(e) {
        this.setState(e);
    }
    onHold(e) {
        this.onChange({
            ...e,
            delta: toZeroAxis(this.axes.axis),
            holding: true,
        })
    }
    render() {
        console.log(this._prev === this.props.inputs);
        this._prev = this.props.inputs;


        return this.props.children(this.state);
    }
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        const inputs = Array.isArray(this.props.inputs) ? this.props.inputs : [this.props.inputs];

        inputs.forEach(input => {
            const inst = input.$$typeof ? new input.type(input.props) : input;
            const props = inst.props;
            const {type, axis, options} = props;
        
            console.log(type, axis, options);
            this.axes.connect(axis, new type(element, options));
        });
    }
    componentWillUnmount() {
        this.axes.destroy();
    }
}


export {InputType, PanInput, MoveKeyInput, TouchInput, WheelInput};