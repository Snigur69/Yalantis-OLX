const initialState = {
    items: [],
    totalCount: 0,
};

export function productsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return {
                ...state,
                items: action.payload,
            };
        }
        case "SET_TOTAL_COUNT": {
            return {
                ...state,
                totalCount: action.count,
            };
        }
        default:
            return state;
    }
}
