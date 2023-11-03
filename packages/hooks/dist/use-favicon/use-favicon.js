"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFavicon = void 0;
const react_1 = require("react");
const use_isomorphic_effect_1 = require("../use-isomorphic-effect/use-isomorphic-effect");
const MIME_TYPES = {
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
    gif: 'image/gif',
};
function useFavicon(url) {
    const link = (0, react_1.useRef)();
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        if (!url) {
            return;
        }
        if (!link.current) {
            const existingElements = document.querySelectorAll('link[rel*="icon"]');
            existingElements.forEach((element) => document.head.removeChild(element));
            const element = document.createElement('link');
            element.rel = 'shortcut icon';
            link.current = element;
            document.querySelector('head').appendChild(element);
        }
        const splittedUrl = url.split('.');
        link.current.setAttribute('type', 
        // @ts-ignore
        MIME_TYPES[splittedUrl[splittedUrl.length - 1].toLowerCase()]);
        link.current.setAttribute('href', url);
    }, [url]);
}
exports.useFavicon = useFavicon;
