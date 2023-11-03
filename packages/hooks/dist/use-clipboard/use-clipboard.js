"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClipboard = void 0;
const react_1 = require("react");
function useClipboard({ timeout = 2000 } = {}) {
    const [error, setError] = (0, react_1.useState)(null);
    const [copied, setCopied] = (0, react_1.useState)(false);
    const [copyTimeout, setCopyTimeout] = (0, react_1.useState)(null);
    const handleCopyResult = (value) => {
        window.clearTimeout(copyTimeout);
        setCopyTimeout(window.setTimeout(() => setCopied(false), timeout));
        setCopied(value);
    };
    const copy = (valueToCopy) => {
        if ('clipboard' in navigator) {
            navigator.clipboard
                .writeText(valueToCopy)
                .then(() => handleCopyResult(true))
                .catch((err) => setError(err));
        }
        else {
            setError(new Error('useClipboard: navigator.clipboard is not supported'));
        }
    };
    const reset = () => {
        setCopied(false);
        setError(null);
        window.clearTimeout(copyTimeout);
    };
    return { copy, reset, error, copied };
}
exports.useClipboard = useClipboard;
