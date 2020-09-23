import { takeEvery, put, call } from "redux-saga/effects";
import { CURRENT_PRODUCT_REQUEST } from "../../constants/constants";
import { setCurrentProduct } from "../actions";
import { getCurrentProductFromApi } from "../../services/api";

export default function* currentProductSaga() {
    yield takeEvery(CURRENT_PRODUCT_REQUEST, onGetCurrentProduct);
}

function* onGetCurrentProduct(action) {
    try {
        const currentProduct = yield call(getCurrentProductFromApi, action.url);
        yield put(setCurrentProduct(currentProduct));
    } catch (error) {
        throw new Error(error);
    }
}
