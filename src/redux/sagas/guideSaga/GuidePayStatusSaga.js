import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveGuidePayStatus, saveGuidePayStatusResponse } from "../../reducers/GuideReducer/GuidePayStatusReducer";

export function* GuidePayStatus(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.GUIDE_PAY_STATUS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveGuidePayStatus(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const GuidePayStatusResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveGuidePayStatusResponse(GuidePayStatusResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchGuidePayStatus() {
  yield takeLatest(SagaActions.GUIDE_PAY_STATUS, GuidePayStatus);
}
