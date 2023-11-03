"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePageLeave = void 0;
const react_1 = require("react");
function usePageLeave(onPageLeave) {
    (0, react_1.useEffect)(() => {
        document.documentElement.addEventListener('mouseleave', onPageLeave);
        return () => document.documentElement.removeEventListener('mouseleave', onPageLeave);
    }, []);
}
exports.usePageLeave = usePageLeave;
