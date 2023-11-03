"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeTab = void 0;
const tabbable_1 = require("./tabbable");
function scopeTab(node, event) {
    const tabbable = (0, tabbable_1.findTabbableDescendants)(node);
    if (!tabbable.length) {
        event.preventDefault();
        return;
    }
    const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
    const root = node.getRootNode();
    let leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;
    const activeElement = root.activeElement;
    const activeElementIsRadio = activeElement.tagName === 'INPUT' && activeElement.getAttribute('type') === 'radio';
    if (activeElementIsRadio) {
        const activeRadioGroup = tabbable.filter((element) => element.getAttribute('type') === 'radio' &&
            element.getAttribute('name') === activeElement.getAttribute('name'));
        leavingFinalTabbable = activeRadioGroup.includes(finalTabbable);
    }
    if (!leavingFinalTabbable) {
        return;
    }
    event.preventDefault();
    const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
    if (target) {
        target.focus();
    }
}
exports.scopeTab = scopeTab;
