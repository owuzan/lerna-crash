"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
const react_1 = require("react");
function useEventListener(type, listener, options) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        if (ref.current) {
            ref.current.addEventListener(type, listener, options);
            return () => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener(type, listener, options); };
        }
        return undefined;
    }, [listener, options]);
    return ref;
}
exports.useEventListener = useEventListener;
