"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUncontrolled = void 0;
const react_1 = require("react");
function useUncontrolled({ value, defaultValue, finalValue, onChange = () => { }, }) {
    const [uncontrolledValue, setUncontrolledValue] = (0, react_1.useState)(defaultValue !== undefined ? defaultValue : finalValue);
    const handleUncontrolledChange = (val) => {
        setUncontrolledValue(val);
        onChange === null || onChange === void 0 ? void 0 : onChange(val);
    };
    if (value !== undefined) {
        return [value, onChange, true];
    }
    return [uncontrolledValue, handleUncontrolledChange, false];
}
exports.useUncontrolled = useUncontrolled;
