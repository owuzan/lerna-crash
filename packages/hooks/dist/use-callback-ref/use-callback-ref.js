"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCallbackRef = void 0;
const react_1 = require("react");
function useCallbackRef(callback) {
    const callbackRef = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(() => {
        callbackRef.current = callback;
    });
    return (0, react_1.useMemo)(() => ((...args) => { var _a; return (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, ...args); }), []);
}
exports.useCallbackRef = useCallbackRef;
