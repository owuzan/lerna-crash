"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFullscreen = void 0;
const react_1 = require("react");
function getFullscreenElement() {
    const _document = window.document;
    const fullscreenElement = _document.fullscreenElement ||
        _document.webkitFullscreenElement ||
        _document.mozFullScreenElement ||
        _document.msFullscreenElement;
    return fullscreenElement;
}
function exitFullscreen() {
    return __awaiter(this, void 0, void 0, function* () {
        const _document = window.document;
        if (typeof _document.exitFullscreen === 'function')
            return _document.exitFullscreen();
        if (typeof _document.msExitFullscreen === 'function')
            return _document.msExitFullscreen();
        if (typeof _document.webkitExitFullscreen === 'function')
            return _document.webkitExitFullscreen();
        if (typeof _document.mozCancelFullScreen === 'function')
            return _document.mozCancelFullScreen();
        return null;
    });
}
function enterFullScreen(element) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const _element = element;
        return (((_a = _element.requestFullscreen) === null || _a === void 0 ? void 0 : _a.call(_element)) ||
            ((_b = _element.msRequestFullscreen) === null || _b === void 0 ? void 0 : _b.call(_element)) ||
            ((_c = _element.webkitEnterFullscreen) === null || _c === void 0 ? void 0 : _c.call(_element)) ||
            ((_d = _element.webkitRequestFullscreen) === null || _d === void 0 ? void 0 : _d.call(_element)) ||
            ((_e = _element.mozRequestFullscreen) === null || _e === void 0 ? void 0 : _e.call(_element)));
    });
}
const prefixes = ['', 'webkit', 'moz', 'ms'];
function addEvents(element, { onFullScreen, onError, }) {
    prefixes.forEach((prefix) => {
        element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
        element.addEventListener(`${prefix}fullscreenerror`, onError);
    });
    return () => {
        prefixes.forEach((prefix) => {
            element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
            element.removeEventListener(`${prefix}fullscreenerror`, onError);
        });
    };
}
function useFullscreen() {
    const [fullscreen, setFullscreen] = (0, react_1.useState)(false);
    const _ref = (0, react_1.useRef)();
    const handleFullscreenChange = (0, react_1.useCallback)((event) => {
        setFullscreen(event.target === getFullscreenElement());
    }, [setFullscreen]);
    const handleFullscreenError = (0, react_1.useCallback)((event) => {
        setFullscreen(false);
        // eslint-disable-next-line no-console
        console.error(`[@mantine/hooks] use-fullscreen: Error attempting full-screen mode method: ${event} (${event.target})`);
    }, [setFullscreen]);
    const toggle = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        if (!getFullscreenElement()) {
            yield enterFullScreen(_ref.current);
        }
        else {
            yield exitFullscreen();
        }
    }), []);
    const ref = (0, react_1.useCallback)((element) => {
        if (element === null) {
            _ref.current = window.document.documentElement;
        }
        else {
            _ref.current = element;
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (!_ref.current && window.document) {
            _ref.current = window.document.documentElement;
            return addEvents(_ref.current, {
                onFullScreen: handleFullscreenChange,
                onError: handleFullscreenError,
            });
        }
        if (_ref.current) {
            return addEvents(_ref.current, {
                onFullScreen: handleFullscreenChange,
                onError: handleFullscreenError,
            });
        }
        return undefined;
    }, []);
    return { ref, toggle, fullscreen };
}
exports.useFullscreen = useFullscreen;
