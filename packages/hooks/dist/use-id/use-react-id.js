"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactId = void 0;
const react_1 = __importDefault(require("react"));
const __useId = react_1.default["useId".toString()] || (() => undefined);
function useReactId() {
    const id = __useId();
    return id ? `piksel-ui-${id.replace(/:/g, "")}` : "";
}
exports.useReactId = useReactId;
