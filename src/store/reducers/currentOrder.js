let initialState = {};

export function currentOrderReducer(state = initialState, action) {
    switch (action.type) {
        case "CURRENT_ORDER_REQUES": {
            return state;
        }
        case "GET_CURRENT_ORDER": {
            return action.order;
        }
        default: {
            return state;
        }
    }
}
