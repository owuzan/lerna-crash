"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easeInOutQuad = void 0;
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
exports.easeInOutQuad = easeInOutQuad;
