"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTextSelection = void 0;
const react_1 = require("react");
const use_force_update_1 = require("../use-force-update/use-force-update");
function useTextSelection() {
    const forceUpdate = (0, use_force_update_1.useForceUpdate)();
    const [selection, setSelection] = (0, react_1.useState)(null);
    const handleSelectionChange = () => {
        setSelection(document.getSelection());
        forceUpdate();
    };
    (0, react_1.useEffect)(() => {
        setSelection(document.getSelection());
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);
    return selection;
}
exports.useTextSelection = useTextSelection;
