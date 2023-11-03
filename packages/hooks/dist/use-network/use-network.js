"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNetwork = void 0;
const react_1 = require("react");
const use_window_event_1 = require("../use-window-event/use-window-event");
function getConnection() {
    if (typeof navigator === 'undefined') {
        return {};
    }
    const _navigator = navigator;
    const connection = _navigator.connection || _navigator.mozConnection || _navigator.webkitConnection;
    if (!connection) {
        return {};
    }
    return {
        downlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
        downlinkMax: connection === null || connection === void 0 ? void 0 : connection.downlinkMax,
        effectiveType: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
        rtt: connection === null || connection === void 0 ? void 0 : connection.rtt,
        saveData: connection === null || connection === void 0 ? void 0 : connection.saveData,
        type: connection === null || connection === void 0 ? void 0 : connection.type,
    };
}
function useNetwork() {
    const [status, setStatus] = (0, react_1.useState)({
        online: true,
    });
    const handleConnectionChange = (0, react_1.useCallback)(() => setStatus((current) => (Object.assign(Object.assign({}, current), getConnection()))), []);
    (0, use_window_event_1.useWindowEvent)('online', () => setStatus(Object.assign({ online: true }, getConnection())));
    (0, use_window_event_1.useWindowEvent)('offline', () => setStatus(Object.assign({ online: false }, getConnection())));
    (0, react_1.useEffect)(() => {
        const _navigator = navigator;
        if (_navigator.connection) {
            setStatus(Object.assign({ online: _navigator.onLine }, getConnection()));
            _navigator.connection.addEventListener('change', handleConnectionChange);
            return () => _navigator.connection.removeEventListener('change', handleConnectionChange);
        }
        return undefined;
    }, []);
    return status;
}
exports.useNetwork = useNetwork;
