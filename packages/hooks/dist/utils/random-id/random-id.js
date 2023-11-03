"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomId = void 0;
function randomId() {
    return `piksel-ui-${Math.random().toString(36).slice(2, 11)}`;
}
exports.randomId = randomId;
