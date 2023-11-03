"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIdle = void 0;
const react_1 = require("react");
const DEFAULT_EVENTS = [
    'keypress',
    'mousemove',
    'touchmove',
    'click',
    'scroll',
];
const DEFAULT_OPTIONS = {
    events: DEFAULT_EVENTS,
    initialState: true,
};
function useIdle(timeout, options) {
    const { events, initialState } = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    const [idle, setIdle] = (0, react_1.useState)(initialState);
    const timer = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        const handleEvents = () => {
            setIdle(false);
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
            timer.current = window.setTimeout(() => {
                setIdle(true);
            }, timeout);
        };
        events.forEach((event) => document.addEventListener(event, handleEvents));
        return () => {
            events.forEach((event) => document.removeEventListener(event, handleEvents));
        };
    }, [timeout]);
    return idle;
}
exports.useIdle = useIdle;
