"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMergedRef = exports.mergeRefs = exports.assignRef = void 0;
/* eslint-disable no-param-reassign */
const react_1 = require("react");
function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        ref.current = value;
    }
}
exports.assignRef = assignRef;
function mergeRefs(...refs) {
    return (node) => {
        refs.forEach((ref) => assignRef(ref, node));
    };
}
exports.mergeRefs = mergeRefs;
function useMergedRef(...refs) {
    return (0, react_1.useCallback)(mergeRefs(...refs), refs);
}
exports.useMergedRef = useMergedRef;
