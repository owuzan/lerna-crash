"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToggle = void 0;
const react_1 = require("react");
function useToggle(options = [false, true]) {
    const [[option], toggle] = (0, react_1.useReducer)((state, action) => {
        const value = action instanceof Function ? action(state[0]) : action;
        const index = Math.abs(state.indexOf(value));
        return state.slice(index).concat(state.slice(0, index));
    }, options);
    return [option, toggle];
}
exports.useToggle = useToggle;
