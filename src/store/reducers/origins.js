let initialState = [];

export function originsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ORIGINS": {
            return [...action.origins];
        }
        case "ORIGINS_REQUEST": {
            return [...state];
        }
        default: {
            return state;
        }
    }
}
