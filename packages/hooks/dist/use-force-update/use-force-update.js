"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForceUpdate = void 0;
const react_1 = require("react");
const reducer = (value) => (value + 1) % 1000000;
function useForceUpdate() {
    const [, update] = (0, react_1.useReducer)(reducer, 0);
    return update;
}
exports.useForceUpdate = useForceUpdate;
