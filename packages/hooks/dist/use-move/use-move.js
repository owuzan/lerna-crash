"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMove = exports.clampUseMovePosition = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
const react_1 = require("react");
const utils_1 = require("../utils");
const clampUseMovePosition = (position) => ({
    x: (0, utils_1.clamp)(position.x, 0, 1),
    y: (0, utils_1.clamp)(position.y, 0, 1),
});
exports.clampUseMovePosition = clampUseMovePosition;
function useMove(onChange, handlers, dir = 'ltr') {
    const ref = (0, react_1.useRef)(null);
    const mounted = (0, react_1.useRef)(false);
    const isSliding = (0, react_1.useRef)(false);
    const frame = (0, react_1.useRef)(0);
    const [active, setActive] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        mounted.current = true;
    }, []);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        const onScrub = ({ x, y }) => {
            cancelAnimationFrame(frame.current);
            frame.current = requestAnimationFrame(() => {
                if (mounted.current && ref.current) {
                    ref.current.style.userSelect = 'none';
                    const rect = ref.current.getBoundingClientRect();
                    if (rect.width && rect.height) {
                        const _x = (0, utils_1.clamp)((x - rect.left) / rect.width, 0, 1);
                        onChange({
                            x: dir === 'ltr' ? _x : 1 - _x,
                            y: (0, utils_1.clamp)((y - rect.top) / rect.height, 0, 1),
                        });
                    }
                }
            });
        };
        const bindEvents = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', stopScrubbing);
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', stopScrubbing);
        };
        const unbindEvents = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', stopScrubbing);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', stopScrubbing);
        };
        const startScrubbing = () => {
            if (!isSliding.current && mounted.current) {
                isSliding.current = true;
                typeof (handlers === null || handlers === void 0 ? void 0 : handlers.onScrubStart) === 'function' && handlers.onScrubStart();
                setActive(true);
                bindEvents();
            }
        };
        const stopScrubbing = () => {
            if (isSliding.current && mounted.current) {
                isSliding.current = false;
                setActive(false);
                unbindEvents();
                setTimeout(() => {
                    typeof (handlers === null || handlers === void 0 ? void 0 : handlers.onScrubEnd) === 'function' && handlers.onScrubEnd();
                }, 0);
            }
        };
        const onMouseDown = (event) => {
            startScrubbing();
            event.preventDefault();
            onMouseMove(event);
        };
        const onMouseMove = (event) => onScrub({ x: event.clientX, y: event.clientY });
        const onTouchStart = (event) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            startScrubbing();
            onTouchMove(event);
        };
        const onTouchMove = (event) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            onScrub({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
        };
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.addEventListener('mousedown', onMouseDown);
        (_b = ref.current) === null || _b === void 0 ? void 0 : _b.addEventListener('touchstart', onTouchStart, { passive: false });
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousedown', onMouseDown);
                ref.current.removeEventListener('touchstart', onTouchStart);
            }
        };
    }, [dir, onChange]);
    return { ref, active };
}
exports.useMove = useMove;
