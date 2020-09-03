export let initialState = {
    perPage: 50,
    origins: [],
    minPrice: 0,
    maxPrice: 10000,
};

export function optionsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ORIGINS": {
            if (action.isChecked) {
                return {
                    ...state,
                    origins: [...state.origins, action.origin],
                };
            } else {
                let copyOrigins = [...state.origins];
                copyOrigins.splice(copyOrigins.indexOf(action.origin), 1);
                return {
                    ...state,
                    origins: copyOrigins,
                };
            }
        }
        case "SET_PER_PAGE": {
            return {
                ...state,
                perPage: +action.perPage,
            };
        }
        case "CHANGE_PRICE_RANGE": {
            if (action.minPrice > action.maxPrice) {
                return {
                    ...state,
                    minPrice: state.minPrice,
                    maxPrice: state.maxPrice,
                };
            }
            return {
                ...state,
                minPrice: +action.minPrice,
                maxPrice: +action.maxPrice,
            };
        }
        default:
            return state;
    }
}
