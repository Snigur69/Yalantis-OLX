import { createSelector } from "reselect";

export const productsSelector = (state) => state.products.items;
export const productsCountSelector = (state) => state.products.totalCount;
export const cartProductsSelector = (state) => state.cart;
export const optionsSelector = (state) => state.options;
export const modalStateSelector = (state) => state.modal.isOpen;
export const globalOriginsSelector = (state) => state.origins;
export const globalCurrentProductSelector = (state) => state.currentProduct;
export const ordersSelector = (state) => state.orders;
export const currentOrderSelector = (state) => state.currentOrder;
export const submitErrorSelector = (state) => state.modal.isSubmitError;
export const currentProductSelector = (state) => {
    if (state.modal.currentProduct.id) {
        return state.modal.currentProduct;
    }
    return {
        id: "",
        name: "",
        price: 0,
        origin: "",
    };
};

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
    if (items.perPage !== 50) {
        return `perPage=${items.perPage}`;
    }
    return "";
});

export const minPriceSelector = createSelector(optionsSelector, (items) => {
    if (!isNaN(items.minPrice)) {
        return `minPrice=${items.minPrice}`;
    }
    return "";
});

export const maxPriceSelector = createSelector(optionsSelector, (items) => {
    if (items.maxPrice) {
        return `maxPrice=${items.maxPrice}`;
    }
    return "";
});

export const currentPageSelector = createSelector(optionsSelector, (items) => {
    if (items.currentPage !== 1) {
        return `page=${items.currentPage}`;
    }
    return "";
});
export const queryOptionsSelector = createSelector(
    perPageSelector,
    originsSelector,
    minPriceSelector,
    maxPriceSelector,
    currentPageSelector,
    (perPage, origins, minPrice, maxPrice, currentPage) => {
        const options = [perPage, origins, minPrice, maxPrice, currentPage];
        let resultQuery = "";
        options.map((el) => {
            if (el) {
                if (resultQuery) {
                    resultQuery += `&${el}`;
                } else {
                    resultQuery += `${el}`;
                }
            }
            return false;
        });
        return resultQuery;
    }
);
