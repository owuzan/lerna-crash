"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorage = void 0;
/* eslint-disable no-console */
const react_1 = require("react");
const use_window_event_1 = require("../use-window-event/use-window-event");
function serializeJSON(value, hookName) {
    try {
        return JSON.stringify(value);
    }
    catch (error) {
        throw new Error(`@mantine/hooks ${hookName}: Failed to serialize the value`);
    }
}
function deserializeJSON(value) {
    try {
        return value && JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
}
function createStorageHandler(type) {
    const getItem = (key) => {
        try {
            return window[type].getItem(key);
        }
        catch (error) {
            console.warn('use-local-storage: Failed to get value from storage, localStorage is blocked');
            return null;
        }
    };
    const setItem = (key, value) => {
        try {
            window[type].setItem(key, value);
        }
        catch (error) {
            console.warn('use-local-storage: Failed to set value to storage, localStorage is blocked');
        }
    };
    const removeItem = (key) => {
        try {
            window[type].removeItem(key);
        }
        catch (error) {
            console.warn('use-local-storage: Failed to remove value from storage, localStorage is blocked');
        }
    };
    return { getItem, setItem, removeItem };
}
function createStorage(type, hookName) {
    const eventName = type === 'localStorage' ? 'mantine-local-storage' : 'mantine-session-storage';
    const { getItem, setItem, removeItem } = createStorageHandler(type);
    return function useStorage({ key, defaultValue = undefined, getInitialValueInEffect = true, deserialize = deserializeJSON, serialize = (value) => serializeJSON(value, hookName), }) {
        const readStorageValue = (0, react_1.useCallback)((skipStorage) => {
            let storageBlockedOrSkipped;
            try {
                storageBlockedOrSkipped =
                    typeof window === 'undefined' ||
                        !(type in window) ||
                        window[type] === null ||
                        !!skipStorage;
            }
            catch (_e) {
                storageBlockedOrSkipped = true;
            }
            if (storageBlockedOrSkipped) {
                return defaultValue;
            }
            const storageValue = getItem(key);
            return storageValue !== null ? deserialize(storageValue) : defaultValue;
        }, [key, defaultValue]);
        const [value, setValue] = (0, react_1.useState)(readStorageValue(getInitialValueInEffect));
        const setStorageValue = (0, react_1.useCallback)((val) => {
            if (val instanceof Function) {
                setValue((current) => {
                    const result = val(current);
                    setItem(key, serialize(result));
                    window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val(current) } }));
                    return result;
                });
            }
            else {
                setItem(key, serialize(val));
                window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val } }));
                setValue(val);
            }
        }, [key]);
        const removeStorageValue = (0, react_1.useCallback)(() => {
            removeItem(key);
            window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: defaultValue } }));
        }, []);
        (0, use_window_event_1.useWindowEvent)('storage', (event) => {
            var _a;
            if (event.storageArea === window[type] && event.key === key) {
                setValue(deserialize((_a = event.newValue) !== null && _a !== void 0 ? _a : undefined));
            }
        });
        (0, use_window_event_1.useWindowEvent)(eventName, (event) => {
            if (event.detail.key === key) {
                setValue(event.detail.value);
            }
        });
        (0, react_1.useEffect)(() => {
            if (defaultValue !== undefined && value === undefined) {
                setStorageValue(defaultValue);
            }
        }, [defaultValue, value, setStorageValue]);
        (0, react_1.useEffect)(() => {
            if (getInitialValueInEffect) {
                setValue(readStorageValue());
            }
        }, []);
        return [
            value === undefined ? defaultValue : value,
            setStorageValue,
            removeStorageValue,
        ];
    };
}
exports.createStorage = createStorage;
