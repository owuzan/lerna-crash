"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusWithin = void 0;
const react_1 = require("react");
function containsRelatedTarget(event) {
    if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
        return event.currentTarget.contains(event.relatedTarget);
    }
    return false;
}
function useFocusWithin({ onBlur, onFocus, } = {}) {
    const ref = (0, react_1.useRef)();
    const [focused, _setFocused] = (0, react_1.useState)(false);
    const focusedRef = (0, react_1.useRef)(false);
    const setFocused = (value) => {
        _setFocused(value);
        focusedRef.current = value;
    };
    const handleFocusIn = (event) => {
        if (!focusedRef.current) {
            setFocused(true);
            onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
        }
    };
    const handleFocusOut = (event) => {
        if (focusedRef.current && !containsRelatedTarget(event)) {
            setFocused(false);
            onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
        }
    };
    (0, react_1.useEffect)(() => {
        if (ref.current) {
            ref.current.addEventListener('focusin', handleFocusIn);
            ref.current.addEventListener('focusout', handleFocusOut);
            return () => {
                var _a, _b;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('focusin', handleFocusIn);
                (_b = ref.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('focusout', handleFocusOut);
            };
        }
        return undefined;
    }, [handleFocusIn, handleFocusOut]);
    return { ref: ref, focused };
}
exports.useFocusWithin = useFocusWithin;
