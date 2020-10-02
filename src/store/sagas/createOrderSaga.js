import { takeEvery, put, call } from "redux-saga/effects";
import { CREATE_ORDER } from "../../constants/constants";
import { clearCart } from "../actions";
import { createOrderByApi } from "../../services/api";
import { createBrowserHistory as createHistory } from "history";

const history = createHistory({ forceRefresh: true });

export default function* createOrderSaga() {
    yield takeEvery(CREATE_ORDER, onCreateOrder);
}

function* onCreateOrder(action) {
    try {
        const order = yield call(createOrderByApi, action.order);
        yield put(clearCart());
        yield call(forwardTo, `/orders/${order}`);
    } catch (error) {
        throw new Error(error);
    }
}

function forwardTo(location) {
    history.push({ pathname: location });
}
