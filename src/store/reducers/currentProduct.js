let initialState = {};

export function currentProductReducer(state = initialState, action) {
    switch (action.type) {
        case "CURRENT_PRODUCT_REQUEST": {
            return state;
        }
        case "SET_CURRENT_PRODUCT": {
            return action.product;
        }
        default: {
            return state;
        }
    }
}
