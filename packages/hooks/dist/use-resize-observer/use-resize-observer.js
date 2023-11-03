"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementSize = exports.useResizeObserver = void 0;
const react_1 = require("react");
const defaultState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};
function useResizeObserver() {
    const frameID = (0, react_1.useRef)(0);
    const ref = (0, react_1.useRef)(null);
    const [rect, setRect] = (0, react_1.useState)(defaultState);
    const observer = (0, react_1.useMemo)(() => typeof window !== 'undefined'
        ? new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                cancelAnimationFrame(frameID.current);
                frameID.current = requestAnimationFrame(() => {
                    if (ref.current) {
                        setRect(entry.contentRect);
                    }
                });
            }
        })
        : null, []);
    (0, react_1.useEffect)(() => {
        if (ref.current) {
            observer === null || observer === void 0 ? void 0 : observer.observe(ref.current);
        }
        return () => {
            observer === null || observer === void 0 ? void 0 : observer.disconnect();
            if (frameID.current) {
                cancelAnimationFrame(frameID.current);
            }
        };
    }, [ref.current]);
    return [ref, rect];
}
exports.useResizeObserver = useResizeObserver;
function useElementSize() {
    const [ref, { width, height }] = useResizeObserver();
    return { ref, width, height };
}
exports.useElementSize = useElementSize;
