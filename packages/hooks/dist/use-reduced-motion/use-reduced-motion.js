"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = void 0;
const use_media_query_1 = require("../use-media-query/use-media-query");
function useReducedMotion(initialValue, options) {
    return (0, use_media_query_1.useMediaQuery)('(prefers-reduced-motion: reduce)', initialValue, options);
}
exports.useReducedMotion = useReducedMotion;
