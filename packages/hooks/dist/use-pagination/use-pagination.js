"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = exports.DOTS = void 0;
const react_1 = require("react");
const use_uncontrolled_1 = require("../use-uncontrolled/use-uncontrolled");
const utils_1 = require("../utils");
exports.DOTS = 'dots';
function usePagination({ total, siblings = 1, boundaries = 1, page, initialPage = 1, onChange, }) {
    const _total = Math.max(Math.trunc(total), 0);
    const [activePage, setActivePage] = (0, use_uncontrolled_1.useUncontrolled)({
        value: page,
        onChange,
        defaultValue: initialPage,
        finalValue: initialPage,
    });
    const setPage = (pageNumber) => {
        if (pageNumber <= 0) {
            setActivePage(1);
        }
        else if (pageNumber > _total) {
            setActivePage(_total);
        }
        else {
            setActivePage(pageNumber);
        }
    };
    const next = () => setPage(activePage + 1);
    const previous = () => setPage(activePage - 1);
    const first = () => setPage(1);
    const last = () => setPage(_total);
    const paginationRange = (0, react_1.useMemo)(() => {
        const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
        if (totalPageNumbers >= _total) {
            return (0, utils_1.range)(1, _total);
        }
        const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
        const rightSiblingIndex = Math.min(activePage + siblings, _total - boundaries);
        const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
        const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = siblings * 2 + boundaries + 2;
            return [...(0, utils_1.range)(1, leftItemCount), exports.DOTS, ...(0, utils_1.range)(_total - (boundaries - 1), _total)];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = boundaries + 1 + 2 * siblings;
            return [...(0, utils_1.range)(1, boundaries), exports.DOTS, ...(0, utils_1.range)(_total - rightItemCount, _total)];
        }
        return [
            ...(0, utils_1.range)(1, boundaries),
            exports.DOTS,
            ...(0, utils_1.range)(leftSiblingIndex, rightSiblingIndex),
            exports.DOTS,
            ...(0, utils_1.range)(_total - boundaries + 1, _total),
        ];
    }, [_total, siblings, activePage]);
    return {
        range: paginationRange,
        active: activePage,
        setPage,
        next,
        previous,
        first,
        last,
    };
}
exports.usePagination = usePagination;
