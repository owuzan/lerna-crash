"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusTrap = void 0;
const react_1 = require("react");
const tabbable_1 = require("./tabbable");
const scope_tab_1 = require("./scope-tab");
const create_aria_hider_1 = require("./create-aria-hider");
function useFocusTrap(active = true) {
    const ref = (0, react_1.useRef)();
    const restoreAria = (0, react_1.useRef)(null);
    const focusNode = (node) => {
        let focusElement = node.querySelector('[data-autofocus]');
        if (!focusElement) {
            const children = Array.from(node.querySelectorAll(tabbable_1.FOCUS_SELECTOR));
            focusElement = children.find(tabbable_1.tabbable) || children.find(tabbable_1.focusable) || null;
            if (!focusElement && (0, tabbable_1.focusable)(node))
                focusElement = node;
        }
        if (focusElement) {
            focusElement.focus({ preventScroll: true });
        }
        else if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node', node);
        }
    };
    const setRef = (0, react_1.useCallback)((node) => {
        if (!active) {
            return;
        }
        if (node === null) {
            if (restoreAria.current) {
                restoreAria.current();
                restoreAria.current = null;
            }
            return;
        }
        restoreAria.current = (0, create_aria_hider_1.createAriaHider)(node);
        if (ref.current === node) {
            return;
        }
        if (node) {
            // Delay processing the HTML node by a frame. This ensures focus is assigned correctly.
            setTimeout(() => {
                if (node.getRootNode()) {
                    focusNode(node);
                }
                else if (process.env.NODE_ENV === 'development') {
                    // eslint-disable-next-line no-console
                    console.warn('[@mantine/hooks/use-focus-trap] Ref node is not part of the dom', node);
                }
            });
            ref.current = node;
        }
        else {
            ref.current = null;
        }
    }, [active]);
    (0, react_1.useEffect)(() => {
        if (!active) {
            return undefined;
        }
        ref.current && setTimeout(() => focusNode(ref.current));
        const handleKeyDown = (event) => {
            if (event.key === 'Tab' && ref.current) {
                (0, scope_tab_1.scopeTab)(ref.current, event);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (restoreAria.current) {
                restoreAria.current();
            }
        };
    }, [active]);
    return setRef;
}
exports.useFocusTrap = useFocusTrap;
