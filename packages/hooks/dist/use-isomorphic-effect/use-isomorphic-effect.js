"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsomorphicEffect = void 0;
const react_1 = require("react");
// useLayoutEffect will show warning if used during ssr, e.g. with Next.js
// useIsomorphicEffect removes it by replacing useLayoutEffect with useEffect during ssr
exports.useIsomorphicEffect = typeof document !== 'undefined' ? react_1.useLayoutEffect : react_1.useEffect;
