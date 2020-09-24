import { takeEvery, put, call } from "redux-saga/effects";
import { ADD_NEW_PRODUCT } from "../../constants/constants";
import { closeModal, setSubmitError } from "../actions";
import { manageProduct } from "../../services/api";

export default function* createProductSaga() {
    yield takeEvery(ADD_NEW_PRODUCT, onCreateProduct);
}

function* onCreateProduct(action) {
    try {
        yield call(manageProduct, action.product);
        action.setSubmitting(false);
        yield put(closeModal());
        window.location.reload();
    } catch (error) {
        action.setSubmitting(false);
        yield put(setSubmitError(true));
    }
}
