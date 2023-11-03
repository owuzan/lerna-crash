"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetState = void 0;
const react_1 = require("react");
function useSetState(initialState) {
    const [state, _setState] = (0, react_1.useState)(initialState);
    const setState = (0, react_1.useCallback)((statePartial) => _setState((current) => (Object.assign(Object.assign({}, current), (typeof statePartial === 'function' ? statePartial(current) : statePartial)))), []);
    return [state, setState];
}
exports.useSetState = useSetState;
