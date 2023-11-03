"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeout = void 0;
const react_1 = require("react");
function useTimeout(callback, delay, options = { autoInvoke: false }) {
    const timeoutRef = (0, react_1.useRef)(null);
    const start = (0, react_1.useCallback)((...callbackParams) => {
        if (!timeoutRef.current) {
            timeoutRef.current = window.setTimeout(() => {
                callback(callbackParams);
                timeoutRef.current = null;
            }, delay);
        }
    }, [delay]);
    const clear = (0, react_1.useCallback)(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (options.autoInvoke) {
            start();
        }
        return clear;
    }, [clear, start]);
    return { start, clear };
}
exports.useTimeout = useTimeout;
