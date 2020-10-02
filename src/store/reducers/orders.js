let initialState = [];

export function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case "ORDERS_REQUEST": {
            return state;
        }
        case "GET_ORDERS": {
            return action.orders;
        }
        default: {
            return state;
        }
    }
}
