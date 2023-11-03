"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotkeyHandler = exports.getHotkeyMatcher = exports.parseHotkey = void 0;
function parseHotkey(hotkey) {
    const keys = hotkey
        .toLowerCase()
        .split('+')
        .map((part) => part.trim());
    const modifiers = {
        alt: keys.includes('alt'),
        ctrl: keys.includes('ctrl'),
        meta: keys.includes('meta'),
        mod: keys.includes('mod'),
        shift: keys.includes('shift'),
    };
    const reservedKeys = ['alt', 'ctrl', 'meta', 'shift', 'mod'];
    const freeKey = keys.find((key) => !reservedKeys.includes(key));
    return Object.assign(Object.assign({}, modifiers), { key: freeKey });
}
exports.parseHotkey = parseHotkey;
function isExactHotkey(hotkey, event) {
    const { alt, ctrl, meta, mod, shift, key } = hotkey;
    const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey } = event;
    if (alt !== altKey) {
        return false;
    }
    if (mod) {
        if (!ctrlKey && !metaKey) {
            return false;
        }
    }
    else {
        if (ctrl !== ctrlKey) {
            return false;
        }
        if (meta !== metaKey) {
            return false;
        }
    }
    if (shift !== shiftKey) {
        return false;
    }
    if (key &&
        (pressedKey.toLowerCase() === key.toLowerCase() ||
            event.code.replace('Key', '').toLowerCase() === key.toLowerCase())) {
        return true;
    }
    return false;
}
function getHotkeyMatcher(hotkey) {
    return (event) => isExactHotkey(parseHotkey(hotkey), event);
}
exports.getHotkeyMatcher = getHotkeyMatcher;
function getHotkeyHandler(hotkeys) {
    return (event) => {
        const _event = 'nativeEvent' in event ? event.nativeEvent : event;
        hotkeys.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
            if (getHotkeyMatcher(hotkey)(_event)) {
                if (options.preventDefault) {
                    event.preventDefault();
                }
                handler(_event);
            }
        });
    };
}
exports.getHotkeyHandler = getHotkeyHandler;
