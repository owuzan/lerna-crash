"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHotkeys = exports.getHotkeyHandler = void 0;
const react_1 = require("react");
const parse_hotkey_1 = require("./parse-hotkey");
Object.defineProperty(exports, "getHotkeyHandler", { enumerable: true, get: function () { return parse_hotkey_1.getHotkeyHandler; } });
function shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable = false) {
    if (event.target instanceof HTMLElement) {
        if (triggerOnContentEditable) {
            return !tagsToIgnore.includes(event.target.tagName);
        }
        return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
    }
    return true;
}
function useHotkeys(hotkeys, tagsToIgnore = ['INPUT', 'TEXTAREA', 'SELECT'], triggerOnContentEditable = false) {
    (0, react_1.useEffect)(() => {
        const keydownListener = (event) => {
            hotkeys.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
                if ((0, parse_hotkey_1.getHotkeyMatcher)(hotkey)(event) &&
                    shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)) {
                    if (options.preventDefault) {
                        event.preventDefault();
                    }
                    handler(event);
                }
            });
        };
        document.documentElement.addEventListener('keydown', keydownListener);
        return () => document.documentElement.removeEventListener('keydown', keydownListener);
    }, [hotkeys]);
}
exports.useHotkeys = useHotkeys;
