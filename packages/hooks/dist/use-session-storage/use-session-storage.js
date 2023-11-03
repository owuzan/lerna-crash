"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStorage = void 0;
const create_storage_1 = require("../use-local-storage/create-storage");
function useSessionStorage(props) {
    return (0, create_storage_1.createStorage)('sessionStorage', 'use-session-storage')(props);
}
exports.useSessionStorage = useSessionStorage;
