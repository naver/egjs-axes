import HM from "hammerjs";
import utils from "./utils";
import { DIRECTION, UNIQUEKEY, SUPPORT_TOUCH } from "./consts";
import EventManager from "./events";

export default class HammerManager {
    constructor() {
        this._hammers = {};
        this._eventManager = new EventManager();
    }

    _createHammer(el, subOptions, inputClass, handler) {
		try {
			// create Hammer
			return this._attachHammerEvents(new HM.Manager(el, {
					recognizers: [
						[
							HM.Pan, {
								direction: subOptions.direction,
								threshold: 0
							}
						]
					],

					// css properties were removed due to usablility issue
					// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
					cssProps: {
						userSelect: "none",
						touchSelect: "none",
						touchCallout: "none",
						userDrag: "none"
					},
					inputClass: inputClass
				}), subOptions, handler);
		} catch (e) {}
	}

    add(element, options, handler) {
		let el = utils.getElement(element);
		let keyValue = el[UNIQUEKEY];
		let subOptions = Object.assign({
			direction: DIRECTION.DIRECTION_ALL,
			scale: [ 1, 1 ],
			thresholdAngle: 45,
			interruptable: true,
			inputType: [ "touch", "mouse" ]
		}, options);

		let inputClass = this._convertInputType(subOptions.inputType);
		if (!inputClass) {
			return;
		}

		if (keyValue) {
			this._hammers[keyValue].inst.destroy();
		} else {
			keyValue = Math.round(Math.random() * new Date().getTime());
		}
		this._hammers[keyValue] = {
			inst: this._createHammer(
				el,
				subOptions,
				inputClass,
                handler
			),
			el: el,
			options: subOptions
		};
		el[UNIQUEKEY] = keyValue;
	}

    remove(element) {
        let el = utils.getElement(element);
		let key = el[UNIQUEKEY];
		if (key) {
			this._hammers[key].inst.destroy();
			delete this._hammers[key];
			delete el[UNIQUEKEY];
		}
    }

    getHammer(element) {
		let data = this.get(element);
        return data ? data.inst : null;
	}

    get(element) {
        let el = utils.getElement(element);
		let key = el[UNIQUEKEY];
		if (key && this._hammers[key]) {
			return this._hammers[key];
		} else {
			return null;
		}
    }

    _attachHammerEvents(hammer, options, handler) {
		return hammer.on("hammer.input", e => {
				if (e.isFirst) {
					// apply options each
                    // this._eventManager.set(this.get(e.target).options);
                    handler.start(e);
				} else if (e.isFinal) {
					// substitute .on("panend tap", this._panend); Because it(tap, panend) cannot catch vertical(horizontal) movement on HORIZONTAL(VERTICAL) mode.
                    handler.end(e);
				}
			})
			.on("panstart panmove", handler.move);
	}

	_detachHammerEvents(hammer) {
		hammer.off("hammer.input panstart panmove panend");
	}

    _convertInputType(inputType = []) {
		let hasTouch = false;
		let hasMouse = false;
		// inputType = inputType || [];
		inputType.forEach( v => {
			switch (v) {
				case "mouse" : hasMouse = true; break;
				case "touch" : hasTouch = SUPPORT_TOUCH;
			}
		});

		return hasTouch && HM.TouchInput || hasMouse && HM.MouseInput || null;
	}

    destroy() {
		for (let p in this._hammers) {
			this._hammers[p].inst.destroy();
			delete this._hammers[p].el[UNIQUEKEY];
			delete this._hammers[p];
		}
	}
};
