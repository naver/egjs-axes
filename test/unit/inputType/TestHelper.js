export default class TestHelper {
	static wheelVertical(target, value, callback) {
		if (target instanceof Element === false) {
			return;
		}

		const params = {deltaY: value};
		let wheelEvent;

		try {
			wheelEvent = new WheelEvent("wheel", params);
		} catch (e) {
			wheelEvent = document.createEvent("WheelEvent");
			wheelEvent.initEvent("wheel", params);
		}
		let isCall = false;

		function callbackOnce() {
			if (isCall) {
				return;
			}
			isCall = true;
			callback && callback();
			target.removeEventListener("wheel", callbackOnce);// Is this posible??
		}
		target.addEventListener("wheel", callbackOnce);
		target.dispatchEvent(wheelEvent);
	}
	static key(target, behavior, value, callback) {
		if (target instanceof Element === false) {
			return;
		}
		let keyboardEvent;

		try {
			keyboardEvent = new KeyboardEvent(behavior, value);
			delete keyboardEvent.keyCode;
			Object.defineProperty(keyboardEvent, "keyCode", {
				"value": value.keyCode,
				"writable": true,
			});
		} catch (e) {
			keyboardEvent = document.createEvent("KeyboardEvent");
			keyboardEvent.initKeyboardEvent(behavior, true, false, null, 0, false, 0, false, value.keyCode, 0);
		}

		function callbackOnce() {
			callback && callback();
			target.removeEventListener(behavior, callbackOnce);// Is this posible??
		}

		target.addEventListener(behavior, callbackOnce);
		target.dispatchEvent(keyboardEvent);
	}
	/**
	 * looping async function
	 *
	 * @param {*} count loop count
	 * @param {*} loopFunc user loop function
	 * @param {*} complete callback function which called if done.
	 */
	static asyncLoop(count, loopFunc, complete) {
		let i = 0;

		function loop() {
			if (i >= count) {
				complete();
				return;
			}

			loopFunc(i, () => {
				// done
				i++;
				loop();
			});
		}

		loop();
	}
}

