"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMouse = void 0;
const react_1 = require("react");
function useMouse(options = { resetOnExit: false }) {
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const ref = (0, react_1.useRef)();
    const setMousePosition = (event) => {
        if (ref.current) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.round(event.pageX - rect.left - (window.pageXOffset || window.scrollX)));
            const y = Math.max(0, Math.round(event.pageY - rect.top - (window.pageYOffset || window.scrollY)));
            setPosition({ x, y });
        }
        else {
            setPosition({ x: event.clientX, y: event.clientY });
        }
    };
    const resetMousePosition = () => setPosition({ x: 0, y: 0 });
    (0, react_1.useEffect)(() => {
        const element = (ref === null || ref === void 0 ? void 0 : ref.current) ? ref.current : document;
        element.addEventListener('mousemove', setMousePosition);
        if (options.resetOnExit)
            element.addEventListener('mouseleave', resetMousePosition);
        return () => {
            element.removeEventListener('mousemove', setMousePosition);
            if (options.resetOnExit)
                element.removeEventListener('mouseleave', resetMousePosition);
        };
    }, [ref.current]);
    return Object.assign({ ref }, position);
}
exports.useMouse = useMouse;
