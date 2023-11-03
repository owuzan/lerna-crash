"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebouncedValue = void 0;
const react_1 = require("react");
function useDebouncedValue(value, wait, options = { leading: false }) {
    const [_value, setValue] = (0, react_1.useState)(value);
    const mountedRef = (0, react_1.useRef)(false);
    const timeoutRef = (0, react_1.useRef)(null);
    const cooldownRef = (0, react_1.useRef)(false);
    const cancel = () => window.clearTimeout(timeoutRef.current);
    (0, react_1.useEffect)(() => {
        if (mountedRef.current) {
            if (!cooldownRef.current && options.leading) {
                cooldownRef.current = true;
                setValue(value);
            }
            else {
                cancel();
                timeoutRef.current = window.setTimeout(() => {
                    cooldownRef.current = false;
                    setValue(value);
                }, wait);
            }
        }
    }, [value, options.leading, wait]);
    (0, react_1.useEffect)(() => {
        mountedRef.current = true;
        return cancel;
    }, []);
    return [_value, cancel];
}
exports.useDebouncedValue = useDebouncedValue;
