import { takeEvery, put, call } from "redux-saga/effects";
import { ORDERS_REQUEST } from "../../constants/constants";
import { getOrders } from "../actions";
import { getOrdersFromApi } from "../../services/api";

export default function* ordersSaga() {
    yield takeEvery(ORDERS_REQUEST, onGetOrders);
}

function* onGetOrders() {
    try {
        const orders = yield call(getOrdersFromApi);
        yield put(getOrders(orders));
    } catch (error) {
        throw new Error(error);
    }
}
