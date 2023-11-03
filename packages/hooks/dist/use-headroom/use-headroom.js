"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHeadroom = exports.isReleased = exports.isPinned = exports.isFixed = void 0;
const react_1 = require("react");
const use_window_scroll_1 = require("../use-window-scroll/use-window-scroll");
const use_isomorphic_effect_1 = require("../use-isomorphic-effect/use-isomorphic-effect");
const isFixed = (current, fixedAt) => current <= fixedAt;
exports.isFixed = isFixed;
const isPinned = (current, previous) => current <= previous;
exports.isPinned = isPinned;
const isReleased = (current, previous, fixedAt) => !(0, exports.isPinned)(current, previous) && !(0, exports.isFixed)(current, fixedAt);
exports.isReleased = isReleased;
function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease } = {}) {
    const scrollRef = (0, react_1.useRef)(0);
    const [{ y: scrollPosition }] = (0, use_window_scroll_1.useWindowScroll)();
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        if ((0, exports.isPinned)(scrollPosition, scrollRef.current)) {
            onPin === null || onPin === void 0 ? void 0 : onPin();
        }
    }, [scrollPosition, onPin]);
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        if ((0, exports.isFixed)(scrollPosition, fixedAt)) {
            onFix === null || onFix === void 0 ? void 0 : onFix();
        }
    }, [scrollPosition, fixedAt, onFix]);
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        if ((0, exports.isReleased)(scrollPosition, scrollRef.current, fixedAt)) {
            onRelease === null || onRelease === void 0 ? void 0 : onRelease();
        }
    }, [scrollPosition, onRelease]);
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        scrollRef.current = window.scrollY;
    }, [scrollPosition]);
    if ((0, exports.isPinned)(scrollPosition, scrollRef.current)) {
        return true;
    }
    if ((0, exports.isFixed)(scrollPosition, fixedAt)) {
        return true;
    }
    return false;
}
exports.useHeadroom = useHeadroom;
