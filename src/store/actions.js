import {
    GET_PRODUCTS,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    CHANGE_PRODUCT_COUNT,
    INCRESE_PRODUCT_COUNT,
    DECRESE_PRODUCT_COUNT,
    SET_PER_PAGE,
    SET_ORIGINS,
    CLOSE_MODAL,
    OPEN_MODAL,
    GET_ORIGINS,
    CLEAR_CART,
    SET_CURRENT_PAGE,
    ORIGINS_REQUEST,
    SET_TOTAL_COUNT,
    PRODUCTS_REQUEST,
    SET_CURRENT_PRODUCT,
    CURRENT_PRODUCT_REQUEST,
    ORDERS_REQUEST,
    GET_ORDERS,
    CURRENT_ORDER_REQUEST,
    GET_CURRENT_ORDER,
    CREATE_ORDER,
    ADD_NEW_PRODUCT,
    EDIT_PRODUCT,
    SET_SUBMIT_ERROR,
} from "../constants/constants";

export function productsRequest(params) {
    return {
        type: PRODUCTS_REQUEST,
        params,
    };
}
export function getProducts(products) {
    return {
        type: GET_PRODUCTS,
        payload: products,
    };
}

export function setTotalCount(count) {
    return {
        type: SET_TOTAL_COUNT,
        count,
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

export function openModal(product) {
    return {
        type: OPEN_MODAL,
        product,
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    };
}

export function setSubmitError(error) {
    return {
        type: SET_SUBMIT_ERROR,
        error,
    };
}

export function getOrigins(origins) {
    return {
        type: GET_ORIGINS,
        origins,
    };
}

export function clearCart() {
    return {
        type: CLEAR_CART,
    };
}
export function originsRequest() {
    return {
        type: ORIGINS_REQUEST,
    };
}
export function setCurrentPage(currentPage) {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    };
}

export function currentProductRequest(url) {
    return {
        type: CURRENT_PRODUCT_REQUEST,
        url,
    };
}
export function setCurrentProduct(product) {
    return {
        type: SET_CURRENT_PRODUCT,
        product,
    };
}

export function ordersRequest() {
    return {
        type: ORDERS_REQUEST,
    };
}
export function getOrders(orders) {
    return {
        type: GET_ORDERS,
        orders,
    };
}

export function currentOrderRequest(url) {
    return {
        type: CURRENT_ORDER_REQUEST,
        url,
    };
}

export function getCurrentOrder(order) {
    return {
        type: GET_CURRENT_ORDER,
        order,
    };
}

export function createOrder(order) {
    return {
        type: CREATE_ORDER,
        order,
    };
}

export function addNewProduct(product, fn) {
    return {
        type: ADD_NEW_PRODUCT,
        product,
        setSubmitting: fn,
    };
}

export function editProduct(product, fn) {
    return {
        type: EDIT_PRODUCT,
        product,
        setSubmitting: fn,
    };
}
