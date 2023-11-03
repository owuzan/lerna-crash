"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAriaHider = void 0;
const utils_1 = require("../utils");
function createAriaHider(containerNode, selector = 'body > :not(script)') {
    const id = (0, utils_1.randomId)();
    const rootNodes = Array.from(document.querySelectorAll(selector)).map((node) => {
        var _a;
        if (((_a = node === null || node === void 0 ? void 0 : node.shadowRoot) === null || _a === void 0 ? void 0 : _a.contains(containerNode)) || node.contains(containerNode)) {
            return undefined;
        }
        const ariaHidden = node.getAttribute('aria-hidden');
        const prevAriaHidden = node.getAttribute('data-hidden');
        const prevFocusId = node.getAttribute('data-focus-id');
        node.setAttribute('data-focus-id', id);
        if (ariaHidden === null || ariaHidden === 'false') {
            node.setAttribute('aria-hidden', 'true');
        }
        else if (!prevAriaHidden && !prevFocusId) {
            node.setAttribute('data-hidden', ariaHidden);
        }
        return {
            node,
            ariaHidden: prevAriaHidden || null,
        };
    });
    return () => {
        rootNodes.forEach((item) => {
            if (!item || id !== item.node.getAttribute('data-focus-id')) {
                return;
            }
            if (item.ariaHidden === null) {
                item.node.removeAttribute('aria-hidden');
            }
            else {
                item.node.setAttribute('aria-hidden', item.ariaHidden);
            }
            item.node.removeAttribute('data-focus-id');
            item.node.removeAttribute('data-hidden');
        });
    };
}
exports.createAriaHider = createAriaHider;
