"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEyeDropper = void 0;
const react_1 = require("react");
const use_isomorphic_effect_1 = require("../use-isomorphic-effect/use-isomorphic-effect");
function useEyeDropper() {
    const [supported, setSupported] = (0, react_1.useState)(false);
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        setSupported(typeof window !== 'undefined' && 'EyeDropper' in window);
    }, []);
    const open = (0, react_1.useCallback)((options = {}) => {
        if (supported) {
            const eyeDropper = new window.EyeDropper();
            return eyeDropper.open(options);
        }
        return Promise.resolve(undefined);
    }, [supported]);
    return { supported, open };
}
exports.useEyeDropper = useEyeDropper;
