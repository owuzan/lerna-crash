"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentTitle = void 0;
const use_isomorphic_effect_1 = require("../use-isomorphic-effect/use-isomorphic-effect");
function useDocumentTitle(title) {
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        if (typeof title === 'string' && title.trim().length > 0) {
            document.title = title.trim();
        }
    }, [title]);
}
exports.useDocumentTitle = useDocumentTitle;
