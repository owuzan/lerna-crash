"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntersection = void 0;
const react_1 = require("react");
function useIntersection(options) {
    const [entry, setEntry] = (0, react_1.useState)(null);
    const observer = (0, react_1.useRef)(null);
    const ref = (0, react_1.useCallback)((element) => {
        if (observer.current) {
            observer.current.disconnect();
            observer.current = null;
        }
        if (element === null) {
            setEntry(null);
            return;
        }
        observer.current = new IntersectionObserver(([_entry]) => {
            setEntry(_entry);
        }, options);
        observer.current.observe(element);
    }, [options === null || options === void 0 ? void 0 : options.rootMargin, options === null || options === void 0 ? void 0 : options.root, options === null || options === void 0 ? void 0 : options.threshold]);
    return { ref, entry };
}
exports.useIntersection = useIntersection;
