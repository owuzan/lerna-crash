"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowScroll = void 0;
const react_1 = require("react");
const use_window_event_1 = require("../use-window-event/use-window-event");
function getScrollPosition() {
    return typeof window !== 'undefined'
        ? { x: window.pageXOffset, y: window.pageYOffset }
        : { x: 0, y: 0 };
}
function scrollTo({ x, y }) {
    if (typeof window !== 'undefined') {
        const scrollOptions = { behavior: 'smooth' };
        if (typeof x === 'number') {
            scrollOptions.left = x;
        }
        if (typeof y === 'number') {
            scrollOptions.top = y;
        }
        window.scrollTo(scrollOptions);
    }
}
function useWindowScroll() {
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    (0, use_window_event_1.useWindowEvent)('scroll', () => setPosition(getScrollPosition()));
    (0, use_window_event_1.useWindowEvent)('resize', () => setPosition(getScrollPosition()));
    (0, react_1.useEffect)(() => {
        setPosition(getScrollPosition());
    }, []);
    return [position, scrollTo];
}
exports.useWindowScroll = useWindowScroll;
