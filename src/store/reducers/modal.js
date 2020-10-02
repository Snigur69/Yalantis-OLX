let initialState = {
    isOpen: false,
    currentProduct: {},
    isSubmitError: false,
};

export function modalReducer(state = initialState, { type, product, error }) {
    switch (type) {
        case "OPEN_MODAL": {
            return {
                ...state,
                currentProduct: { ...product },
                isOpen: true,
            };
        }
        case "CLOSE_MODAL": {
            return {
                ...state,
                currentProduct: {},
                isOpen: false,
                isSubmitError: false,
            };
        }
        case "SET_SUBMIT_ERROR": {
            return {
                ...state,
                isSubmitError: error,
            };
        }
        default: {
            return state;
        }
    }
}
