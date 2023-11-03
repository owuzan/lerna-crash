"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceCallback = void 0;
const react_1 = require("react");
const use_callback_ref_1 = require("../use-callback-ref/use-callback-ref");
function useDebounceCallback(callback, delay) {
    const handleCallback = (0, use_callback_ref_1.useCallbackRef)(callback);
    const debounceTimerRef = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => () => window.clearTimeout(debounceTimerRef.current), []);
    return (0, react_1.useCallback)(() => {
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = window.setTimeout(handleCallback, delay);
    }, [handleCallback, delay]);
}
exports.useDebounceCallback = useDebounceCallback;
