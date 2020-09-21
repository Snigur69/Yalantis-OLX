import { createStore, combineReducers } from "redux";
import { cartReducer } from "../store/reducers/cart";
import { productsReducer } from "../store/reducers/products";
import { optionsReducer } from "../store/reducers/options";
import { modalReducer } from "../store/reducers/modal";
import { originsReducer } from "./reducers/origins";

let rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    options: optionsReducer,
    modal: modalReducer,
    origins: originsReducer,
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
