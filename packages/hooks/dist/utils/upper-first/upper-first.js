"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperFirst = void 0;
function upperFirst(value) {
    return typeof value !== 'string' ? '' : value.charAt(0).toUpperCase() + value.slice(1);
}
exports.upperFirst = upperFirst;
