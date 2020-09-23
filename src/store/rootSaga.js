import { all } from "redux-saga/effects";
import originsSaga from "./sagas/originsSaga";
import productsSaga from "./sagas/productsSagas";
import ordersSaga from "./sagas/ordersSaga";
import currentProductSaga from "./sagas/currentProductSaga";
import currentOrderSaga from "./sagas/currentOrderSaga";
import createOrderSaga from "./sagas/createOrderSaga";
import createProductSaga from "./sagas/createProductSaga";
import editProductSaga from "./sagas/editProductSaga";

export default function* rootSaga() {
    yield all([
        originsSaga(),
        productsSaga(),
        currentProductSaga(),
        ordersSaga(),
        currentOrderSaga(),
        createOrderSaga(),
        createProductSaga(),
        editProductSaga(),
    ]);
}
