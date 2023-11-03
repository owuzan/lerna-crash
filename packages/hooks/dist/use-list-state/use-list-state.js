"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListState = void 0;
const react_1 = require("react");
function useListState(initialValue = []) {
    const [state, setState] = (0, react_1.useState)(initialValue);
    const append = (...items) => setState((current) => [...current, ...items]);
    const prepend = (...items) => setState((current) => [...items, ...current]);
    const insert = (index, ...items) => setState((current) => [...current.slice(0, index), ...items, ...current.slice(index)]);
    const apply = (fn) => setState((current) => current.map((item, index) => fn(item, index)));
    const remove = (...indices) => setState((current) => current.filter((_, index) => !indices.includes(index)));
    const pop = () => setState((current) => {
        const cloned = [...current];
        cloned.pop();
        return cloned;
    });
    const shift = () => setState((current) => {
        const cloned = [...current];
        cloned.shift();
        return cloned;
    });
    const reorder = ({ from, to }) => setState((current) => {
        const cloned = [...current];
        const item = current[from];
        cloned.splice(from, 1);
        cloned.splice(to, 0, item);
        return cloned;
    });
    const setItem = (index, item) => setState((current) => {
        const cloned = [...current];
        cloned[index] = item;
        return cloned;
    });
    const setItemProp = (index, prop, value) => setState((current) => {
        const cloned = [...current];
        cloned[index] = Object.assign(Object.assign({}, cloned[index]), { [prop]: value });
        return cloned;
    });
    const applyWhere = (condition, fn) => setState((current) => current.map((item, index) => (condition(item, index) ? fn(item, index) : item)));
    const filter = (fn) => {
        setState((current) => current.filter(fn));
    };
    return [
        state,
        {
            setState,
            append,
            prepend,
            insert,
            pop,
            shift,
            apply,
            applyWhere,
            remove,
            reorder,
            setItem,
            setItemProp,
            filter,
        },
    ];
}
exports.useListState = useListState;
