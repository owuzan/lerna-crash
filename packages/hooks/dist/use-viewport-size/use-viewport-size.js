"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewportSize = void 0;
const react_1 = require("react");
const use_window_event_1 = require("../use-window-event/use-window-event");
const eventListerOptions = {
    passive: true,
};
function useViewportSize() {
    const [windowSize, setWindowSize] = (0, react_1.useState)({
        width: 0,
        height: 0,
    });
    const setSize = (0, react_1.useCallback)(() => {
        setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
    }, []);
    (0, use_window_event_1.useWindowEvent)('resize', setSize, eventListerOptions);
    (0, use_window_event_1.useWindowEvent)('orientationchange', setSize, eventListerOptions);
    (0, react_1.useEffect)(setSize, []);
    return windowSize;
}
exports.useViewportSize = useViewportSize;
