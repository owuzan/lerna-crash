"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShallowEffect = void 0;
const react_1 = require("react");
const shallow_equal_1 = require("../utils/shallow-equal/shallow-equal");
function shallowCompare(prevValue, currValue) {
    if (!prevValue || !currValue) {
        return false;
    }
    if (prevValue === currValue) {
        return true;
    }
    if (prevValue.length !== currValue.length) {
        return false;
    }
    for (let i = 0; i < prevValue.length; i += 1) {
        if (!(0, shallow_equal_1.shallowEqual)(prevValue[i], currValue[i])) {
            return false;
        }
    }
    return true;
}
function useShallowCompare(dependencies) {
    const ref = (0, react_1.useRef)([]);
    const updateRef = (0, react_1.useRef)(0);
    if (!shallowCompare(ref.current, dependencies)) {
        ref.current = dependencies;
        updateRef.current += 1;
    }
    return [updateRef.current];
}
function useShallowEffect(cb, dependencies) {
    (0, react_1.useEffect)(cb, useShallowCompare(dependencies));
}
exports.useShallowEffect = useShallowEffect;
