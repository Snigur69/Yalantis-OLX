import { put, call, debounce } from "redux-saga/effects";
import { PRODUCTS_REQUEST } from "../../constants/constants";
import { getProducts, setTotalCount } from "../actions";
import { getProductsFromApi } from "../../services/api";

export default function* productsSaga() {
    yield debounce(250, PRODUCTS_REQUEST, onGetProducts);
}

function* onGetProducts(action) {
    try {
        const products = yield call(getProductsFromApi, action.params);
        yield put(getProducts(products.items));
        yield put(setTotalCount(products.totalItems));
    } catch (error) {
        throw new Error(error);
    }
}
