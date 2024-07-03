import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveGuideCompleteProfile, saveGuideCompleteProfileResponse } from "../../reducers/GuideReducer/GuideCompleteProfileReducer";

export function* GuideCompleteProfile(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.GUIDE_COMPLETE_PROFILE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveGuideCompleteProfile(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const GuideCompleteProfileResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveGuideCompleteProfileResponse(GuideCompleteProfileResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchGuideCompleteProfile() {
  yield takeLatest(SagaActions.GUIDE_COMPLETE_PROFILE, GuideCompleteProfile);
}
