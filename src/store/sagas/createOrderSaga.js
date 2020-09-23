import { takeEvery, put, call } from "redux-saga/effects";
import { CREATE_ORDER } from "../../constants/constants";
import { clearCart } from "../actions";
import { createOrderByApi } from "../../services/api";

export default function* createOrderSaga() {
    yield takeEvery(CREATE_ORDER, onCreateOrder);
}

function* onCreateOrder(action) {
    try {
        yield call(createOrderByApi, action.order);
        yield put(clearCart());
    } catch (error) {
        throw new Error(error);
    }
}
