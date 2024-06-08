import { g as getDefaultExportFromCjs } from './_chunks/_commonjsHelpers-BFTU3MAI.js';

var debounce$1 = {exports: {}};

function debounce(function_, wait, options) {
    if (wait === void 0) wait = 100;
    if (options === void 0) options = {};
    if (typeof function_ !== 'function') {
        throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
    }
    if (wait < 0) {
        throw new RangeError('`wait` must not be negative.');
    }
    // TODO: Deprecate the boolean parameter at some point.
    const { immediate } = typeof options === 'boolean' ? {
        immediate: options
    } : options;
    let storedContext;
    let storedArguments;
    let timeoutId;
    let timestamp;
    let result;
    function run() {
        const callContext = storedContext;
        const callArguments = storedArguments;
        storedContext = undefined;
        storedArguments = undefined;
        result = function_.apply(callContext, callArguments);
        return result;
    }
    function later() {
        const last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timeoutId = setTimeout(later, wait - last);
        } else {
            timeoutId = undefined;
            if (!immediate) {
                result = run();
            }
        }
    }
    const debounced = function() {
        for(var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++){
            arguments_[_key] = arguments[_key];
        }
        if (storedContext && this !== storedContext) {
            throw new Error('Debounced method called with different contexts.');
        }
        storedContext = this; // eslint-disable-line unicorn/no-this-assignment
        storedArguments = arguments_;
        timestamp = Date.now();
        const callNow = immediate && !timeoutId;
        if (!timeoutId) {
            timeoutId = setTimeout(later, wait);
        }
        if (callNow) {
            result = run();
        }
        return result;
    };
    debounced.clear = ()=>{
        if (!timeoutId) {
            return;
        }
        clearTimeout(timeoutId);
        timeoutId = undefined;
    };
    debounced.flush = ()=>{
        if (!timeoutId) {
            return;
        }
        debounced.trigger();
    };
    debounced.trigger = ()=>{
        result = run();
        debounced.clear();
    };
    return debounced;
}
// Adds compatibility for ES modules
var debounce_2 = debounce$1.exports.debounce = debounce;
debounce$1.exports = debounce;
var debounceExports = debounce$1.exports;
var index = /*@__PURE__*/ getDefaultExportFromCjs(debounceExports);

export { debounce_2 as debounce, index as default };
