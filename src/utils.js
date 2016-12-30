import { window, document } from "./browser";

var utils = {
    getElement(el) {
        if (typeof el === "string") {
            return document.querySelector(el);
        } else if( window.jQuery && (el instanceof jQuery ) && el.length > 0) {
            // if you were using jQuery
            return el[0];
        } else {
            return el;
        }
    }
};

export default utils;