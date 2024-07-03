import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveGuideGetProfile, saveGuideGetProfileResponse } from "../../reducers/GuideReducer/GuideGetProfileReducer";

export function* GuideGetProfile(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.GUIDE_GET_PROFILE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveGuideGetProfile(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const GuideGetProfileResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveGuideGetProfileResponse(GuideGetProfileResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchGuideGetProfile() {
  yield takeLatest(SagaActions.GUIDE_GET_PROFILE, GuideGetProfile);
}
