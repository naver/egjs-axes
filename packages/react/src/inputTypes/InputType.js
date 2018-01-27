import PropTypes from 'prop-types';

export default class InputType {
    static propTypes = {
        type: PropTypes.func,
        axis: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),
    };
    static makeType(type) {
        return (class Type extends InputType {
            constructor(props) {
                super({
                    ...props,
                    type,
                });
            }
        });
    }
    constructor(props) {
        const options = {};

        for (let name in props) {
            if (name in InputType.propTypes) {
                continue;
            }
            options[name] = props[name];
        }
        this.props = {
            type: props.type,
            axis: props.axis,
            options,
        };
    }
}