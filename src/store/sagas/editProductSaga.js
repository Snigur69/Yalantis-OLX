import { takeEvery, put, call } from "redux-saga/effects";
import { EDIT_PRODUCT } from "../../constants/constants";
import { closeModal, setSubmitError } from "../actions";
import { manageProduct } from "../../services/api";

export default function* editProductSaga() {
    yield takeEvery(EDIT_PRODUCT, onEditProduct);
}

function* onEditProduct(action) {
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
