export default class TestHelper {
  static dispatchWheel(target, params, callback) {
    if (target instanceof Element === false) {
      return;
    }

    let wheelEvent;

    try {
      wheelEvent = new WheelEvent("wheel", params);
    } catch (e) {
      wheelEvent = document.createEvent("WheelEvent");
      wheelEvent.initEvent("wheel", params);
    }
    let isCall = false;

    const callbackOnce = () => {
      if (isCall) {
        return;
      }
      isCall = true;
      callback && callback();
      target.removeEventListener("wheel", callbackOnce); // Is this posible??
    };
    target.addEventListener("wheel", callbackOnce);
    target.dispatchEvent(wheelEvent);
  }

  static dispatchDrag(target, from, to, options) {
    const startRect = target.getBoundingClientRect();
    const mousedown = new MouseEvent("mousedown", this.getMouseInit(startRect, from));
    target.dispatchEvent(mousedown);

    const count = Math.floor(options.duration / options.interval);
    for (let i = 1; i <= count; ++i) {
      this.dispatchMouseMove(target, this.getMouseInit(startRect, {
        left: from.left + (to.left - from.left) / count * i,
        top: from.top + (to.top - from.top) / count * i,
      }), options.interval * i);
    }
    return new Promise(resolve => {
      setTimeout(() => {
        const mosueup = new MouseEvent("mouseup", this.getMouseInit(startRect, to));

        target.dispatchEvent(mosueup);
        resolve();
      }, options.duration);
    });
  }

  static dispatchMouseMove(target, moustInit, time) {
    setTimeout(() => {
      const mousemove = new MouseEvent("mousemove", moustInit);

      target.dispatchEvent(mousemove);
    }, time);
  }

  static getMouseInit(startRect, offsetRect) {
    return {
      buttons: 1,
      screenX: startRect.left + offsetRect.left,
      screenY: startRect.top + offsetRect.top,
      clientX: startRect.left + offsetRect.left,
      clientY: startRect.top + offsetRect.top,
      offsetX: offsetRect.left,
      offsetY: offsetRect.top,
      bubbles: true,
      cancelable: true,
    };
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
        value: value.keyCode,
        writable: true,
      });
    } catch (e) {
      keyboardEvent = document.createEvent("KeyboardEvent");
      keyboardEvent.initKeyboardEvent(
        behavior,
        true,
        false,
        null,
        0,
        false,
        0,
        false,
        value.keyCode,
        0
      );
    }

    const callbackOnce = () => {
      callback && callback();
      target.removeEventListener(behavior, callbackOnce); // Is this posible??
    };

    target.addEventListener(behavior, callbackOnce);
    target.dispatchEvent(keyboardEvent);
  }

  /**
   * looping async function
   * @param {*} count loop count
   * @param {*} loopFunc user loop function
   * @param {*} complete callback function which called if done.
   */
  static asyncLoop(count, loopFunc, complete) {
    let i = 0;

    const loop = () => {
      if (i >= count) {
        complete();
        return;
      }

      loopFunc(i, () => {
        // done
        i++;
        loop();
      });
    };

    loop();
  }

  static panOnElement(el, param, debugOption) {
    const rect = el.getBoundingClientRect();

    const paramByEl = Object.assign({}, param, {
      pos: [rect.left + param.pos[0], rect.top + param.pos[1]],
    });

    // console.log(paramByEl);
    return new Promise((res) => {
      Simulator.gestures.pan(el, paramByEl, res);

      if (debugOption) {
        debugOption.clock && debugOption.clock.tick(param.duration + 100); // margin (100) is needed.
      }
    });
  }
}
