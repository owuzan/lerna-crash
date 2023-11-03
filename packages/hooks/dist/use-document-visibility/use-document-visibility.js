"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentVisibility = void 0;
const react_1 = require("react");
function useDocumentVisibility() {
    const [documentVisibility, setDocumentVisibility] = (0, react_1.useState)('visible');
    (0, react_1.useEffect)(() => {
        const listener = () => setDocumentVisibility(document.visibilityState);
        document.addEventListener('visibilitychange', listener);
        return () => document.removeEventListener('visibilitychange', listener);
    }, []);
    return documentVisibility;
}
exports.useDocumentVisibility = useDocumentVisibility;
