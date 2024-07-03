import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserFilterApi, saveUserFilterApiResponse } from "../../reducers/UserReducer/UserFilterApiReducer";

export function* UserFilterApi(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_FILTER_API,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserFilterApi(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserFilterApiResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserFilterApiResponse(UserFilterApiResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserFilterApi() {
  yield takeLatest(SagaActions.USER_FILTER_API, UserFilterApi);
}
