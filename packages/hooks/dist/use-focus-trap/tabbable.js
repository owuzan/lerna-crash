"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTabbableDescendants = exports.tabbable = exports.focusable = exports.FOCUS_SELECTOR = void 0;
const TABBABLE_NODES = /input|select|textarea|button|object/;
exports.FOCUS_SELECTOR = 'a, input, select, textarea, button, object, [tabindex]';
function hidden(element) {
    if (process.env.NODE_ENV === 'test') {
        return false;
    }
    return element.style.display === 'none';
}
function visible(element) {
    const isHidden = element.getAttribute('aria-hidden') ||
        element.getAttribute('hidden') ||
        element.getAttribute('type') === 'hidden';
    if (isHidden) {
        return false;
    }
    let parentElement = element;
    while (parentElement) {
        if (parentElement === document.body || parentElement.nodeType === 11) {
            break;
        }
        if (hidden(parentElement)) {
            return false;
        }
        parentElement = parentElement.parentNode;
    }
    return true;
}
function getElementTabIndex(element) {
    let tabIndex = element.getAttribute('tabindex');
    if (tabIndex === null) {
        tabIndex = undefined;
    }
    return parseInt(tabIndex, 10);
}
function focusable(element) {
    const nodeName = element.nodeName.toLowerCase();
    const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
    const res = 
    // @ts-ignore
    (TABBABLE_NODES.test(nodeName) && !element.disabled) ||
        (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
    return res && visible(element);
}
exports.focusable = focusable;
function tabbable(element) {
    const tabIndex = getElementTabIndex(element);
    const isTabIndexNaN = Number.isNaN(tabIndex);
    return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}
exports.tabbable = tabbable;
function findTabbableDescendants(element) {
    return Array.from(element.querySelectorAll(exports.FOCUS_SELECTOR)).filter(tabbable);
}
exports.findTabbableDescendants = findTabbableDescendants;
