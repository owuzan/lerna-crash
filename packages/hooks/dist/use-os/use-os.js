"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOs = void 0;
const react_1 = require("react");
const use_isomorphic_effect_1 = require("../use-isomorphic-effect/use-isomorphic-effect");
function getOS() {
    if (typeof window === 'undefined') {
        return 'undetermined';
    }
    const { userAgent } = window.navigator;
    const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
    const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
    const iosPlatforms = /(iPhone)|(iPad)|(iPod)/i;
    if (macosPlatforms.test(userAgent)) {
        return 'macos';
    }
    if (iosPlatforms.test(userAgent)) {
        return 'ios';
    }
    if (windowsPlatforms.test(userAgent)) {
        return 'windows';
    }
    if (/Android/i.test(userAgent)) {
        return 'android';
    }
    if (/Linux/i.test(userAgent)) {
        return 'linux';
    }
    return 'undetermined';
}
function useOs(options = { getValueInEffect: true }) {
    const [value, setValue] = (0, react_1.useState)(options.getValueInEffect ? 'undetermined' : getOS());
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        if (options.getValueInEffect) {
            setValue(getOS);
        }
    }, []);
    return value;
}
exports.useOs = useOs;
