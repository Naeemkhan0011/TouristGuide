import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserGuideDetail,saveUserGuideDetailResponse } from "../../reducers/UserReducer/UserGuideReducer";

export function* UserGuideDetail(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_GUIDE_DETAILS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserGuideDetail(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserGuideDetailAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserGuideDetailResponse(UserGuideDetailAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserGuideDetail() {
  yield takeLatest(SagaActions.USER_GUIDE_DETAILS, UserGuideDetail);
}
