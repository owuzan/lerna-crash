"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHover = void 0;
const react_1 = require("react");
function useHover() {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const onMouseEnter = (0, react_1.useCallback)(() => setHovered(true), []);
    const onMouseLeave = (0, react_1.useCallback)(() => setHovered(false), []);
    (0, react_1.useEffect)(() => {
        if (ref.current) {
            ref.current.addEventListener('mouseenter', onMouseEnter);
            ref.current.addEventListener('mouseleave', onMouseLeave);
            return () => {
                var _a, _b;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseenter', onMouseEnter);
                (_b = ref.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('mouseleave', onMouseLeave);
            };
        }
        return undefined;
    }, []);
    return { ref, hovered };
}
exports.useHover = useHover;
