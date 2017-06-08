import {$} from "./utils";
import {UNIQUEKEY} from "./consts";

export default class InputTypeManager {
	constructor() {
		this._inputTypes = {};
		this._inputs = {};
	}
	// static parse(inputType) {
	// 	const result = inputType.replace(/^\s+|\s+$/g, "");

	// 	if(result) {
	// 		return result.split(" ");
	// 	} else {
	// 		return null;
	// 	}
	// }
	set(inputType, inputTypeClass) {
		if (inputTypeClass) {
			this._inputTypes[inputType] = inputTypeClass;
		} else {
			delete this._inputTypes[inputType];
		}
	}
	add(target, inputType, options, observer) {
		const Klass = this._inputTypes(inputType);

		if (!Klass) {
			return this;
		}

		const element = $(target);
		let keyValue = element.getAttribute(UNIQUEKEY);
		let instance;

		if (keyValue) {
			instance = this._inputs[keyValue][inputType];
			instance && instance.unsubscibe();
		} else {
			keyValue = Math.round(Math.random() * new Date().getTime());
			element.setAttribute(UNIQUEKEY, keyValue);
		}
		instance = new Klass().subscribe(element, options, observer);
		this._inputs[keyValue] = Object.assign(this._inputs[keyValue], {
			element,
			[inputType]: instance,
		});
		return this;
	}

	remove(target, inputType) {
		const element = $(target);

		const input = this.getData(element);

		if (input) {
			if (inputType) {
				if (input[inputType]) {
					input[inputType].unsubscibe();
					input[inputType] = null;
				}
			} else {
				for (const p in input) {
					if (!/element/.test(p)) {
						if (input[p]) {
							input[p].unsubscibe();
							input[p] = null;
						}
					}
				}
				delete this._inputs[element.getAttribute(UNIQUEKEY)];
				element.removeAttribute(UNIQUEKEY);
			}
		}
	}

	getData(element) {
		const key = element.getAttribute(UNIQUEKEY);

		return key ? this._inputs[key] : null;
	}

	inputControl(isEnable, element, inputType) {
		const input = this.getData(element);

		if (input) {
			const instance = input[inputType];

			instance && instance.enable && instance.disable && instance[isEnable ? "enable" : "disable"]();
		}

		return this;
	}

	destroy() {
		for (const p in this._inputs) {
			this.remove(this._inputs[p].element);
		}
		this._inputs = {};
		this._inputTypes = {};
	}
}
