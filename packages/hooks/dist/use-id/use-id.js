"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useId = void 0;
const react_1 = require("react");
const use_isomorphic_effect_1 = require("../use-isomorphic-effect/use-isomorphic-effect");
const utils_1 = require("../utils");
const use_react_id_1 = require("./use-react-id");
function useId(staticId) {
    const reactId = (0, use_react_id_1.useReactId)();
    const [uuid, setUuid] = (0, react_1.useState)(reactId);
    (0, use_isomorphic_effect_1.useIsomorphicEffect)(() => {
        setUuid((0, utils_1.randomId)());
    }, []);
    if (typeof staticId === 'string') {
        return staticId;
    }
    if (typeof window === 'undefined') {
        return reactId;
    }
    return uuid;
}
exports.useId = useId;
