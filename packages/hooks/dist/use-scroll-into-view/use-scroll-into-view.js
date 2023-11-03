"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollIntoView = void 0;
const react_1 = require("react");
const use_reduced_motion_1 = require("../use-reduced-motion/use-reduced-motion");
const use_window_event_1 = require("../use-window-event/use-window-event");
const ease_in_out_quad_1 = require("./utils/ease-in-out-quad");
const get_relative_position_1 = require("./utils/get-relative-position");
const get_scroll_start_1 = require("./utils/get-scroll-start");
const set_scroll_param_1 = require("./utils/set-scroll-param");
function useScrollIntoView({ duration = 1250, axis = 'y', onScrollFinish, easing = ease_in_out_quad_1.easeInOutQuad, offset = 0, cancelable = true, isList = false, } = {}) {
    const frameID = (0, react_1.useRef)(0);
    const startTime = (0, react_1.useRef)(0);
    const shouldStop = (0, react_1.useRef)(false);
    const scrollableRef = (0, react_1.useRef)(null);
    const targetRef = (0, react_1.useRef)(null);
    const reducedMotion = (0, use_reduced_motion_1.useReducedMotion)();
    const cancel = () => {
        if (frameID.current) {
            cancelAnimationFrame(frameID.current);
        }
    };
    const scrollIntoView = (0, react_1.useCallback)(({ alignment = 'start' } = {}) => {
        var _a;
        shouldStop.current = false;
        if (frameID.current) {
            cancel();
        }
        const start = (_a = (0, get_scroll_start_1.getScrollStart)({ parent: scrollableRef.current, axis })) !== null && _a !== void 0 ? _a : 0;
        const change = (0, get_relative_position_1.getRelativePosition)({
            parent: scrollableRef.current,
            target: targetRef.current,
            axis,
            alignment,
            offset,
            isList,
        }) - (scrollableRef.current ? 0 : start);
        function animateScroll() {
            if (startTime.current === 0) {
                startTime.current = performance.now();
            }
            const now = performance.now();
            const elapsed = now - startTime.current;
            // easing timing progress
            const t = reducedMotion || duration === 0 ? 1 : elapsed / duration;
            const distance = start + change * easing(t);
            (0, set_scroll_param_1.setScrollParam)({
                parent: scrollableRef.current,
                axis,
                distance,
            });
            if (!shouldStop.current && t < 1) {
                frameID.current = requestAnimationFrame(animateScroll);
            }
            else {
                typeof onScrollFinish === 'function' && onScrollFinish();
                startTime.current = 0;
                frameID.current = 0;
                cancel();
            }
        }
        animateScroll();
    }, [axis, duration, easing, isList, offset, onScrollFinish, reducedMotion]);
    const handleStop = () => {
        if (cancelable) {
            shouldStop.current = true;
        }
    };
    /**
     * detection of one of these events stops scroll animation
     * wheel - mouse wheel / touch pad
     * touchmove - any touchable device
     */
    (0, use_window_event_1.useWindowEvent)('wheel', handleStop, {
        passive: true,
    });
    (0, use_window_event_1.useWindowEvent)('touchmove', handleStop, {
        passive: true,
    });
    // cleanup requestAnimationFrame
    (0, react_1.useEffect)(() => cancel, []);
    return {
        scrollableRef,
        targetRef,
        scrollIntoView,
        cancel,
    };
}
exports.useScrollIntoView = useScrollIntoView;
