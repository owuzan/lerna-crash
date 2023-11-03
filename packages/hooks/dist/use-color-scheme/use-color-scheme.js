"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColorScheme = void 0;
const use_media_query_1 = require("../use-media-query/use-media-query");
function useColorScheme(initialValue, options) {
    return (0, use_media_query_1.useMediaQuery)('(prefers-color-scheme: dark)', initialValue === 'dark', options)
        ? 'dark'
        : 'light';
}
exports.useColorScheme = useColorScheme;
