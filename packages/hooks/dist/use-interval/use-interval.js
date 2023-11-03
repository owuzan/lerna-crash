"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterval = void 0;
const react_1 = require("react");
function useInterval(fn, interval) {
    const [active, setActive] = (0, react_1.useState)(false);
    const intervalRef = (0, react_1.useRef)();
    const fnRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        fnRef.current = fn;
    }, [fn]);
    const start = () => {
        setActive((old) => {
            if (!old && !intervalRef.current) {
                intervalRef.current = window.setInterval(fnRef.current, interval);
            }
            return true;
        });
    };
    const stop = () => {
        setActive(false);
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    };
    const toggle = () => {
        if (active) {
            stop();
        }
        else {
            start();
        }
    };
    return { start, stop, toggle, active };
}
exports.useInterval = useInterval;
