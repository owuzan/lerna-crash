"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDisclosure = void 0;
const react_1 = require("react");
function useDisclosure(initialState = false, callbacks) {
    const { onOpen, onClose } = callbacks || {};
    const [opened, setOpened] = (0, react_1.useState)(initialState);
    const open = (0, react_1.useCallback)(() => {
        setOpened((isOpened) => {
            if (!isOpened) {
                onOpen === null || onOpen === void 0 ? void 0 : onOpen();
                return true;
            }
            return isOpened;
        });
    }, [onOpen]);
    const close = (0, react_1.useCallback)(() => {
        setOpened((isOpened) => {
            if (isOpened) {
                onClose === null || onClose === void 0 ? void 0 : onClose();
                return false;
            }
            return isOpened;
        });
    }, [onClose]);
    const toggle = (0, react_1.useCallback)(() => {
        opened ? close() : open();
    }, [close, open, opened]);
    return [opened, { open, close, toggle }];
}
exports.useDisclosure = useDisclosure;
