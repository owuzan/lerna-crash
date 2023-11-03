"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusReturn = void 0;
const react_1 = require("react");
const use_did_update_1 = require("../use-did-update/use-did-update");
/** Returns focus to last active element, used in Modal and Drawer */
function useFocusReturn({ opened, shouldReturnFocus = true }) {
    const lastActiveElement = (0, react_1.useRef)();
    const returnFocus = () => {
        var _a;
        if (lastActiveElement.current &&
            'focus' in lastActiveElement.current &&
            typeof lastActiveElement.current.focus === 'function') {
            (_a = lastActiveElement.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
        }
    };
    (0, use_did_update_1.useDidUpdate)(() => {
        let timeout = -1;
        const clearFocusTimeout = (event) => {
            if (event.key === 'Tab') {
                window.clearTimeout(timeout);
            }
        };
        document.addEventListener('keydown', clearFocusTimeout);
        if (opened) {
            lastActiveElement.current = document.activeElement;
        }
        else if (shouldReturnFocus) {
            timeout = window.setTimeout(returnFocus, 10);
        }
        return () => {
            window.clearTimeout(timeout);
            document.removeEventListener('keydown', clearFocusTimeout);
        };
    }, [opened, shouldReturnFocus]);
    return returnFocus;
}
exports.useFocusReturn = useFocusReturn;
