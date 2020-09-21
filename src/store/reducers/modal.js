let initialState = {
    isOpen: false,
    currentProduct: {},
};

export function modalReducer(state = initialState, { type, product }) {
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
            };
        }
        default: {
            return state;
        }
    }
}
