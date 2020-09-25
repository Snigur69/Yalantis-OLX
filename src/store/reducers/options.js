export let initialState = {
    perPage: 50,
    origins: [],
    minPrice: null,
    maxPrice: 0,
    currentPage: 1,
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
                perPage: Number(action.perPage),
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
                minPrice: Number(action.minPrice),
                maxPrice: Number(action.maxPrice),
            };
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }
        default:
            return state;
    }
}
