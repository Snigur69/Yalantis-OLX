import {
    GET_PRODUCTS,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    CHANGE_PRODUCT_COUNT,
    INCRESE_PRODUCT_COUNT,
    DECRESE_PRODUCT_COUNT,
    SET_PER_PAGE,
    SET_ORIGINS,
} from "../constants/constants";

export function getProducts(products) {
    return {
        type: GET_PRODUCTS,
        payload: products,
    };
}

export function addProductToCart(product) {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: product,
    };
}

export function removeProductFromCart(index) {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        index,
    };
}

export function changeProductCount(id, value) {
    return {
        type: CHANGE_PRODUCT_COUNT,
        id,
        value,
    };
}

export function increseProductCount(id) {
    return {
        type: INCRESE_PRODUCT_COUNT,
        id,
    };
}
export function decreseProductCount(id) {
    return {
        type: DECRESE_PRODUCT_COUNT,
        id,
    };
}

export function setPerPage(perPage) {
    return {
        type: SET_PER_PAGE,
        perPage,
    };
}
export function setOrigins(origin, isChecked) {
    return {
        type: SET_ORIGINS,
        origin,
        isChecked,
    };
}

export function changePriceRange(minPrice, maxPrice) {
    return {
        type: "CHANGE_PRICE_RANGE",
        minPrice,
        maxPrice,
    };
}
