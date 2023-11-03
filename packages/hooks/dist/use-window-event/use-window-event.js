"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowEvent = void 0;
const react_1 = require("react");
function useWindowEvent(type, listener, options) {
    (0, react_1.useEffect)(() => {
        window.addEventListener(type, listener, options);
        return () => window.removeEventListener(type, listener, options);
    }, [type, listener]);
}
exports.useWindowEvent = useWindowEvent;
