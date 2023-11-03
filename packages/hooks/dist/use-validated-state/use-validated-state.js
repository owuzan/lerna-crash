"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidatedState = void 0;
const react_1 = require("react");
function useValidatedState(initialValue, validation, initialValidationState) {
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const [lastValidValue, setLastValidValue] = (0, react_1.useState)(validation(initialValue) ? initialValue : undefined);
    const [valid, setValid] = (0, react_1.useState)(typeof initialValidationState === 'boolean' ? initialValidationState : validation(initialValue));
    const onChange = (val) => {
        if (validation(val)) {
            setLastValidValue(val);
            setValid(true);
        }
        else {
            setValid(false);
        }
        setValue(val);
    };
    return [{ value, lastValidValue, valid }, onChange];
}
exports.useValidatedState = useValidatedState;
