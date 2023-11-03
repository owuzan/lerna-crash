"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDidUpdate = void 0;
const react_1 = require("react");
function useDidUpdate(fn, dependencies) {
    const mounted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => () => {
        mounted.current = false;
    }, []);
    (0, react_1.useEffect)(() => {
        if (mounted.current) {
            return fn();
        }
        mounted.current = true;
        return undefined;
    }, dependencies);
}
exports.useDidUpdate = useDidUpdate;
