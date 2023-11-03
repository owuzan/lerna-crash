"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = void 0;
const react_1 = require("react");
const DEFAULT_EVENTS = ['mousedown', 'touchstart'];
function useClickOutside(handler, events, nodes) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            const { target } = event !== null && event !== void 0 ? event : {};
            if (Array.isArray(nodes)) {
                const shouldIgnore = (target === null || target === void 0 ? void 0 : target.hasAttribute('data-ignore-outside-clicks')) ||
                    (!document.body.contains(target) && target.tagName !== 'HTML');
                const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
                shouldTrigger && !shouldIgnore && handler();
            }
            else if (ref.current && !ref.current.contains(target)) {
                handler();
            }
        };
        (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));
        return () => {
            (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
        };
    }, [ref, handler, nodes]);
    return ref;
}
exports.useClickOutside = useClickOutside;
