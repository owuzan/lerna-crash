"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogger = void 0;
/* eslint-disable no-console */
const react_1 = require("react");
const use_did_update_1 = require("../use-did-update/use-did-update");
function useLogger(componentName, props) {
    (0, react_1.useEffect)(() => {
        console.log(`${componentName} mounted`, ...props);
        return () => console.log(`${componentName} unmounted`);
    }, []);
    (0, use_did_update_1.useDidUpdate)(() => {
        console.log(`${componentName} updated`, ...props);
    }, props);
    return null;
}
exports.useLogger = useLogger;
