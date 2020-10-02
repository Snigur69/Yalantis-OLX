import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { cartReducer } from "../store/reducers/cart";
import { productsReducer } from "../store/reducers/products";
import { optionsReducer } from "../store/reducers/options";
import { modalReducer } from "../store/reducers/modal";
import { originsReducer } from "./reducers/origins";
import { ordersReducer } from "./reducers/orders";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import { currentProductReducer } from "./reducers/currentProduct";
import { currentOrderReducer } from "./reducers/currentOrder";

let rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    options: optionsReducer,
    modal: modalReducer,
    origins: originsReducer,
    currentProduct: currentProductReducer,
    orders: ordersReducer,
    currentOrder: currentOrderReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
