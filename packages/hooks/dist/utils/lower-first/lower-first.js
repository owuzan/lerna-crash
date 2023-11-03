"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerFirst = void 0;
function lowerFirst(value) {
    return typeof value !== 'string' ? '' : value.charAt(0).toLowerCase() + value.slice(1);
}
exports.lowerFirst = lowerFirst;
