import { createStore, combineReducers } from "redux";
import { cartReducer } from "../store/reducers/cart";
import { productsReducer } from "../store/reducers/products";
import { optionsReducer } from "../store/reducers/options";

let rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    options: optionsReducer,
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
