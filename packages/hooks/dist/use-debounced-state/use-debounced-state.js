"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebouncedState = void 0;
const react_1 = require("react");
function useDebouncedState(defaultValue, wait, options = { leading: false }) {
    const [value, setValue] = (0, react_1.useState)(defaultValue);
    const timeoutRef = (0, react_1.useRef)(null);
    const leadingRef = (0, react_1.useRef)(true);
    const clearTimeout = () => window.clearTimeout(timeoutRef.current);
    (0, react_1.useEffect)(() => clearTimeout, []);
    const debouncedSetValue = (0, react_1.useCallback)((newValue) => {
        clearTimeout();
        if (leadingRef.current && options.leading) {
            setValue(newValue);
        }
        else {
            timeoutRef.current = window.setTimeout(() => {
                leadingRef.current = true;
                setValue(newValue);
            }, wait);
        }
        leadingRef.current = false;
    }, [options.leading]);
    return [value, debouncedSetValue];
}
exports.useDebouncedState = useDebouncedState;
