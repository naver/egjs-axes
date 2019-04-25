import {Component} from "react";
import NativeAxes from "@egjs/axes";
import ReactDOM from 'react-dom';
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
        const axis = {};

        for (const name in props) {
            if (name in Axes.propTypes) {
                continue;
            } else if(name in Axes.optionsTypes) {
                options[name] = props[name];
            } else if (~name.search(/^on/)) {
                events[name.replace("on", "").toLowerCase()] = props[name];
            }
        }

        const propsAxis = this.props.axis;

        for (const name in propsAxis) {
            if (Array.isArray(propsAxis[name])) {
                axis[name] = {
                    range: propsAxis[name],
                };
            } else {
                axis[name] = propsAxis[name];
            }
        }
        this.axes = new NativeAxes(axis, options);
        for (const name in events) {
            this.axes.on(name, events[name]);
        }
        this.axes.on("change", this.onChange.bind(this));
        this.axes.on("hold", this.onHold.bind(this));
        this.axes.on("release", this.onRelease.bind(this));
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
    onRelease(e) {
        this.onChange({
            ...e,
            pos: this.axes.get(),
            delta: toZeroAxis(this.axes.axis),
            holding: false,
        })
    }
    render() {
        return this.props.children(this.state);
	}
	componentDidUpdate() {
		this.axes.axis = this.props.axis;
	}
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);

        if (!element) {
            return;
        }
        const inputs = Array.isArray(this.props.inputs) ? this.props.inputs : [this.props.inputs];

        inputs.forEach(input => {
            const inst = input.$$typeof ? new input.type(input.props) : input;
            const props = inst.props;
            const {type, axis, options} = props;

            this.axes.connect(axis, new type(element, options));
        });
    }
    componentWillUnmount() {
        this.axes.destroy();
    }
}
