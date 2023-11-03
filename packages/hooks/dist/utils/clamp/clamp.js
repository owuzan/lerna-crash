"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
function clamp(value, min, max) {
    if (min === undefined && max === undefined) {
        return value;
    }
    if (min !== undefined && max === undefined) {
        return Math.max(value, min);
    }
    if (min === undefined && max !== undefined) {
        return Math.min(value, max);
    }
    return Math.min(Math.max(value, min), max);
}
exports.clamp = clamp;
