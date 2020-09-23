import { takeEvery, put, call } from "redux-saga/effects";
import { CURRENT_ORDER_REQUEST } from "../../constants/constants";
import { getCurrentOrder } from "../actions";
import { getCurrentOrderFromApi } from "../../services/api";

export default function* currentOrderSaga() {
    yield takeEvery(CURRENT_ORDER_REQUEST, onGetCurrentOrder);
}

function* onGetCurrentOrder(action) {
    try {
        const currentProduct = yield call(getCurrentOrderFromApi, action.url);
        yield put(getCurrentOrder(currentProduct));
    } catch (error) {
        throw new Error(error);
    }
}
