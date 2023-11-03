"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCounter = void 0;
const react_1 = require("react");
const utils_1 = require("../utils");
const DEFAULT_OPTIONS = {
    min: -Infinity,
    max: Infinity,
};
function useCounter(initialValue = 0, options) {
    const { min, max } = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    const [count, setCount] = (0, react_1.useState)((0, utils_1.clamp)(initialValue, min, max));
    const increment = () => setCount((current) => (0, utils_1.clamp)(current + 1, min, max));
    const decrement = () => setCount((current) => (0, utils_1.clamp)(current - 1, min, max));
    const set = (value) => setCount((0, utils_1.clamp)(value, min, max));
    const reset = () => setCount((0, utils_1.clamp)(initialValue, min, max));
    return [count, { increment, decrement, set, reset }];
}
exports.useCounter = useCounter;
