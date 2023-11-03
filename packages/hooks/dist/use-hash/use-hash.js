"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHash = void 0;
const react_1 = require("react");
const use_window_event_1 = require("../use-window-event/use-window-event");
function useHash() {
    const [hash, setHashValue] = (0, react_1.useState)('');
    const setHash = (value) => {
        const valueWithHash = value.startsWith('#') ? value : `#${value}`;
        window.location.hash = valueWithHash;
        setHashValue(valueWithHash);
    };
    (0, use_window_event_1.useWindowEvent)('hashchange', () => {
        const newHash = window.location.hash;
        if (hash !== newHash) {
            setHashValue(hash);
        }
    });
    (0, react_1.useEffect)(() => {
        setHashValue(window.location.hash);
    }, []);
    return [hash, setHash];
}
exports.useHash = useHash;
