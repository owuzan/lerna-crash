"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueue = void 0;
const react_1 = require("react");
function useQueue({ initialValues = [], limit }) {
    const [{ state, queue }, setState] = (0, react_1.useState)({
        state: initialValues.slice(0, limit),
        queue: initialValues.slice(limit),
    });
    const add = (...items) => setState((current) => {
        const results = [...current.state, ...current.queue, ...items];
        return {
            state: results.slice(0, limit),
            queue: results.slice(limit),
        };
    });
    const update = (fn) => setState((current) => {
        const results = fn([...current.state, ...current.queue]);
        return {
            state: results.slice(0, limit),
            queue: results.slice(limit),
        };
    });
    const cleanQueue = () => setState((current) => ({ state: current.state, queue: [] }));
    return {
        state,
        queue,
        add,
        update,
        cleanQueue,
    };
}
exports.useQueue = useQueue;
