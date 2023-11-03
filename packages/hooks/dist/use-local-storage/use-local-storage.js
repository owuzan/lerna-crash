"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const create_storage_1 = require("./create-storage");
function useLocalStorage(props) {
    return (0, create_storage_1.createStorage)('localStorage', 'use-local-storage')(props);
}
exports.useLocalStorage = useLocalStorage;
