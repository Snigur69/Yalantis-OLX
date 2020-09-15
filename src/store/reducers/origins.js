let initialState = [];

export function originsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ORIGINS": {
            return [...action.origins];
        }
        default: {
            return state;
        }
    }
}
