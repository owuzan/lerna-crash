"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInputState = exports.getInputOnChange = void 0;
const react_1 = require("react");
function getInputOnChange(setValue) {
    return (val) => {
        if (!val) {
            setValue(val);
        }
        else if (typeof val === 'function') {
            setValue(val);
        }
        else if (typeof val === 'object' && 'nativeEvent' in val) {
            const { currentTarget } = val;
            if (currentTarget.type === 'checkbox') {
                setValue(currentTarget.checked);
            }
            else {
                setValue(currentTarget.value);
            }
        }
        else {
            setValue(val);
        }
    };
}
exports.getInputOnChange = getInputOnChange;
function useInputState(initialState) {
    const [value, setValue] = (0, react_1.useState)(initialState);
    return [value, getInputOnChange(setValue)];
}
exports.useInputState = useInputState;
