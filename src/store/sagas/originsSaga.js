import { takeEvery, put, call } from "redux-saga/effects";
import { ORIGINS_REQUEST } from "../../constants/constants";
import { getOrigins } from "../actions";
import { getOriginsFromApi } from "../../services/api";

export default function* originsSaga() {
    yield takeEvery(ORIGINS_REQUEST, onGetOrigins);
}

function* onGetOrigins() {
    try {
        const origins = yield call(getOriginsFromApi);
        yield put(getOrigins(origins));
    } catch (error) {
        throw new Error(error);
    }
}
