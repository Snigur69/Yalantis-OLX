import { createSelector } from "reselect";

const cartProductsSelector = (state) => state.cart;
const optionsSelector = (state) => state.options;

export const cartItemsSelector = createSelector(
    cartProductsSelector,
    (items) => {
        return items.reduce((acc, items) => acc + items.count, 0);
    }
);
export const cartTotalSelector = createSelector(
    cartProductsSelector,
    (items) => {
        return items.reduce((acc, items) => acc + items.summaryPrice, 0);
    }
);

export const originsSelector = createSelector(optionsSelector, (items) => {
    if (items.origins.length) {
        return (
            "origins=" +
            items.origins.reduce((acc = "", el) => {
                return acc + "," + el;
            })
        );
    }
    return "";
});

export const perPageSelector = createSelector(optionsSelector, (items) => {
    if (items.perPage >= 0) {
        return `perPage=${items.perPage}`;
    }
    return "";
});

export const minPriceSelector = createSelector(optionsSelector, (items) => {
    if (items.minPrice >= 0) {
        return `minPrice=${items.minPrice}`;
    }
    return "";
});

export const maxPriceSelector = createSelector(optionsSelector, (items) => {
    if (items.minPrice >= 0) {
        return `maxPrice=${items.maxPrice}`;
    }
    return "";
});

export const queryOptionsSelector = createSelector(
    perPageSelector,
    originsSelector,
    minPriceSelector,
    maxPriceSelector,
    (perPage, origins, minPrice, maxPrice) => {
        return `${perPage}&${origins}&${minPrice}&${maxPrice}`;
    }
);
